import { lineUtil } from "../util";

let count = 0;
const matrix: string[][] = [];
for await (const line of lineUtil) {
  matrix.push(line.trim().split(""));
}

const nextActions = [-1, 0, 1];
const expectedWord = ["X", "M", "A", "S"];

const isValidPos = (x: number, y: number): boolean => {
  return x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length;
};

const navigate = (
  x: number,
  y: number,
  dirX: number,
  dirY: number,
  expectedIndex: number
): boolean => {
  const expectedChar = expectedWord[expectedIndex];

  if (expectedChar !== matrix[y][x] || expectedIndex >= expectedWord.length) {
    return false;
  }

  if (expectedChar === "S" && expectedChar === matrix[y][x]) {
    count += 1;
    return true;
  }

  const nextPosX = x + dirX;
  const nextPosY = y + dirY;

  if (!isValidPos(nextPosX, nextPosY)) {
    return false;
  }

  navigate(nextPosX, nextPosY, dirX, dirY, expectedIndex + 1);

  return false;
};

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] === "X") {
      for (const nextX of nextActions) {
        for (const nextY of nextActions) {
          if (nextX === 0 && nextY === 0) {
            continue;
          }

          navigate(x, y, nextX, nextY, 0);
        }
      }
    }
  }
}

console.log(count);
