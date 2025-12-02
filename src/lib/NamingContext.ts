import { createContext } from "./context";

export type NamingContextType = { counts: Map<string | undefined, number> };
export const NamingContext = createContext<NamingContextType>({
  name: "NamingContext",
  defaultValue: { counts: new Map() },
});

export function nextSymbolIdentifier(letter = 'X') {
  const ctx = NamingContext.use();
  const namespaceCount = ctx.counts.get(letter);
  if (namespaceCount === undefined) {
    ctx.counts.set(letter, 1);
    return `${letter}_0`;
  }
  ctx.counts.set(letter, namespaceCount + 1);
  return `${letter}_${namespaceCount}`;
}
