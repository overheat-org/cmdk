import './jsx';
import { Keyword } from './engine';

const ctx = require.context("./commands", false);

export const commands = new Map<string, Keyword>(
  ctx.keys().map(k => {
    const cmd = ctx(k).default;
    return [cmd.id, cmd];
  })
);

export * from './engine';