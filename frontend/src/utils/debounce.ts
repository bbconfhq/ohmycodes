export function debounce(func: CallableFunction, wait: number): CallableFunction {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

