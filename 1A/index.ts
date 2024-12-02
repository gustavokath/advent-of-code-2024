import { lineUtil } from "../util";

const leftList: number[] = [];
const rightList: number[] = [];
for await (const line of lineUtil) {
  const [left, right] = line.split("   ").map((value) => value.trim());
  leftList.push(Number(left));
  rightList.push(Number(right));
}

leftList.sort();
rightList.sort();

let diff = 0;
leftList.forEach((left, index) => {
  diff += Math.abs(leftList[index] - rightList[index]);
});

console.log(diff);
