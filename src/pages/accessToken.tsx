import { useEffect, useState } from 'react';

import { Button, Input, Table } from 'antd';

import { tokenApi } from '@/services/fileApi';

export default function Page() {
  const [appkey, setAppkey] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const getAccessToken = () => {
    let Authorization = 'Basic' + ' ' + window.btoa(appkey + ':' + appSecret);

    debugger;

    tokenApi(Authorization).then((res) => {
      setAccessToken(res.value);
    });
  };

  return (
    <div>
      <Input
        placeholder="AppKey"
        style={{ width: 300 }}
        value={appkey}
        onChange={(e) => setAppkey(e.target.value)}
      />
      <Input
        placeholder="AppSecret"
        style={{ width: 300 }}
        value={appSecret}
        onChange={(e) => setAppSecret(e.target.value)}
      />

      <Button type="primary" onClick={() => getAccessToken()}>
        生成凭证
      </Button>

      <div>
        AccessToken: <p>{accessToken}</p>
      </div>
    </div>
  );
}
