import { lineUtil } from "../util";

const ITERATIONS = 7;

let line: number[] = [];
for await (const l of lineUtil) {
  line = l.split(" ").map((c) => Number(c));
}

const applyRules = (stones: number[]): number[] => {
  const result: number[] = [];

  for (const current of stones) {
    const stringNumber = current.toString();
    if (current === 0) {
      result.push(1);
    } else if (stringNumber.length % 2 === 0) {
      const half = stringNumber.length / 2;
      const firstHalf = Number(stringNumber.slice(0, half));
      const secondHalf = Number(stringNumber.slice(half));
      result.push(firstHalf, secondHalf);
    } else {
      result.push(current * 2024);
    }
  }

  return result;
};

for (let i = 0; i < ITERATIONS; i++) {
  line = applyRules(line);
  console.log(line);
}

console.log(line.length);
