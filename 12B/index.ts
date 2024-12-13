import { lineUtil } from "../util";

let map: string[][] = [];
for await (const l of lineUtil) {
  map.push(l.split(""));
}

const isValidPos = (x: number, y: number): boolean => {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
};

const navigation = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const corners = [
  [
    [-1, 0],
    [0, -1],
  ], // Top left
  [
    [1, 0],
    [0, -1],
  ], // Top right
  [
    [1, 0],
    [0, 1],
  ], // Bottom right
  [
    [-1, 0],
    [0, 1],
  ], // Bottom left
];

const visited = new Set<string>();

const calculateCorners = (
  x: number,
  y: number,
  type: string
): [number, number] => {
  if (!isValidPos(x, y)) {
    return [0, 0];
  }

  if (visited.has(`${x},${y}`)) {
    return [0, 0];
  }

  visited.add(`${x},${y}`);

  let corners = 0;
  let area = 0;

  for (const [dx, dy] of navigation) {
    if (!shouldCheck(x + dx, y + dy, type)) {
      continue;
    }

    const [sumCorners, sumArea] = calculateCorners(x + dx, y + dy, type);
    corners += sumCorners;
    area += sumArea;
  }

  if (map[y][x] === type) {
    area++;
    corners += numberOfCorners(x, y);
  }

  // console.log(map[y][x], x, y, numberOfCorners(x, y));

  return [corners, area];
};

const numberOfCorners = (x: number, y: number): number => {
  if (!isValidPos(x, y)) {
    return 0;
  }

  let count = 0;
  const current = map[y][x];
  for (const corner of corners) {
    const isCorner = corner.every(
      ([dx, dy]) =>
        !isValidPos(x + dx, y + dy) || map[y + dy][x + dx] !== current
    );

    const adjacent = corner.reduce(
      ([tx, ty], [dx, dy]) => [tx + dx, ty + dy],
      [0, 0]
    );
    const isAdjacentCorner =
      (!isValidPos(x + adjacent[0], y + adjacent[1]) ||
        map[y + adjacent[1]][x + adjacent[0]] !== current) &&
      corner.every(
        ([dx, dy]) =>
          isValidPos(x + dx, y + dy) && map[y + dy][x + dx] === current
      );

    if (isCorner || isAdjacentCorner) {
      count++;
    }
  }

  return count;
};

const shouldCheck = (x: number, y: number, type: string): boolean => {
  if (!isValidPos(x, y) || map[y][x] !== type) {
    return false;
  }
  return true;
};

let result = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (!visited.has(`${x},${y}`)) {
      const [perimeter, area] = calculateCorners(x, y, map[y][x]);
      result += perimeter * area;
      // console.log("RES:", map[y][x], perimeter, area);
    }
  }
}
console.log(result);
