import { lineUtil } from "../util";

let result = 0;
for await (const line of lineUtil) {
  const matches = line.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  for (const match of matches) {
    const [x, y] = match[0].slice(4, match[0].length - 1).split(",");
    result += parseInt(x) * parseInt(y);
  }
}

console.log(result);
