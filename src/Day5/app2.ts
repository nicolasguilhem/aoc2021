import { input } from "./input";
import { inputTest } from "./inputTest";
import { Matrice } from "./app";

function main(input): number {
  const lstLignesInput: Array<string> = input
    .split("\n")
    .filter((value) => !!value);

  const matrice = new Matrice(lstLignesInput, true);
  return matrice.nbPointSup1;
}

console.log(`Step 2 : inputTest=${main(inputTest)}`);
console.log(`Step 2 : input=${main(input)}`);
