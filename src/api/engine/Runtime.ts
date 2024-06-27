import { ScriptNode, Node, ChannelExpressionNode, KeywordNode, PathExpressionNode, UserExpressionNode } from "./Ast";
import { commands } from "@api";
import { TokenType } from "@consts";
import { Keyword, Option } from "./Elements";
import { GenericError, NotOk, Ok } from "@lib/utils";

function Runtime(ast: ScriptNode) {
  const errors = new Array<GenericError>();
  let lastKeyword: Keyword | Option;

  const result = evaluate(ast);
  return errors.length == 0 ? Ok(result) : NotOk(errors);

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

      case undefined:
        return mkNull();

      default:
        errors.push({ type: 'runtime', value: `Unknown AST node kind: ${node['kind']}` });
        return mkNull();
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
  | typeof mkStr
  | typeof mkNum
>

function mkFn(fn: (...args: unknown[]) => unknown) {
  return { type: TokenType.Function, value: fn } as const
}

function mkNull() {
  return { type: TokenType.Nil, value: null } as const
}

function mkStr(string: string) {
  return { type: TokenType.String, value: string } as const
}

function mkNum(number: number) {
  return { type: TokenType.Number, value: number } as const
}

export default Runtime;