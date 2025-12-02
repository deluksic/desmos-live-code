import { appendExpression } from "./ExpressionContext";
import { nextSymbolIdentifier } from "./NamingContext";

export type ExpressionOpts = Partial<
  Omit<Desmos.ExpressionState & { type: "expression" }, "type">
>;

export function op(fnName: string, ...args: string[]) {
  return `\\operatorname{${fnName}}\\left(${args.join(",")}\\right)`;
}

export function point(definitionLatex: string, opts?: ExpressionOpts) {
  const identifier = opts?.id ?? nextSymbolIdentifier("P");
  appendExpression({
    type: "expression",
    id: `point-${identifier}`,
    label: identifier,
    latex: `${identifier}=${definitionLatex}`,
    showLabel: true,
    ...opts,
  });
  return identifier;
}

export function vector(a: string, b: string, opts?: ExpressionOpts) {
  const identifier = opts?.id ?? nextSymbolIdentifier("v");
  const definitionLatex = op("vector", a, b);
  appendExpression({
    type: "expression",
    id: `vector-${identifier}`,
    latex: `${identifier}=${definitionLatex}`,
    ...opts,
  });
  return identifier;
}

type SliderBounds = (Desmos.ExpressionState & {
  type: "expression";
})["sliderBounds"];

export function slider(
  definitionLatex: number | string,
  sliderBounds?: Partial<SliderBounds>,
  opts?: ExpressionOpts
) {
  const identifier = opts?.id ?? nextSymbolIdentifier("s");
  appendExpression({
    type: "expression",
    id: `slider-${identifier}`,
    latex: `${identifier}=${definitionLatex}`,
    // @ts-expect-error
    sliderBounds,
    ...opts,
  });
  return identifier;
}

export function abs(value: string) {
  return `\\left|${value}\\right|`;
}

export function div(a: string | number, b: string | number) {
  return `\\frac{${a}}{${b}}`;
}

export function define(latexDefinition?: string, opts?: ExpressionOpts) {
  const identifier = opts?.id ?? nextSymbolIdentifier();
  appendExpression({
    type: "expression",
    id: `expr-${identifier}`,
    latex: `${identifier}=${latexDefinition}`,
    ...opts,
  });
  return identifier;
}

export function expr(latexDefinition: string, opts?: ExpressionOpts) {
  appendExpression({
    type: "expression",
    id: `expr-${latexDefinition}`,
    latex: latexDefinition,
    ...opts,
  });
}

export function neg(value: string | number) {
  return `-${value}`;
}
