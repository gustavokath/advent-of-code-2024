import { lineUtil } from "../util";

const checkIfMatch = (numbers: number[], result: number) => {
  let partialResults: number[] = [numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    let newPartials: number[] = [];
    for (const partial of partialResults) {
      const sumResult = partial + numbers[i];
      const multiResult = partial * numbers[i];

      if (sumResult === result || multiResult === result) {
        return true;
      }

      if (sumResult < result) {
        newPartials.push(sumResult);
      }

      if (multiResult < result) {
        newPartials.push(multiResult);
      }
    }
    partialResults = newPartials;
  }
};

let correctsSum = 0;
for await (const line of lineUtil) {
  const [result, numbersStr] = line.split(":");
  const numbers = numbersStr.trim().split(" ").map(Number);

  if (checkIfMatch(numbers, Number(result))) {
    correctsSum += Number(result);
  }
}

console.log(correctsSum);
