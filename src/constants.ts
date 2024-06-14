export const API_VERSION = 'v9';
export enum OptionTypes {
	String,
}
export enum TokenType {
  End,
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
