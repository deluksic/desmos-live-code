export function op(fnName: string, ...args: string[]) {
  return `\\operatorname{${fnName}}(${args.join(",")})`;
}
