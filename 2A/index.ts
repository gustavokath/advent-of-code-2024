import { lineUtil } from "../util";

const invalid = (diff: number, ascending: boolean): boolean => {
  return ascending ? diff < 1 || diff > 3 : diff > -1 || diff < -3;
};

let safe = 0;
for await (const line of lineUtil) {
  const levels = line.split(" ").map((value) => Number(value.trim()));

  let isSafe = true;
  let ascending = levels[1] > levels[0];

  for (let i = 1; i < levels.length; i++) {
    const dif = levels[i] - levels[i - 1];

    if (invalid(dif, ascending)) {
      isSafe = false;
      break;
    }
  }

  if (isSafe) {
    safe++;
  }
}

console.log(safe);
