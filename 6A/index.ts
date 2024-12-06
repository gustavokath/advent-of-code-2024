import { lineUtil } from "../util";

const map: string[][] = [];
let guardY = 0;
let guardX = 0;
for await (const line of lineUtil) {
  const lineArray = line.trim().split("");
  map.push(lineArray);

  const guardPos = line.indexOf("^");
  if (guardPos !== -1) {
    guardX = guardPos;
    guardY = map.length - 1;
  }
}

const isValidPos = (x: number, y: number): boolean => {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
};

const switchDir = (x: number, y: number): [number, number] => {
  if (y === -1) {
    return [1, 0];
  }
  if (y === 1) {
    return [-1, 0];
  }
  if (x === -1) {
    return [0, -1];
  }

  return [0, 1];
};

let dirY = -1;
let dirX = 0;
let count = 0;
map[guardY][guardX] = ".";
while (isValidPos(guardX, guardY)) {
  if (map[guardY][guardX] === "#") {
    guardX -= dirX;
    guardY -= dirY;
    [dirX, dirY] = switchDir(dirX, dirY);
  }

  if (map[guardY][guardX] === ".") {
    map[guardY][guardX] = "X";
    count += 1;
  }

  guardX += dirX;
  guardY += dirY;
  // console.table(map);
}

console.log(count);
