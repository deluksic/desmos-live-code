import { isDefined } from "../utils/isDefined";
import { getCalc } from "./getCalc";

export function runExample(example: Iterable<Desmos.ExpressionState>) {
  const previousExpressions: Desmos.ExpressionState[] =
    (window as any).previousExpressions ?? [];
  const Calc = getCalc();
  const newExpressions = [...example].map((e, i) => ({
    id: `__live-reload-${i}`,
    ...e,
  }));
  Calc.removeExpressions(
    previousExpressions.filter((e): e is { id: string } => isDefined(e.id))
  );
  Calc.setExpressions(newExpressions);
  (window as any).previousExpressions = newExpressions;
}
