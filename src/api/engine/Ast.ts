export class ScriptNode {
  kind = 'Script' as const;
  children = new Array<Node>();
}

export class KeywordNode {
  kind = 'Keyword' as const;
  constructor(
    public id: string,
    public options: { [key: string]: unknown },
    public children?: Node
  ) {}
}

export class OptionsExpressionNode {
  kind = 'OptionsExpression' as const;
  constructor(
    public value: { [key: string]: unknown }
  ) {}
}

export class IdentifierNode {
  kind = 'Identifier' as const;
  constructor(public id: string, public children?: Node) {}
}

export class UserExpressionNode {
  kind = 'UserExpression' as const;
  constructor(public name: string) {}
}

export class ChannelExpressionNode {
  kind = 'ChannelExpression' as const;
  constructor(public name: string) {}
}

export class PathExpressionNode {
  kind = 'PathExpression' as const;
  constructor(public path: string[]) {}
}

export class StringLiteralNode {
  kind = 'StringLiteral' as const;
  constructor(public value: string) {}
}

export class NumberLiteralNode {
  kind = 'NumberLiteral' as const;
  constructor(public value: number) {}
}

export type Node = 
  | KeywordNode
  | OptionsExpressionNode
  | IdentifierNode
  | UserExpressionNode
  | ChannelExpressionNode
  | PathExpressionNode
  | StringLiteralNode
  | NumberLiteralNode
  | ScriptNode;
