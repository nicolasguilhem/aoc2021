import { input } from "./input";
import { inputTest } from "./inputTest";

export class LigneOuColonneDePlanche {
  constructor(public numeros: Array<number>) {}

  getNumeroDeColonne(index: number): number {
    return this.numeros[index];
  }

  isLigneOuColonneGagnante(numerosTires: Array<number>): boolean {
    if (numerosTires.length < 5) {
      return false;
    }

    let nbNumeroGagnant = 0;
    for (const numero of this.numeros) {
      if (
        numerosTires.find((numeroTire) => numeroTire === numero) !== undefined
      ) {
        nbNumeroGagnant++;
      }
    }

    return nbNumeroGagnant === 5;
  }

  sommeNonMarques(numerosTires: Array<number>): number {
    const numerosAsommer = this.numeros.filter(
      (numeroCourant) =>
        numerosTires.find((numeroTire) => numeroTire === numeroCourant) ===
        undefined
    );
    return numerosAsommer.length > 0
      ? numerosAsommer.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        )
      : 0;
  }

  display(): void {
    console.log(this.numeros.join());
  }
}

export class Planche {
  numeros: Array<LigneOuColonneDePlanche> = [];

  get colonnes(): Array<LigneOuColonneDePlanche> {
    const colonnes: Array<LigneOuColonneDePlanche> = [];
    for (let iLigne = 0; iLigne < 5; iLigne++) {
      const valColonne: Array<number> = [];
      for (let iColonne = 0; iColonne < 5; iColonne++) {
        valColonne.push(this.numeros[iColonne].getNumeroDeColonne(iLigne));
      }
      colonnes.push(new LigneOuColonneDePlanche(valColonne));
    }

    return colonnes;
  }

  addLigne(numerosLigne: Array<number>) {
    this.numeros.push(new LigneOuColonneDePlanche(numerosLigne));
  }

  isPlancheGagnante(numerosTires: Array<number>): boolean {
    for (const ligne of this.numeros) {
      if (ligne.isLigneOuColonneGagnante(numerosTires)) {
        return true;
      }
    }

    for (const colonne of this.colonnes) {
      if (colonne.isLigneOuColonneGagnante(numerosTires)) {
        return true;
      }
    }

    return false;
  }

  sommeNonMarques(numerosTires: Array<number>): number {
    return this.numeros
      .map((ligne) => ligne.sommeNonMarques(numerosTires))
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  displayAsLignes(): void {
    this.numeros.forEach((ligne) => ligne.display());
    console.log("");
  }

  displayAsColonnes(): void {
    this.colonnes.forEach((colonne) => colonne.display());
    console.log("");
  }
}

export function initPlanches(lstLignesInput: Array<string>): Array<Planche> {
  const lstPlanches: Array<Planche> = [];

  let planche = new Planche();
  for (let i = 1; i < lstLignesInput.length; i++) {
    planche.addLigne(
      lstLignesInput[i]
        .split(" ")
        .filter((value) => !!value)
        .map((value) => parseInt(value))
    );
    if (i % 5 === 0) {
      lstPlanches.push(planche);
      planche = new Planche();
    }
  }

  return lstPlanches;
}

function main(input): number {
  const lstLignesInput: Array<string> = input
    .split("\n")
    .filter((value) => !!value);

  const numerosTires = lstLignesInput[0]
    .split(",")
    .map((value) => parseInt(value));

  const lstPlanches: Array<Planche> = initPlanches(lstLignesInput);

  let numerosAVerifier = [];

  for (const numerosTire of numerosTires) {
    numerosAVerifier = [...numerosAVerifier, numerosTire];

    const plancheGagnante = lstPlanches.find((planche) =>
      planche.isPlancheGagnante(numerosAVerifier)
    );

    if (plancheGagnante) {
      return plancheGagnante.sommeNonMarques(numerosAVerifier) * numerosTire;
    }
  }

  return 0;
}

console.log(`Step 1 : inputTest=${main(inputTest)}`);
console.log(`Step 1 : input=${main(input)}`);
