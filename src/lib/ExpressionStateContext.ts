import { createContext } from "./context";

export type ApplyableExpressionState = Partial<
  Omit<Desmos.ExpressionState & { type: "expression" }, "type" | "id">
>;

const ExpressionStateContext = createContext<ApplyableExpressionState>({
  name: "ExpressionStateContextType",
  defaultValue: {},
});

export const applyState = ExpressionStateContext.provide;

export function hide<R>(body: () => R): R {
  return applyState({ hidden: true }, body);
}

export function getExpressionState() {
  const state = {};
  for (const e of ExpressionStateContext.stack) {
    Object.assign(state, e);
  }
  return state;
}
