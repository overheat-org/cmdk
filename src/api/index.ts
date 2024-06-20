import './jsx';
import type { Keyword } from './jsx';

const ctx = require.context("./commands", false);

export const commandNames = ctx.keys();
export const commands = new Map<string, Keyword>(
  commandNames.map(c => [c, ctx(c).default])
);