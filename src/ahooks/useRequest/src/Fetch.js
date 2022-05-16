
//Fetch是普通的类，不是一个类组件 React.Component
class Fetch {
  constructor(serviceRef, options, subscribe, initialState = {}) {
    this.serviceRef = serviceRef;
    this.options = options;
    this.subscribe = subscribe;
    this.state = {
      loading: !options.manual, data: undefined, error: undefined,
      params: undefined, ...initialState
    };
    this.count = 0; // 定义一个类的实例属性计数器，默认值是0
  }
  setState(s = {}) {
    this.state = { ...this.state, ...s };
    this.subscribe();
  }
  async runAsync(...params) {
    this.count += 1;
    const currentCount = this.count;
    const { ...state } = this.runPluginHandler('onBefore', params);
    this.setState({ loading: true, params, ...state });//准备开始请求了
    this.options.onBefore?.(params);
    try {
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);
      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }
      const res = await servicePromise
      if (currentCount !== this.count) {
        return new Promise(() => { });
      }
      this.setState({ loading: false, data: res, error: undefined, params });
      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);
      this.options.onFinally?.(res, params);
      if (currentCount === this.count)
        this.runPluginHandler('onFinally', params, res, undefined);
    } catch (error) {
      if (currentCount !== this.count) {
        return new Promise(() => { });
      }
      this.setState({ loading: false, data: undefined, error, params });
      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);
      this.options.onFinally?.(error, params);
      if (currentCount === this.count)
        this.runPluginHandler('onFinally', params, undefined, error);
      throw error;
    }
  }
  run(...params) {
    this.runAsync(...params).catch(error => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }
  refresh() {
    this.run(this.state.params || []);
  }
  refreshAsync() {
    this.runAsync(this.state.params || []);
  }
  mutate(data) {
    this.runPluginHandler('onMutate', data);
    this.setState({
      data
    });
  }
  cancel() {
    this.count += 1;
    this.setState({ loading: false });
    this.options.onCancel?.();
    this.runPluginHandler('onCancel');
  }
  runPluginHandler(event, ...rest) {
    const r = this.pluginImpls.map(i => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }
}

export default Fetch;