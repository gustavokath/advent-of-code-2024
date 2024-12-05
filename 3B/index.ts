import { lineUtil } from "../util";

let result = 0;
let active = true;
for await (const line of lineUtil) {
  const matches = line.matchAll(
    /mul\([0-9]{1,3},[0-9]{1,3}\)|don't\(\)|do\(\)/g
  );
  for (const match of matches) {
    switch (match[0]) {
      case "don't()":
        active = false;
        break;
      case "do()":
        active = true;
        break;
      default:
        if (active) {
          const [x, y] = match[0].slice(4, match[0].length - 1).split(",");
          result += parseInt(x) * parseInt(y);
        }
        break;
    }
  }
}

console.log(result);
