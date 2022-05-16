import React, { useCallback } from 'react';

function useUpdate() {
  const [, setState] = React.useState({});
  return useCallback(() => setState({}), []);
}
export default useUpdate; 