import { Api } from "@lib/discord";
import { ScriptNode, Node, ChannelExpressionNode, IdentifierNode, KeywordNode, PathExpressionNode, UserExpressionNode } from "./Ast";
import { commands } from "@api";
import { Keyword, Option } from "../jsx";

class RuntimeError extends Error {}
interface RuntimeContext {
  [key: string]: any;
}

function Runtime(ast: ScriptNode) {
  const context: RuntimeContext = {};
  let lastKeyword: Keyword | Option;

  return evaluate(ast);

  function evaluate(node: Node): unknown {
    switch (node.kind) {
      case "Script":
        return node.children.map(evaluate);

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
        return node.value;

      case "NumberLiteral":
        return node.value;

      default:
        throw new RuntimeError(`Unknown AST node kind: ${node['kind']}`);
    }
  }

  function evaluateKeyword(node: KeywordNode): any {
    const { id, options, children } = node;

    const command = lastKeyword ? lastKeyword.children.get(id) : commands.get(id);

    if(!command) throw 'Command not found';
 
    if(children) evaluate(children);
    else (lastKeyword as Keyword).run?.();
  }

  function evaluateIdentifier(node: IdentifierNode): any {
    const { id } = node;
    return context[id];
  }

  function evaluateUserExpression(node: UserExpressionNode): any {
    const { name } = node;
  }

  function evaluateChannelExpression(node: ChannelExpressionNode): any {
    const { name } = node;
    return null;
  }

  function evaluatePathExpression(node: PathExpressionNode): any {
    const { path } = node;
    return path;
  }
}

export default Runtime;