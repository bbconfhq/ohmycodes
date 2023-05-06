export const sleep = (wait: number) => {
  return new Promise((fulfil) => setTimeout(fulfil, wait));
};
