## 手动实现 ahooks 中 useRequest 

已完成部分：
1. 实现自动请求和手动请求
2. 实现请求取消
3. 同步刷新
4. 异步刷新
5. loading 状态
6. 生命周期函数
7. 插件机制

### 功能分析
1. 使用 useRequestImplement 实现具体逻辑
2. 使用 useLatest 存储 service 函数
3. 使用 useUpdate 刷新页面
4. 使用 useCreation 保证 fetchInstance 实例单一
5. 使用 Fetch类 实现具体请求逻辑和插件应用
6. 使用 useMount 实现自动请求
7. 使用 useUnmount 实现组件卸载时候自动取消请求
8. 使用 useMemoizedFn 对函数进行持久化存储