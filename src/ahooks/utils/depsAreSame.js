

function depsAreSame(oldDeps, newDeps) {
  if (oldDeps === newDeps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], newDeps[i])) return false;
  }
  return true;
}
export default depsAreSame;