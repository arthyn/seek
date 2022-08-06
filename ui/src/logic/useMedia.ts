import { useCallback, useEffect, useState } from 'react';

export default function useMedia(mediaQuery: string) {
  const [match, setMatch] = useState(false);

  const update = useCallback((e: MediaQueryListEvent) => {
    setMatch(e.matches);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(mediaQuery);

    query.addEventListener('change', update);
    update({ matches: query.matches } as MediaQueryListEvent);
    return () => {
      query.removeEventListener('change', update);
    };
  }, [update, mediaQuery]);

  return match;
}

export function useIsMobile() {
  return useMedia('(max-width: 639px)');
}
