import React from 'react';
import depsAreSame from '../utils/depsAreSame';
function useCreation(factory, deps) {
  const { current } = React.useRef({
    deps,
    obj: undefined,
    initialized: false//是否初始化过
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
}
export default useCreation;