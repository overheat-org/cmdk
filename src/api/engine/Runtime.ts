import { ScriptNode, Node, ChannelExpressionNode, IdentifierNode, KeywordNode, PathExpressionNode, UserExpressionNode } from "./Ast";
import { commands } from "@api";
import { Keyword, Option } from "../jsx";

class RuntimeError extends Error {}

function Runtime(ast: ScriptNode) {
  let lastKeyword: Keyword | Option;

  return evaluate(ast);

  function evaluate(node: Node): mkUnion {
    switch (node.kind) {
      case "Script":
        return evaluate(node.children!) as mkUnion;

      case "Keyword":
        return evaluateKeyword(node);

      case "Identifier":
        return evaluateIdentifier(node);

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

  function evaluateKeyword(node: KeywordNode): mkUnion {
    const { id, options, children } = node;

    // TODO: tratar melhor este erro aqui
    const commandResolvable = lastKeyword ? lastKeyword.children.get(id) : commands.get(id);
    if(!commandResolvable) throw 'Command not found';

    lastKeyword = commandResolvable;
 
    if(children) return evaluate(children) as any;

    const fn = (lastKeyword as Keyword).run;
    if(!fn) return mkNull();
    return mkFn(() => fn(options));
  }

  function evaluateIdentifier(node: IdentifierNode) {
    return mkIden(node.id);
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

type mkUnion = ReturnType<
  | typeof mkFn 
  | typeof mkNull
  | typeof mkIden 
  | typeof mkStr
  | typeof mkNum
>

function mkFn(fn: unknown) {
  return { type: Symbol.for('fn'), value: fn } as const
}

function mkNull() {
  return { type: Symbol.for('nil') } as const
}

function mkIden(identifier: string) {
  return { type: Symbol.for('iden'), value: identifier } as const
}

function mkStr(string: string) {
  return { type: Symbol.for('str'), value: string } as const
}

function mkNum(number: number) {
  return { type: Symbol.for('num'), value: number } as const
}

export default Runtime;