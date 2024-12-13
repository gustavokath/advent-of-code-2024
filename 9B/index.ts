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

const defrag = (fileSystem: FileSystem): FileSystem => {
  let right = fileSystem.length - 1;

  while (right > 0) {
    if (fileSystem[right].free) {
      right--;
      continue;
    }

    let left = 0;
    while (left < right) {
      if (
        !fileSystem[left].free ||
        fileSystem[left].size < fileSystem[right].size
      ) {
        left++;
        continue;
      }

      const tmp = fileSystem[left];
      const rightSize = fileSystem[right].size;

      fileSystem[left] = {
        id: fileSystem[right].id,
        size: rightSize,
        free: false,
      };

      if (tmp.size > rightSize) {
        const remainingSize = tmp.size - rightSize;
        if (fileSystem[left + 1]?.free) {
          fileSystem[left + 1].size += remainingSize;
        } else {
          fileSystem.splice(left + 1, 0, {
            id: undefined,
            size: remainingSize,
            free: true,
          });
          right++;
        }
      }

      fileSystem[right] = { id: undefined, size: rightSize, free: true };

      if (fileSystem[right - 1]?.free) {
        fileSystem[right - 1].size += rightSize;
        fileSystem.splice(right, 1);
        right--;
      }

      if (fileSystem[right]?.free && fileSystem[right + 1]?.free) {
        fileSystem[right].size += fileSystem[right + 1].size;
        fileSystem.splice(right + 1, 1);
      }

      break;
    }
    right--;
  }

  return fileSystem;
};

const convertToBits = (fileSystem: FileSystem): number[] => {
  const disk: number[] = [];
  for (let i = 0; i < fileSystem.length; i++) {
    for (let j = 0; j < fileSystem[i].size; j++) {
      disk.push(fileSystem[i].id ?? 0);
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
// console.log(fileSystem);
const defragmented = defrag(fileSystem);
// console.log(defragmented);
const disk = convertToBits(defragmented);
// console.log(disk);
console.log(checksum(disk));
