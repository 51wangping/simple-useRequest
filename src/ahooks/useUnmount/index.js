

import useLatest from '../useLatest';
import React, { useEffect } from 'react';
function useUnmount(fn) {
  const fnRef = useLatest(fn);
  useEffect(() => {
    return () => {
      fnRef.current()
      //fn();
    }
  }, []);
}
export default useUnmount;