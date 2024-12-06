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

const run = (map: string[][], guardX: number, guardY: number): boolean => {
  let dirY = -1;
  let dirX = 0;
  const visited = new Map<string, Set<string>>();

  map[guardY][guardX] = ".";
  while (isValidPos(guardX, guardY)) {
    if (map[guardY][guardX] === "#" || map[guardY][guardX] === "O") {
      guardX -= dirX;
      guardY -= dirY;
      [dirX, dirY] = switchDir(dirX, dirY);
    }

    if (map[guardY][guardX] !== "#") {
      const pos = `${guardX},${guardY}`;
      if (visited.get(pos)?.has(`${dirX},${dirY}`)) {
        // Loop found
        return false;
      }

      if (!visited.has(pos)) {
        visited.set(pos, new Set());
      }
      visited.get(pos)?.add(`${dirX},${dirY}`);
    }

    guardX += dirX;
    guardY += dirY;
    // console.table(map);
  }

  return true;
};

let count = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] !== ".") {
      continue;
    }

    map[y][x] = "#";
    if (!run([...map], guardX, guardY)) {
      count += 1;
    }
    map[y][x] = ".";
  }
}

console.log(count);
