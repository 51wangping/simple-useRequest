import React, { useRef } from 'react'
import { useRequest } from './ahooks';
function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('dylan');
    }, 1000);
  });
}
let updateSuccess = true;

function updateName(newName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (updateSuccess) {
        resolve(newName);
      } else {
        reject(new Error('更新失败'));
      }
      updateSuccess = !updateSuccess;
    }, 3000);
  });
}

function App() {
  const [value, setValue] = React.useState("");
  const lastRef = useRef();
  const { data: name, mutate } = useRequest(getName, { name: 'getName' });
  const { run, loading, error, cancel } = useRequest(updateName, {
    name: 'updateName',
    manual: true,
    onSuccess(result, params) {
      setValue('');
      console.log(`更新用户名成功 ${params[0]}`);
    },
    onError(error) {
      mutate(lastRef.current);
    },
    onCancel() {
      setValue('');
      mutate(lastRef.current);
    }
  });
  return (
    <>
      {name && <div>用户名:{name}</div>}
      <input value={value} onChange={event => setValue(event.target.value)} />
      <button
        onClick={() => {
          lastRef.current = name;//在更新前先备份老的值
          mutate(value);//直接先更新name
          run(value);//再调后台的更新方法更新
        }}
      >{loading ? '更新中...' : '更新'}</button>
      <button onClick={cancel}>取消</button>
    </>
  )
}

export default App;