import { lineUtil } from "../util";

const map: string[][] = [];
const positions = new Map<string, Array<[number, number]>>();
let y = 0;
for await (const line of lineUtil) {
  const lineArray = line.trim().split("");
  map.push(lineArray);

  for (let x = 0; x < lineArray.length; x++) {
    if (lineArray[x] !== ".") {
      if (!positions.has(lineArray[x])) {
        positions.set(lineArray[x], []);
      }
      positions.get(lineArray[x])!.push([x, y]);
    }
  }
  y++;
}

const isValidPos = (x: number, y: number): boolean => {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
};

const checkAntiNode = (
  x: number,
  y: number,
  deltaX: number,
  deltaY: number,
  multiplier: number
): number => {
  let antiNodeCount = 0;
  let antiNode1 = [x + deltaX * multiplier, y + deltaY * multiplier];
  while (isValidPos(antiNode1[1], antiNode1[0])) {
    if (map[antiNode1[1]][antiNode1[0]] === ".") {
      antiNodeCount += 1;
      map[antiNode1[1]][antiNode1[0]] = "#";
    }
    antiNode1 = [
      antiNode1[0] + deltaX * multiplier,
      antiNode1[1] + deltaY * multiplier,
    ];
  }
  return antiNodeCount;
};

let count = 0;
for (const [key, values] of positions) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      const [firstX, firstY] = values[i];
      const [secondX, secondY] = values[j];
      const [deltaX, deltaY] = [secondX - firstX, secondY - firstY];

      count = count + checkAntiNode(firstX, firstY, deltaX, deltaY, -1);

      count = count + checkAntiNode(secondX, secondY, deltaX, deltaY, 1);
    }
  }
  if (values.length > 1) {
    count += values.length;
  }
}

console.log(count);
