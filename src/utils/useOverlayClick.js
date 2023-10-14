import { useCallback, useEffect } from 'react'
import { config } from '../utils/constants'

export default function useOutsideClick(handleClose) {
  const handleClick = useCallback(
    event => {
      if (event.target.classList.contains(config.modalOpenedClass)) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
}
