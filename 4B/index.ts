import { lineUtil } from "../util";

let count = 0;
const matrix: string[][] = [];
for await (const line of lineUtil) {
  matrix.push(line.trim().split(""));
}

const expectedMap: Record<string, string> = {
  M: "S",
  S: "M",
};

const validate = (x: number, y: number): boolean => {
  const topBottom = matrix[y - 1]?.[x - 1];

  if (
    !(topBottom in expectedMap) ||
    expectedMap[topBottom] !== matrix[y + 1]?.[x + 1]
  ) {
    return false;
  }

  const bottomTop = matrix[y + 1]?.[x - 1];
  if (
    !(bottomTop in expectedMap) ||
    expectedMap[bottomTop] !== matrix[y - 1]?.[x + 1]
  ) {
    return false;
  }

  return true;
};

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] === "A") {
      if (validate(x, y)) count += 1;
    }
  }
}

console.log(count);
