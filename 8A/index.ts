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

let count = 0;
for (const [key, values] of positions) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      const [firstX, firstY] = values[i];
      const [secondX, secondY] = values[j];
      const [deltaX, deltaY] = [secondX - firstX, secondY - firstY];

      const antiNode1 = [firstX + deltaX * -1, firstY + deltaY * -1];
      const antiNode2 = [secondX + deltaX, secondY + deltaY];

      if (
        isValidPos(antiNode1[1], antiNode1[0]) &&
        map[antiNode1[1]][antiNode1[0]] !== "#"
      ) {
        count += 1;
        map[antiNode1[1]][antiNode1[0]] = "#";
      }

      if (
        isValidPos(antiNode2[1], antiNode2[0]) &&
        map[antiNode2[1]][antiNode2[0]] !== "#"
      ) {
        count += 1;
        map[antiNode2[1]][antiNode2[0]] = "#";
      }
    }
  }
}

console.log(count);
