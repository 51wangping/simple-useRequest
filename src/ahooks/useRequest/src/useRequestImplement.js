
import useLatest from '../../useLatest';
import useUpdate from '../../useUpdate';
import useCreation from '../../useCreation';
import useMount from '../../useMount';
import useMemoizedFn from '../../useMemoizedFn';
import Fetch from './Fetch';
import useUnmount from '../../useUnmount';
function useRequestImplement(service, options, plugins) {
  const { manual, ...rest } = options;
  const fetchOptions = { manual, ...rest };
  const serviceRef = useLatest(service);//发送请求的方法
  const update = useUpdate();//更新组件的方法
  const fetchInstance = useCreation(() => {
    const initStates = plugins.map(p => p?.onInit?.(fetchOptions)).filter(Boolean);
    //把每个插件返回的初始状态进行累加成一个最终的初始状态
    return new Fetch(serviceRef, fetchOptions, update, Object.assign({}, ...initStates));
  }, [])
  fetchInstance.options = fetchOptions;
  fetchInstance.pluginImpls = plugins.map(p => p(fetchInstance, fetchOptions));
  useMount(() => {
    if (!manual) {
      const params = fetchInstance.state.params || options.defaultParams || []
      fetchInstance.run(...params);
    }
  });
  useUnmount(() => fetchInstance.cancel())
  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance))
  }
}
export default useRequestImplement;