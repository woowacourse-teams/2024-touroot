import { useEffect } from 'react';

const usePressESC = <T extends (...args: unknown[]) => void>(condition: boolean, callback: T) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') callback();
    };

    if (condition) document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [condition, callback]);
};

export default usePressESC;
