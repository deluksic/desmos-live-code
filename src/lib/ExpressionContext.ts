import { createContext } from "./context";
import { getExpressionState } from "./ExpressionStateContext";

export type ExpressionContextType = { expressions: Desmos.ExpressionState[] };
export const ExpressionContext = createContext<ExpressionContextType>({
  name: "ExpressionContext",
});

export function appendExpression(...expr: Desmos.ExpressionState[]) {
  const state = getExpressionState();
  const ctx = ExpressionContext.use();
  console.log(expr, state);
  ctx.expressions.push(...expr.map((e) => ({ ...state, ...e })));
}
