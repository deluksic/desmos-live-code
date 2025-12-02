export type ExpressionOpts = Partial<
  Omit<Desmos.ExpressionState & { type: "expression" }, "type" | "id">
>;

export function op(fnName: string, ...args: string[]) {
  return `\\operatorname{${fnName}}\\left(${args.join(",")}\\right)`;
}

export function point(
  identifier: string,
  definitionLatex: string,
  opts?: ExpressionOpts
): Desmos.ExpressionState {
  return {
    type: "expression",
    id: `point-${identifier}`,
    label: identifier,
    latex: `${identifier}=${definitionLatex}`,
    showLabel: true,
    ...opts,
  };
}

export function vector(
  identifier: string,
  a: string,
  b: string,
  opts?: ExpressionOpts
): Desmos.ExpressionState {
  const definitionLatex = op("vector", a, b);
  return {
    type: "expression",
    id: `vector-${identifier}`,
    latex: identifier ? `${identifier}=${definitionLatex}` : definitionLatex,
    hidden: true,
    ...opts,
  };
}

type SliderBounds = (Desmos.ExpressionState & {
  type: "expression";
})["sliderBounds"];

export function slider(
  identifier: string,
  definitionLatex: number | string,
  sliderBounds?: Partial<SliderBounds>,
  opts?: ExpressionOpts
): Desmos.ExpressionState {
  return {
    type: "expression",
    id: `slider-${identifier}`,
    latex: `${identifier}=${definitionLatex}`,
    // @ts-expect-error
    sliderBounds,
    ...opts,
  };
}

export function abs(value: string) {
  return `\\left|${value}\\right|`;
}

export function div(a: string | number, b: string | number) {
  return `\\frac{${a}}{${b}}`;
}

export function expr(
  identifierOrDefinition: string,
  latexDefinition?: string,
  opts?: ExpressionOpts
): Desmos.ExpressionState {
  return {
    type: "expression",
    id: `expr-${identifierOrDefinition}`,
    latex: latexDefinition
      ? `${identifierOrDefinition}=${latexDefinition}`
      : identifierOrDefinition,
    hidden: true,
    ...opts,
  };
}

export function neg(value: string | number) {
  return `-${value}`;
}
