import { isDefined } from "../utils/isDefined";
import {
  ExpressionContext,
  type ExpressionContextType,
} from "./ExpressionContext";
import { getCalc } from "./getCalc";

export function runExample(example: () => void) {
  const previousExpressions: Desmos.ExpressionState[] =
    (window as any).previousExpressions ?? [];
  const Calc = getCalc();
  const ctx: ExpressionContextType = { expressions: [] };
  ExpressionContext.provide(ctx, example);
  const newExpressions = ctx.expressions.map((e, i) => ({
    id: `__live-reload-${i}`,
    ...e,
  }));
  Calc.removeExpressions(
    previousExpressions.filter((e): e is { id: string } => isDefined(e.id))
  );
  Calc.setExpressions(newExpressions);
  (window as any).previousExpressions = newExpressions;
}
