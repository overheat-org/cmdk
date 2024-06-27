import type { Token } from "./Lexer";
import { TokenType } from "@consts";
import {
  Node,
  OptionsExpressionNode,
  KeywordNode,
  UserExpressionNode,
  ChannelExpressionNode,
  PathExpressionNode,
  StringLiteralNode,
  NumberLiteralNode,
  ScriptNode,
} from "./Ast";
import Lexer from "./Lexer";
import { GenericError, NotOk, Ok, ReturnController } from "@lib/utils";

class _Parser {
  static parse(source: string) {
    const [tokens, errors] = Lexer(source);

    if(errors) {
      return NotOk(errors);
    }

    return this.from(tokens!);
  }
  
  static from(_tokens: Token[]) {
    const tokens = [..._tokens];
    const errors = new Array<GenericError>();

    const at = (n = 0) => tokens[n];
    const eat = () => tokens.shift();
    const error = (err: string) => {
      errors.push({ type: 'parser', value: err });
    };
    const expect = (
      types: TokenType[],
      err: unknown = "Unexpected Element"
    ) => {
      const prev = tokens[0] ?? "nil";

      if (!prev || !types.includes(prev.type)) {
        error(
          `${err}: ${prev.toString()}\nExpecting: ${types.map((t) => TokenType[t]).join(", ")}`
        );
      }

      return prev;
    };

    const ast = new ScriptNode();
    if (at()) ast.children = _parse();

    return errors.length == 0 ? Ok(ast) : NotOk(errors);

    function _parse(): Node | undefined {
      switch (at()?.type) {
        case TokenType.Identifier: {
          let id = eat()!.value as string;

          if (at()?.type == TokenType.Equal) {
            const options: { [key: string]: unknown } = {};

            while (at()?.type == TokenType.Equal) {
              eat(); // Discarting "="
              const value = _parse();

              options[id] = value;

              if (at()?.type == TokenType.Identifier) {
                if (at(1)?.type == TokenType.Equal) {
                  id = eat()!.value as string;
                }
              } else {
                break;
              }
            }

            return new OptionsExpressionNode(options);
          } else {
            let options: { [key: string]: unknown } = {};
            let children: Node | undefined = undefined;

            while (at()?.type == TokenType.Identifier) {
              const elem = _parse();

              switch (elem?.kind) {
                case "OptionsExpression":
                  options = elem.value;
                  break;

                case "Keyword":
                  children = elem;
                  break;

                default:
                  error("Expected OptionsExpression");
              }
            }

            if (at() && !children) {
              expect([TokenType.Keyword, TokenType.String, TokenType.Number]);
              children = _parse();
            }

            return new KeywordNode(id, options, children);
          }
        }

        case TokenType.Decorator: {
          eat();

          if (at().type != TokenType.Identifier) {
            error("Incorrect use of decorator");
          }

          return new UserExpressionNode(eat()!.value as string);
        }

        case TokenType.Hash: {
          eat();

          if (at().type != TokenType.Identifier) {
            error("Incorrect use of hash");
          }
            
          return new ChannelExpressionNode(eat()!.value as string);
        }

        case TokenType.Greater: {
          const path: string[] = [];

          const readPath = () => {
            eat();

            if (at().type != TokenType.Identifier) {
              error("Incorrect use of ArrowRight");
            }

            path.push(eat()!.value as string);

            if (at().type == TokenType.Greater) {
              readPath();
            }
          };

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
          error(`Unknown token "${JSON.stringify(at())}"`);
        }
      }
    }
  }
}

interface Parser {
  /** Parse only extern tokens instead parse source too */
  from(tokens: Token[]): ReturnController<ScriptNode>

  /** Use lexer to get tokens and parse it */
  (source: string): ReturnController<ScriptNode>
}

const Parser: Parser = (source) => _Parser.parse(source);
Parser.from = _Parser.from;

export default Parser;