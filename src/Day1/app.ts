import { input } from "./input";
import { inputTest } from "./inputTest";

function main1(input): number {
  const profondeurs: Array<number> = input.split("\n").map((p) => +p);
  return profondeurs.filter((currentProf, currentIndex) =>
    currentIndex > 0 ? currentProf > profondeurs[currentIndex - 1] : false
  ).length;
}

console.log(`Step 1 : inputTest=${main1(inputTest)}`);
console.log(`Step 1 : input=${main1(input)}`);

function main2(input): string {
  const profondeurs = input.split("\n").map((p) => +p);
  return profondeurs.filter((currentProf, currentIndex) => {
    if (currentIndex > 0 && currentIndex < profondeurs.length - 2) {
      return (
        currentProf +
          profondeurs[currentIndex + 1] +
          profondeurs[currentIndex + 2] >
        profondeurs[currentIndex - 1] +
          currentProf +
          profondeurs[currentIndex + 1]
      );
    }
    return false;
  }).length;
}

console.log(`Step 2 : inputTest=${main2(inputTest)}`);
console.log(`Step 2 : input=${main2(input)}`);
