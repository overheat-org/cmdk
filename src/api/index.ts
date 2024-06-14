import './jsx';

const ctx = require.context("./commands", false);
export const commands = new Map<string, object>();
export const commandNames = Array.from(commands.keys());

ctx.keys().forEach(k => {
  const cmd = ctx(k).default;
  commands.set(cmd.name, cmd);
})
