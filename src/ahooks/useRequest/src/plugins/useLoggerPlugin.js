

function useLoggerPlugin(fetchInstance, { name }) {
  return {
    onBefore(params) {
      console.log(name, 'onBefore', params);
      return { id: name }
    },
    onRequest(service, params) {
      console.log(name, 'onRequest');
      //return undefined;换太子，可以把promise 换掉
      //return { servicePromise: Promise.resolve('新的返回值') }
      return {};
    },
    onSuccess() {
      console.log(name, 'onSuccess');
    },
    onError() {
      console.log(name, 'onError');
    },
    onFinally() {
      console.log(name, 'onFinally');
    },
    onCancel() {
      console.log(name, 'onCancel');
    },
    onMutate() {
      console.log(name, 'onMutate');
    },
    /*  onInit() {
       console.log(name, 'onInit');
     }, */
  }
}
//onInit是用来初始化Fetch的初始状态的，在这个时候还没有fetchInstance
useLoggerPlugin.onInit = ({ name , ...rest}) => {
  console.log(name, 'onInit');
  return { name,...rest };
}
export default useLoggerPlugin;