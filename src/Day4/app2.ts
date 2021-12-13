import { input } from "./input";
import { inputTest } from "./inputTest";
import { Planche, initPlanches } from "./app";

function main(input): number {
  const lstLignesInput: Array<string> = input
    .split("\n")
    .filter((value) => !!value);

  const numerosTires = lstLignesInput[0]
    .split(",")
    .map((value) => parseInt(value));

  let lstPlanches: Array<Planche> = initPlanches(lstLignesInput);

  let numerosAVerifier = [];

  for (const numerosTire of numerosTires) {
    numerosAVerifier = [...numerosAVerifier, numerosTire];

    lstPlanches = lstPlanches.filter(
      (planche) => !planche.isPlancheGagnante(numerosAVerifier)
    );

    if (lstPlanches.length === 1) {
      break;
    }
  }

  numerosAVerifier = [];
  for (const numerosTire of numerosTires) {
    numerosAVerifier = [...numerosAVerifier, numerosTire];

    if (lstPlanches[0].isPlancheGagnante(numerosAVerifier)) {
      return lstPlanches[0].sommeNonMarques(numerosAVerifier) * numerosTire;
    }
  }

  return 0;
}

console.log(`Step 2 : inputTest=${main(inputTest)}`);
console.log(`Step 2 : input=${main(input)}`);
