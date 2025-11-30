export function getCalc(): Desmos.Calculator {
  const calc = (window as any).Calc as Desmos.Calculator | undefined;
  if (!calc) throw new Error("Desmos Calc not found on window");
  return calc;
}