import { lineUtil } from "../util";

const leftList: number[] = [];
const rightMap: Map<number, number> = new Map();
for await (const line of lineUtil) {
  const [left, right] = line.split("   ").map((value) => value.trim());
  leftList.push(Number(left));

  rightMap.set(Number(right), (rightMap.get(Number(right)) ?? 0) + 1);
}

let similarity = 0;
leftList.forEach((left) => {
  similarity += left * (rightMap.get(left) ?? 0);
});

console.log(similarity);
