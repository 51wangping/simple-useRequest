
import useRequestImplement from './useRequestImplement';
import useLoggerPlugin from './plugins/useLoggerPlugin';
function useRequest(service, options, plugins = []) {
  return useRequestImplement(service, options,
    [...(plugins),
      useLoggerPlugin
    ]
  );
}
export default useRequest;