import { useEffect, useState } from 'react';

import { Button, Input, Table } from 'antd';
const { TextArea } = Input;

import { viewTokenGetApi } from '@/services/fileApi';

import {
  CcbimSDKLoader,
  CcbimSDKLoaderConfig,
  // @ts-ignore
} from '../../public/ccbimSDK@2.0.0/ccbimSdkLoader.umd.js';

export default function Page() {
  const [fileId, setFileId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [viewToken, setViewToken] = useState('');

  const getViewToken = () => {
    let accessTokenHeader = 'Bearer' + ' ' + accessToken;

    let data = {
      fileId: fileId,
    };
    viewTokenGetApi(accessTokenHeader, data).then((res) => {
      setViewToken(res.result.viewToken);
    });
  };

  const runModel = () => {
    let modelApp = null;

    let loaderConfig = new CcbimSDKLoaderConfig();
    loaderConfig.staticHost = ''; // 默认不配置资源文件地址(在根目录)，实际可根据需要配置成sdk包在项目中的具体路径
    let loader = new CcbimSDKLoader();

    loader.load(loaderConfig).then(() => {
      // @ts-ignore
      let modelAppConfig = new PMS.CCBIM.WebAppModelConfig();

      modelAppConfig.dom = document.getElementById('bimView');
      modelAppConfig.urlIp = 'http://open-test.ccbim.com';
      modelAppConfig.fileId = fileId;

      // @ts-ignore
      modelApp = new PMS.CCBIM.WebAppModel(modelAppConfig);
      modelApp.addView();
    });
  };

  return (
    <div>
      <TextArea
        rows={2}
        placeholder="请输入获取的Access Token"
        value={accessToken}
        onChange={(e: any) => setAccessToken(e.target.value)}
      />

      <Input
        placeholder="fileId"
        style={{ width: 300 }}
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />

      <Button type="primary" onClick={() => getViewToken()}>
        通过fileId获取viewToken
      </Button>

      <p>viewToken: {viewToken}</p>

      <Button type="primary" onClick={() => runModel()}>
        通过viewToken加载模型
      </Button>

      <div
        id="bimView"
        style={{ position: 'relative', width: 1400, height: 600 }}
      ></div>
    </div>
  );
}
