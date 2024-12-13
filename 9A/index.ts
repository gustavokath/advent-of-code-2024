import { lineUtil } from "../util";

let line = "";
for await (const l of lineUtil) {
  line = l;
}
const diskMap = line.split("").map((v) => Number(v));

type FileSystem = {
  id: number | undefined;
  size: number;
  free: boolean;
}[];

const readDisk = (diskMap: number[]): FileSystem => {
  const fileSystem: FileSystem = [];

  let isFree = false;
  let id = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const blockSize = diskMap[i];
    if (blockSize === 0) {
      isFree = false;
      continue;
    }

    if (!isFree) {
      fileSystem.push({ id, size: blockSize, free: isFree });
      id++;
    } else {
      fileSystem.push({ id: undefined, size: blockSize, free: isFree });
    }

    isFree = !isFree;
  }

  return fileSystem;
};

const compressDisk = (fileSystem: FileSystem): number[] => {
  const disk: number[] = [];
  let begin = 0;
  let end = fileSystem.length - 1;
  while (begin <= end) {
    const beginBlock = fileSystem[begin];
    const endBlock = fileSystem[end];
    if (endBlock.free || endBlock.id === undefined) {
      end--;
      continue;
    }

    while (
      !beginBlock.free &&
      beginBlock.size > 0 &&
      beginBlock.id !== undefined
    ) {
      disk.push(beginBlock.id);
      beginBlock.size--;
    }

    while (beginBlock.free && beginBlock.size > 0 && endBlock.size > 0) {
      disk.push(endBlock.id);
      endBlock.size--;
      beginBlock.size--;
    }

    if (beginBlock.size === 0 || !beginBlock.free) {
      begin++;
    }

    if (endBlock.size === 0 || endBlock.free) {
      end--;
    }
  }
  return disk;
};

const checksum = (disk: number[]): number => {
  let sum = 0;
  for (let i = 0; i < disk.length; i++) {
    sum += i * disk[i];
  }
  return sum;
};

const fileSystem = readDisk(diskMap);
const disk = compressDisk(fileSystem);
console.log(checksum(disk));
