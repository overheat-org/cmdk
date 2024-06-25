import { ScriptNode, Node, ChannelExpressionNode, KeywordNode, PathExpressionNode, UserExpressionNode } from "./Ast";
import { commands } from "@api";
import { TokenType } from "@consts";
import { Keyword, Option } from "./Elements";

class RuntimeError extends Error {}

function Runtime(ast: ScriptNode) {
  let lastKeyword: Keyword | Option;

  return evaluate(ast);

  function evaluate(node: Node): MkUnion {
    switch (node.kind) {
      case "Script":
        return evaluate(node.children!) as MkUnion;

      case "Keyword":
        return evaluateKeyword(node);

      case "UserExpression":
        return evaluateUserExpression(node);

      case "ChannelExpression":
        return evaluateChannelExpression(node);

      case "PathExpression":
        return evaluatePathExpression(node);

      case "StringLiteral":
        return mkStr(node.value);

      case "NumberLiteral":
        return mkNum(node.value);

      default:
        throw new RuntimeError(`Unknown AST node kind: ${node['kind']}`);
    }
  }

  function evaluateKeyword(node: KeywordNode): MkUnion {
    const { id, options, children } = node;

    const commandResolvable = lastKeyword ? lastKeyword.children.get(id) : commands.get(id);
    if(!commandResolvable) return mkNull();

    lastKeyword = commandResolvable;
 
    if(children) return evaluate(children) as any;

    const fn = (lastKeyword as Keyword).run;
    if(!fn) return mkNull();

    return mkFn(() => fn(options));
  }

  function evaluateUserExpression(node: UserExpressionNode) {
    return mkNull();
  }

  function evaluateChannelExpression(node: ChannelExpressionNode) {
    return mkNull();
  }

  function evaluatePathExpression(node: PathExpressionNode) {
    return mkNull();
  }
}

export type MkUnion = ReturnType<
  | typeof mkFn 
  | typeof mkNull
  | typeof mkIden 
  | typeof mkStr
  | typeof mkNum
>

function mkFn(fn: (...args: unknown[]) => unknown) {
  return { type: TokenType.Function, value: fn } as const
}

function mkNull() {
  return { type: TokenType.Nil, value: null } as const
}

function mkIden(identifier: string) {
  return { type: TokenType.Identifier, value: identifier } as const
}

function mkStr(string: string) {
  return { type: TokenType.String, value: string } as const
}

function mkNum(number: number) {
  return { type: TokenType.Number, value: number } as const
}

export default Runtime;