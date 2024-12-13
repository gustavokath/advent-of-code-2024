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

const visited = new Set<string>();

const calculatePerimeter = (
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

  let perimeter = 0;
  let area = 0;

  for (const [dx, dy] of navigation) {
    if (checkChange(x + dx, y + dy, type)) {
      perimeter++;
    } else {
      const [sumPerimeter, sumArea] = calculatePerimeter(x + dx, y + dy, type);
      perimeter += sumPerimeter;
      area += sumArea;
    }
  }

  if (map[y][x] === type) {
    area++;
  }

  return [perimeter, area];
};

const checkChange = (x: number, y: number, type: string): boolean => {
  if (!isValidPos(x, y) || map[y][x] !== type) {
    return true;
  }
  return false;
};

let result = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (!visited.has(`${x},${y}`)) {
      const [perimeter, area] = calculatePerimeter(x, y, map[y][x]);
      result += perimeter * area;
    }
  }
}
console.log(result);
