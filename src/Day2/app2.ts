import { input } from "./input";
import { inputTest } from "./inputTest";

export class SousMarin {
  hPosition = 0;
  profondeur = 0;
  target = 0;

  get currentPos(): number {
    return this.hPosition * this.profondeur;
  }

  private goForward(value: number) {
    this.hPosition += value;
    this.profondeur += this.target * value;
  }

  private goDown(value: number) {
    this.target += value;
  }

  private goUp(value: number) {
    this.target -= value;
  }

  doInstruction(instruction: string, value: number) {
    switch (instruction) {
      case "forward":
        this.goForward(value);
        break;
      case "down":
        this.goDown(value);
        break;
      case "up":
        this.goUp(value);
        break;
      default:
        throw new Error(`Wrong direction '${instruction}'`);
    }
  }
}

function main1(input): number {
  const instructions = input.split("\n").map((inst) => ({
    instruction: inst.split(" ")[0],
    value: +inst.split(" ")[1],
  }));
  const sousMarin = new SousMarin();
  instructions.forEach((instruction) =>
    sousMarin.doInstruction(instruction.instruction, instruction.value)
  );
  return sousMarin.currentPos;
}

console.log(`Step 2 : inputTest=${main1(inputTest)}`);
console.log(`Step 2 : input=${main1(input)}`);
