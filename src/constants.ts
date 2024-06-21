export const API_VERSION = 'v9';
export enum OptionTypes {
	String,
}

export enum TokenType {
  Keyword,
  Number,
  String,
  Equal,
  Decorator,
  Greater,
  Hash,
  Identifier,
  Option, 
}

export enum Status {
  Error,
  Ok,
  MFA
}

export enum ZIndex {
  Overlap = 102
}