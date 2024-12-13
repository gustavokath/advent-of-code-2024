import { lineUtil } from "../util";

let map: number[][] = [];
for await (const l of lineUtil) {
  map.push(l.split("").map((c) => Number(c)));
}

const isValidPos = (x: number, y: number): boolean => {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
};

const trailHeads = (
  x: number,
  y: number,
  expected: number,
  seen: Set<string>
): number => {
  if (!isValidPos(x, y)) {
    return 0;
  }
  if (seen.has(`${x},${y}`)) {
    return 0;
  }
  if (map[y][x] !== expected) {
    return 0;
  }

  seen.add(`${x},${y}`);
  if (map[y][x] === 9) {
    return 1;
  }

  let sum = 0;
  const next = expected + 1;

  sum += trailHeads(x + 1, y, next, seen);
  sum += trailHeads(x - 1, y, next, seen);
  sum += trailHeads(x, y + 1, next, seen);
  sum += trailHeads(x, y - 1, next, seen);

  return sum;
};

let sum = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 0) {
      sum += trailHeads(x, y, 0, new Set());
    }
  }
}

console.log(sum);
