import { readFile } from "node:fs/promises";
import { join } from "node:path";

const statePath = join(process.cwd(), "LAUNCH_STATE.json");
const state = JSON.parse(await readFile(statePath, "utf8"));

const ready = state.gates.filter((gate) => gate.status === "ready_local").length;
const incomplete = state.gates.length - ready;

console.log(`Every Meal Guide launch status (${state.statusDate})`);
console.log(`Local completion: ${state.overallLocalCompletion}%`);
console.log(`Actually live: ${state.actuallyLive ? "yes" : "no"}`);
console.log(`Monetized: ${state.monetized ? "yes" : "no"}`);
console.log("");
console.log(`Ready locally: ${ready}/${state.gates.length}`);
console.log(`Still incomplete: ${incomplete}/${state.gates.length}`);
console.log("");

for (const gate of state.gates) {
  const marker = gate.status === "ready_local" ? "[ready]" : "[todo]";
  console.log(`${marker} ${gate.name}: ${gate.evidence}`);
}

console.log("");
console.log("Next best sequence:");
state.nextBestSequence.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});
