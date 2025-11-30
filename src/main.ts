import { op, point } from "./lib/operators";
import { runExample } from "./lib/runExample";

function* linesDemo(): Generator<Desmos.ExpressionState> {
  yield point("P_1", "(0, 0)");
  yield point("P_2", "(0, 5)");
  yield {
    id: "hello-world",
    type: "expression",
    latex: op("segment", "P_1", "P_2"),
    color: "#000000",
  };
}

runExample(linesDemo())
