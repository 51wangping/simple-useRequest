
import React from 'react'

function useLatest(value) {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
}
export default useLatest;