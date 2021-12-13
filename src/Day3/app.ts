import { input } from "./input";
import { inputTest } from "./inputTest";

class ColonneRapport {
  nbBit0 = 0;
  nbBit1 = 0;

  get bitTauxGamma(): string {
    return this.nbBit0 > this.nbBit1 ? "0" : "1";
  }

  get bitTauxEpsilon(): string {
    return this.nbBit0 > this.nbBit1 ? "1" : "0";
  }

  get genOxygene(): string {
    return this.nbBit1 >= this.nbBit0 ? "1" : "0";
  }

  get epurateurCO2(): string {
    return this.nbBit1 >= this.nbBit0 ? "0" : "1";
  }

  addBit(bit: string) {
    if (bit === "0") {
      this.nbBit0 += 1;
    } else {
      this.nbBit1 += 1;
    }
  }
}

export function countNbBitParColonne(
  lstLigneRapport: Array<string>
): Array<ColonneRapport> {
  const nbBitParColonne: Array<ColonneRapport> = [];

  lstLigneRapport
    .map((ligne) => ligne.split(""))
    .forEach((lstBits) => {
      lstBits.forEach((bit, index) => {
        if (!nbBitParColonne[index]) {
          nbBitParColonne[index] = new ColonneRapport();
        }
        nbBitParColonne[index].addBit(bit);
      });
    });
  return nbBitParColonne;
}

function main1(input): number {
  const lstLigneRapport: Array<string> = input.split("\n");

  const nbBitParColonne = countNbBitParColonne(lstLigneRapport);

  const tauxGamma = parseInt(
    nbBitParColonne.map((bit) => bit.bitTauxGamma).join(""),
    2
  );
  const tauxEpsilon = parseInt(
    nbBitParColonne.map((bit) => bit.bitTauxEpsilon).join(""),
    2
  );

  return tauxGamma * tauxEpsilon;
}

//console.log(`Step 1 : inputTest=${main1(inputTest)}`);
//console.log(`Step 1 : input=${main1(input)}`);
