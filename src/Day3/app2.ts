import { input } from "./input";
import { inputTest } from "./inputTest";
import { countNbBitParColonne } from "./app";

function calculerValeur(tabValeurs: Array<string>, property: string) {
  const binaryLength = tabValeurs[0].length;

  for (let i = 0; i < binaryLength; i++) {
    const nbBitParColonne = countNbBitParColonne(tabValeurs);
    tabValeurs = tabValeurs.filter(
      (ligne) => ligne[i] === nbBitParColonne[i][property]
    );

    if (tabValeurs.length === 1) {
      return tabValeurs[0];
    }
  }
}

function main(input): number {
  const lstLigneRapport: Array<string> = input.split("\n");
  const valGenOxygene = parseInt(
    calculerValeur(lstLigneRapport, "genOxygene"),
    2
  );
  const valEpurateurCO2 = parseInt(
    calculerValeur(lstLigneRapport, "epurateurCO2"),
    2
  );

  return valGenOxygene * valEpurateurCO2;
}

console.log(`Step 2 : inputTest=${main(inputTest)}`);
console.log(`Step 2 : input=${main(input)}`);
