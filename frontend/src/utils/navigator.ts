export const setHash = ({ start, end }: { start: string, end: string }) => {
  const hash = `#L${start}-${end}`;
  if (window.location.hash === hash) {
    return;
  }
  if (history.pushState) {
    history.replaceState(null, '', hash);
  }
  window.location.hash = hash;
};

// parse hash. what will be this format: '#L1-34'
export const parseLineHighlightHash = () => {
  const { hash } = window.location;
  const [start, end] = hash.replace('#L', '').split('-');
  const lineStart = parseInt(start, 10);
  const lineEnd = parseInt(end, 10);
  if (isNaN(lineStart) || isNaN(lineEnd)) {
    return null;
  }
  return {
    start: lineStart,
    end: lineEnd,
  };
};