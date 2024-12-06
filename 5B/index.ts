import { lineUtil } from "../util";

const rules = new Map<number, number[]>();
const updates: number[][] = [];
let isRules = true;

for await (const line of lineUtil) {
  if (line === "") {
    isRules = false;
    continue;
  }

  if (isRules) {
    const [prev, restriction] = line
      .split("|")
      .map((value) => Number(value.trim()));

    if (!rules.has(prev)) {
      rules.set(prev, []);
    }

    rules.get(prev)!.push(restriction);
  } else {
    updates.push(line.split(",").map((value) => Number(value.trim())));
  }
}

const isValid = (updates: number[]): boolean => {
  const seen = new Set<number>();

  for (const page of updates) {
    const restrictions = rules.get(page);
    if (restrictions && restrictions?.some((value) => seen.has(value))) {
      return false;
    }
    seen.add(page);
  }

  return true;
};

let sum = 0;
for (const update of updates) {
  if (!isValid(update)) {
    update.sort((a, b) => (rules.get(b)?.includes(a) ? -1 : 0));
    sum += update[Math.floor(update.length / 2)];
  }
}

console.log(sum);
