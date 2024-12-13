import { lineUtil } from "../util";

const ITERATIONS = 75;

let line: number[] = [];
for await (const l of lineUtil) {
  line = l.split(" ").map((c) => Number(c));
}

const seen = new Map<string, number>();
let multiplier = 0;

const applyRules = (stone: number): number[] => {
  const stringNumber = stone.toString();
  if (stone === 0) {
    return [1];
  } else if (stringNumber.length % 2 === 0) {
    const half = stringNumber.length / 2;
    const firstHalf = Number(stringNumber.slice(0, half));
    const secondHalf = Number(stringNumber.slice(half));
    return [firstHalf, secondHalf];
  }

  return [stone * 2024];
};

const calculateNumOfStones = (stone: number, iterations: number): number => {
  if (iterations === 0) {
    seen.set(`${stone},${iterations}`, 1);
    // console.log("sum it0:", stone, 1);
    return 1;
  }
  if (seen.has(`${stone},${iterations}`)) {
    // console.log("sum cache:", stone, seen.get(stone));
    return seen.get(`${stone},${iterations}`)!;
  }

  let sum = 0;
  const newStones = applyRules(stone);

  for (const newStone of newStones) {
    if (seen.has(`${stone},${iterations}`)) {
      sum += seen.get(`${stone},${iterations}`)!;
    } else {
      sum += calculateNumOfStones(newStone, iterations - 1);
    }
  }

  seen.set(`${stone},${iterations}`, sum);
  return sum;
};

let result = 0;
for (const stone of line) {
  seen.clear();
  const a = calculateNumOfStones(stone, ITERATIONS);
  // console.log(stone, a);
  result += a;
}

console.log(result);
