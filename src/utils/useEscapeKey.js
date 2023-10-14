import { useCallback, useEffect } from 'react'

export default function useEscapeKey(handleClose) {
  const handleEscKey = useCallback(
    event => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey, false);

    return () => {
      document.removeEventListener('keyup', handleEscKey, false);
    };
  }, [handleEscKey]);
}
