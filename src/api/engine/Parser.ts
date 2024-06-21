import Lexer from "./Lexer";
import { TokenType } from "@consts";
import { Node, OptionsExpressionNode, KeywordNode, IdentifierNode, UserExpressionNode, ChannelExpressionNode, PathExpressionNode, StringLiteralNode, NumberLiteralNode, ScriptNode } from './Ast';

class ParserError extends Error {}

function Parser(source: string) {
  const tokens = Lexer(source);

  const at = () => tokens[0];
  const eat = () => tokens.shift();
  const expect = (types: TokenType[], err: unknown = 'Unexpected Element') => {
    const prev = tokens[0];

    if (!prev || !types.includes(prev.type)) {
      throw new ParserError(`${err}: ${prev.toString()}\nExpecting: ${types.map(t => TokenType[t]).join(', ')}`);
    }

    return prev;
  }

  const ast = new ScriptNode();
  ast.children = parse();

  return ast;

  function parse(): Node {
    switch (at().type) {
      case TokenType.Keyword: {
        const keyword = eat();

        let options: { [key: string]: unknown } = {};
        let children: Node | null = null;

        while (at().type == TokenType.Identifier) {
          const elem = parse();

          if (elem.kind === 'OptionsExpression') {
            options = elem.value;
          } else {
            children = elem;
          }
        }

        if (!children) {
          expect([TokenType.Keyword, TokenType.String, TokenType.Number]);
          children = parse();
        }

        return new KeywordNode(keyword!.value as string, options, children);
      }

      case TokenType.Identifier: {
        let id = eat()!.value as string;

        if(at().type == TokenType.Equal) {
          const options: { [key: string]: unknown } = {};

          while (at().type == TokenType.Equal) {
            eat(); // Discarting "="
            const value = parse();

            options[id] = value;

            if(at().type != TokenType.Identifier) break;
            else id = eat()!.value as string;
          }

          return new OptionsExpressionNode(options);
        }

        return new IdentifierNode(id);
      }

      case TokenType.Decorator: {
        eat();

        if (at().type != TokenType.Identifier) {
          throw new ParserError('Incorrect use of decorator');
        }

        return new UserExpressionNode(eat()!.value as string);
      }

      case TokenType.Hash: {
        eat();

        if (at().type != TokenType.Identifier) {
          throw new Error('Incorrect use of hash');
        }

        return new ChannelExpressionNode(eat()!.value as string);
      }

      case TokenType.Greater: {
        const path: string[] = [];

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

        readPath();

        return new PathExpressionNode(path);
      }

      case TokenType.String: {
        return new StringLiteralNode(eat()!.value as string);
      }

      case TokenType.Number: {
        return new NumberLiteralNode(eat()!.value as number);
      }

      default: {
        throw new ParserError(`Unknown token "${JSON.stringify(at())}"`);
      }
    }
  }
}

export default Parser;