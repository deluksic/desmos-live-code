import {
  applyState,
  hide,
  type ApplyableExpressionState,
} from "./lib/ExpressionStateContext";
import {
  abs,
  define,
  div,
  expr,
  neg,
  op,
  point,
  slider,
  vector,
} from "./lib/operators";
import { runExample } from "./lib/runExample";

const guideLineStyle: ApplyableExpressionState = {
  hidden: false,
  lineStyle: "DASHED",
  lineOpacity: 0.1,
  color: "black",
};

function externalNormals(A: string, B: string, rA: string, rB: string) {
  const dAB = vector(A, B, { id: `d_{${A}${B}}`, hidden: true });
  const nAB = define(div(dAB, abs(dAB)), { id: `n_{${A}${B}}`, hidden: true });
  const { v2, v3, v4, v5 } = hide(() => {
    const alpha = define(op("arccos", div(`${rA}-${rB}`, op("length", dAB))), {
      id: `\\alpha_{${A}${B}}`,
    });
    const nLAB = define(op("rotate", nAB, A, alpha), { id: `n_{L${A}${B}}` });
    const nRAB = define(op("rotate", nAB, A, neg(alpha)), {
      id: `n_{R${A}${B}}`,
    });
    return {
      v2: define(op("translate", A, `${rA}${nLAB}`), { id: `v_{${A}${B}2}` }),
      v3: define(op("translate", A, `${rA}${nRAB}`), { id: `v_{${A}${B}3}` }),
      v4: define(op("translate", B, `${rB}${nRAB}`), { id: `v_{${A}${B}4}` }),
      v5: define(op("translate", B, `${rB}${nLAB}`), { id: `v_{${A}${B}5}` }),
    };
  });
  applyState(guideLineStyle, () => {
    expr(op("line", v2, v5));
    expr(op("line", v3, v4));
  });
}

function linesDemo() {
  const rA = slider(1, { min: 0, max: 5 }, { id: "r_a" });
  const rB = slider(2, { min: 0, max: 5 }, { id: "r_b" });
  const rC = slider(1, { min: 0, max: 5 }, { id: "r_c" });
  const rD = slider(1, { min: 0, max: 5 }, { id: "r_d" });
  const A = point(0, 0, { id: "A" });
  const B = point(2, 0, { id: "B" });
  const C = point(4, 0, { id: "C" });
  const D = point(6, 0, { id: "D" });
  applyState(guideLineStyle, () => {
    expr(op("circle", A, rA));
    expr(op("circle", B, rB));
    expr(op("circle", C, rC));
    expr(op("circle", D, rD));
  });
  externalNormals(A, B, rA, rB);
  externalNormals(B, C, rB, rC);
  externalNormals(C, D, rC, rD);
}

runExample(linesDemo);
