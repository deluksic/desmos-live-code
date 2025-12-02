import {
  abs,
  div,
  expr,
  neg,
  op,
  point,
  slider,
  vector,
  type ExpressionOpts,
} from "./lib/operators";
import { runExample } from "./lib/runExample";

const guideLineStyle: ExpressionOpts = {
  hidden: false,
  lineStyle: "DASHED",
  lineOpacity: 0.1,
  color: "black",
};

function* externalNormals(A: string, B: string, rA: string, rB: string) {
  const dAB = `d_{${A}${B}}`;
  const nAB = `n_{${A}${B}}`;
  const nLAB = `n_{L${A}${B}}`;
  const nRAB = `n_{R${A}${B}}`;
  const alpha = `\\alpha_{${A}${B}}`;
  const v2 = `v_{${A}${B}2}`;
  const v3 = `v_{${A}${B}3}`;
  const v4 = `v_{${A}${B}4}`;
  const v5 = `v_{${A}${B}5}`;
  yield vector(dAB, A, B);
  yield expr(nAB, div(dAB, abs(dAB)));
  yield expr(alpha, op("arccos", div(`${rA}-${rB}`, op("length", dAB))));
  yield expr(nLAB, op("rotate", nAB, A, alpha));
  yield expr(nRAB, op("rotate", nAB, A, neg(alpha)));
  yield expr(v2, op("translate", A, rA + nLAB));
  yield expr(v3, op("translate", A, rA + nRAB));
  yield expr(v4, op("translate", B, rB + nRAB));
  yield expr(v5, op("translate", B, rB + nLAB));
  yield expr(op("line", v2, v5), undefined, guideLineStyle);
  yield expr(op("line", v3, v4), undefined, guideLineStyle);
}

function* linesDemo(): Generator<Desmos.ExpressionState> {
  yield slider("r_a", 1, { min: 0, max: 5 });
  yield slider("r_b", 2, { min: 0, max: 5 });
  yield slider("r_c", 1, { min: 0, max: 5 });
  yield slider("r_d", 1, { min: 0, max: 5 });
  yield point("A", "(0, 0)");
  yield point("B", "(2, 0)");
  yield point("C", "(4, 0)");
  yield point("D", "(6, 0)");
  yield expr(op("circle", "A", "r_a"), undefined, guideLineStyle);
  yield expr(op("circle", "B", "r_b"), undefined, guideLineStyle);
  yield expr(op("circle", "C", "r_c"), undefined, guideLineStyle);
  yield expr(op("circle", "D", "r_d"), undefined, guideLineStyle);
  yield* externalNormals("A", "B", "r_a", "r_b");
  yield* externalNormals("B", "C", "r_b", "r_c");
  yield* externalNormals("C", "D", "r_c", "r_d");
}

runExample(linesDemo());
