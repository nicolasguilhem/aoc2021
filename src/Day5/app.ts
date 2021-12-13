import { input } from "./input";
import { inputTest } from "./inputTest";

export class Matrice {
  data: Array<Array<number>> = [];

  constructor(input: Array<string>, withDiagonales: boolean) {
    input.forEach((value) =>
      this.addData(Ligne.buildLigne(value), withDiagonales)
    );
  }

  get nbPointSup1(): number {
    let nbPointSup1 = 0;
    this.data.forEach((ligne) =>
      ligne.forEach((value) => (value > 1 ? nbPointSup1++ : null))
    );
    return nbPointSup1;
  }

  toString(): string {
    let chaine = "";
    for (const ligne of this.data) {
      const texte: Array<string> = [
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
      ];
      if (ligne) {
        ligne.forEach((val, index) => (texte[index] = val + ""));
      }
      chaine += texte.join("") + "\n";
    }
    return chaine;
  }

  addData(ligne: Ligne, withDiagonales: boolean) {
    if (ligne.pointA.x === ligne.pointB.x) {
      const depart =
        ligne.pointA.y < ligne.pointB.y ? ligne.pointA.y : ligne.pointB.y;
      const fin =
        ligne.pointB.y < ligne.pointA.y ? ligne.pointA.y : ligne.pointB.y;
      for (let y = depart; y <= fin; y++) {
        if (!this.data[y]) {
          this.data[y] = [];
        }
        if (!this.data[y][ligne.pointA.x]) {
          this.data[y][ligne.pointA.x] = 0;
        }
        this.data[y][ligne.pointA.x]++;
      }
    } else if (ligne.pointA.y === ligne.pointB.y) {
      const depart =
        ligne.pointA.x < ligne.pointB.x ? ligne.pointA.x : ligne.pointB.x;
      const fin =
        ligne.pointB.x < ligne.pointA.x ? ligne.pointA.x : ligne.pointB.x;
      for (let x = depart; x <= fin; x++) {
        if (!this.data[ligne.pointA.y]) {
          this.data[ligne.pointA.y] = [];
        }
        if (!this.data[ligne.pointA.y][x]) {
          this.data[ligne.pointA.y][x] = 0;
        }
        this.data[ligne.pointA.y][x]++;
      }
    } else if (withDiagonales) {
      let x = ligne.pointA.x;
      let y = ligne.pointA.y;
      while (true) {
        if (!this.data[y]) {
          this.data[y] = [];
        }
        if (!this.data[y][x]) {
          this.data[y][x] = 0;
        }
        this.data[y][x]++;

        x += ligne.pointA.x > ligne.pointB.x ? -1 : +1;
        y += ligne.pointA.y > ligne.pointB.y ? -1 : +1;

        if (ligne.pointA.x > ligne.pointB.x && x < ligne.pointB.x) {
          break;
        } else if (ligne.pointA.x < ligne.pointB.x && x > ligne.pointB.x) {
          break;
        } else if (ligne.pointA.y > ligne.pointB.y && y < ligne.pointB.y) {
          break;
        } else if (ligne.pointA.y < ligne.pointB.y && y > ligne.pointB.y) {
          break;
        }
      }
    }
  }
}

export class Point {
  static buildPoint(valeur: string): Point {
    return new Point(
      parseInt(valeur.split(",")[0]),
      parseInt(valeur.split(",")[1], 0)
    );
  }
  constructor(public x: number, public y: number) {}
}

export class Ligne {
  static buildLigne(valeur: string): Ligne {
    return new Ligne(
      Point.buildPoint(valeur.split(" -> ")[0]),
      Point.buildPoint(valeur.split(" -> ")[1])
    );
  }
  constructor(public pointA: Point, public pointB: Point) {}
}

function main(input): number {
  const lstLignesInput: Array<string> = input
    .split("\n")
    .filter((value) => !!value);

  const matrice = new Matrice(lstLignesInput, false);
  return matrice.nbPointSup1;
}

// console.log(`Step 1 : inputTest=${main(inputTest)}`);
// console.log(`Step 1 : input=${main(input)}`);
