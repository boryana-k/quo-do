import { useCallback } from 'react';

export function useTruncate(maxLength = 30) {
  const truncate = useCallback((text) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;

    const sliced = text.slice(0, maxLength - 1);
    const lastSpace = sliced.lastIndexOf(' ');

    return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced) + '…';
  }, [maxLength]);

  return truncate;
}
