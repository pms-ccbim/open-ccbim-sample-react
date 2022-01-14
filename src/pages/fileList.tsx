import { useEffect, useState } from 'react';

import { Button, Input, Table } from 'antd';
const { TextArea } = Input;

import { fileListApi } from '@/services/fileApi';

export default function Page() {
  const [fileListLoading, setFileListLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [fileListData, setFileListData] = useState<any>([]);

  const getFileList = () => {
    let accessTokenHeader = 'Bearer' + ' ' + accessToken;

    setFileListLoading(true);

    let data = {
      pageSize: 100000,
      currentPage: 1,
    };
    fileListApi(accessTokenHeader, data).then((fileList) => {
      setFileListData(fileList.result.list);
      setFileListLoading(false);
    });
  };

  const columns = [
    {
      title: '文件名称',
      dataIndex: 'fileName',
    },
    {
      title: 'fileId',
      dataIndex: 'fileId',
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
    },
    {
      title: '上传时间',
      dataIndex: 'gmtCreate',
    },
    {
      title: '开始转换时间',
      dataIndex: 'convertTime',
    },
    {
      title: '模型状态',
      dataIndex: 'convertStatus',
    },
  ];

  return (
    <div>
      <TextArea
        rows={2}
        placeholder="请输入获取的Access Token"
        value={accessToken}
        onChange={(e: any) => setAccessToken(e.target.value)}
      />

      <Button type="primary" onClick={() => getFileList()}>
        获取文件列表
      </Button>

      <Table
        columns={columns}
        dataSource={fileListData}
        loading={fileListLoading}
        pagination={false}
        rowKey="fileId"
      />
    </div>
  );
}
