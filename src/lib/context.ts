export function createContext<T>(opts: { name: string; defaultValue?: T }) {
  const stack = [opts?.defaultValue];

  function provide<R>(value: T, body: () => R): R {
    stack.push(value);
    try {
      return body();
    } finally {
      stack.pop();
    }
  }

  function use() {
    const value = stack.at(-1);
    if (!Object.hasOwn(opts, "defaultValue") && value === undefined) {
      throw new Error(
        `No provided value found for ${opts.name}. Remember to wrap with '.provide'`
      );
    }
    return value as T;
  }

  return {
    stack,
    provide,
    use,
  };
}
