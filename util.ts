import readline from "readline";

const lineUtil = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

export { lineUtil };
