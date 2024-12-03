import { lineUtil } from "../util";

let safe = 0;
for await (const line of lineUtil) {
  const levels = line.split(" ").map((value) => Number(value.trim()));

  let isSafe = true;
  let hasSkipped = false;
  let prevDiff = levels[1] - levels[0];

  let invalidIndex = undefined;
  for (let i = 0; i < levels.length; i++) {
    const diff = levels[i + 1] - levels[i];

    // Check if the difference is invalid
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
      invalidIndex = i;
    }

    // Check if the difference has changed direction
    if ((prevDiff > 0 && diff < 0) || (prevDiff < 0 && diff > 0)) {
      invalidIndex = i;
    }

    // Check if has error and it has already skipped
    if (invalidIndex !== undefined && hasSkipped) {
      isSafe = false;
      break;
    }

    if (invalidIndex !== undefined) {
      const skipDiff = levels[invalidIndex + 1] - levels[invalidIndex - 1];

      // Check if the difference has changed direction for the skipped index
      if ((prevDiff > 0 && skipDiff < 0) || (prevDiff < 0 && skipDiff > 0)) {
        isSafe = false;
        break;
      }

      // Check if the difference is invalid for the skipped index
      if (Math.abs(skipDiff) > 3 || Math.abs(skipDiff) < 1) {
        if (hasSkipped) {
          isSafe = false;
          break;
        }
      }

      hasSkipped = true;
      invalidIndex = undefined;
    }
    prevDiff = diff;
  }

  if (isSafe) {
    safe++;
  }
}

console.log(safe);
