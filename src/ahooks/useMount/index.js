
import React from 'react';
function useMount(fn) {
  React.useEffect(() => {
    fn();
  }, []);

}
export default useMount;