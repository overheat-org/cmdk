import util from 'util';
import Lexer, { Token } from "./Lexer";
import { TokenType } from "@consts";

class ParserError extends Error {}

const keywords = {
  application: [TokenType.String, {
    delete: []
  }],
  theme: [TokenType.String]
}

function Parser(source: string) {
  const tokens = Lexer(source);

  const at = () => tokens[0];
  const eat = () => tokens.shift();
  const isFileEnd = () => tokens[0].type == TokenType.End;
  const expect = (types: TokenType[], err: any = 'Unexpected Element') => {
    const prev = tokens.shift() as Token;

    if (!prev || !types.includes(prev.type)) {
      throw new ParserError(`${err}: ${prev.toString()}\nExpecting: ${types.map(t => TokenType[t]).join(', ')}`);
    }

    return prev;
  }

  const AST = {
    kind: "Script",
    children: new Array()
  }

  while (!isFileEnd()) {
    AST.children.push(parse());
  }

  return AST;

  function parse() {
    switch (at().type) {
      case TokenType.Keyword: {
        const keyword = eat();

        const options = new Array();
        let children: any = null;

        while (at().type == TokenType.Identifier) {
          const elem = parse();

          if(elem.kind == 'OptionExpression') {
            options.push(elem);
          }
          else {
            children = elem;
          }
        }

        if(!children) {
          expect([ TokenType.Keyword, TokenType.String, TokenType.Number ]);
          children = parse();
        }

        return { kind: 'Keyword', id: keyword!.value!, options, children } as const;
      }

      case TokenType.Identifier: {
        const id = eat()!.value!;

        if (at().type == TokenType.Equal) {
          eat();
          const value = parse();

          return {
            kind: 'OptionExpression',
            id,
            value
          } as const;
        }

        return {
          kind: 'Identifier',
          id
        } as const;
      }

      case TokenType.Decorator: {
        eat();

        if (at().type != TokenType.Identifier) {
          throw new ParserError('Incorrect use of decorator');
        }

        return {
          kind: 'UserExpression',
          name: eat()!.value as string
        } as const;
      }

      case TokenType.Hash: {
        eat();

        if (at().type != TokenType.Identifier) {
          throw new Error('Incorrect use of hash');
        }

        return {
          kind: 'ChannelExpression',
          name: eat()!.value as string
        } as const;
      }

      case TokenType.Greater: {
        const path = new Array<string>();

        const readPath = () => {
          eat();

          if (at().type != TokenType.Identifier) {
            throw new Error('Incorrect use of ArrowRight');
          }

          path.push(eat()!.value as string);

          if (at().type == TokenType.Greater) {
            readPath();
          }
        }

        return {
          kind: 'PathExpression',
          path
        } as const;
      }

      case TokenType.String: {
        return {
          kind: 'StringLiteral',
          value: eat()!.value as string
        } as const;
      }

      case TokenType.Number: {
        return {
          kind: 'NumberLiteral',
          value: eat()!.value as number
        } as const;
      }

      default: {
        throw new ParserError(`Unknown token "${JSON.stringify(at())}"`);
      }
    }
  }
}

// console.log(432)
const p = Parser('app 43');
console.log(util.inspect(p, { depth: null, colors: true }));

export default Parser;
