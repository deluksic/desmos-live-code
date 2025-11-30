export function op(fnName: string, ...args: string[]) {
  return `\\operatorname{${fnName}}(${args.join(",")})`;
}

export function point(
  identifier: string,
  definitionLatex: string,
  opts?: Partial<
    Omit<Desmos.ExpressionState & { type: "expression" }, "type" | "id">
  >
): Desmos.ExpressionState {
  return {
    type: "expression",
    id: `point-${identifier}`,
    label: identifier,
    latex: `${identifier} = ${definitionLatex}`,
    ...opts,
  };
}
