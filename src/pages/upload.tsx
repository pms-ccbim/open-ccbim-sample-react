import { useEffect, useState } from 'react';

import { UploadFile } from '@/library/uploadFile';

import { Button, Progress, Table, Input } from 'antd';
const { TextArea } = Input;
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';

import { inputAcceptFormat } from '@/library/inputAcceptFormat';

import { addFileApi } from '@/services/fileApi';

const uploadFileObj = new UploadFile();

export default function Page() {
  const [filesLoading, setFilesLoading] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [accessToken, setAccessToken] = useState('');

  // 上传
  const uploadFile = (e: any) => {
    setFilesLoading(true);

    let accessTokenHeader = 'Bearer' + ' ' + accessToken;

    uploadFileObj
      .uploadFile(
        accessTokenHeader,
        e.target.files,
        uploadOnProgress,
        successCallBack,
      )
      .then(() => {
        console.log('success');
        setFilesLoading(false);
      })
      .catch(() => {
        console.log('error');
        setFilesLoading(false);
      });
  };

  // 上传进度
  const uploadOnProgress = (filesData: Array<object>) => {
    console.log(filesData);
    setFileList(filesData);
  };

  // 成功回调
  const successCallBack = (fileId: string) => {
    console.log(fileId);

    let accessTokenHeader = 'Bearer' + ' ' + accessToken;
    let data = {
      fileId: fileId,
    };

    // 添加文件节点
    addFileApi(accessTokenHeader, data).then(() => {});
  };

  // 删除当前上传文件
  const removeItem = (items: any) => {
    uploadFileObj.cancelUpload(items, (filesData: Array<object>) => {
      setFileList(filesData);
    });
  };

  // 重传当前上传文件
  const refreshItem = (items: any) => {
    uploadFileObj.resumeBreakpoint(items, uploadOnProgress, successCallBack);
  };

  const columns = [
    {
      title: '格式',
      dataIndex: 'format',
      key: 'format',
      render: (text: string) => {
        return <div className="formatBox">{text}</div>;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number, record: any) => {
        if (progress < 100) {
          if (record.failToUpload) {
            return (
              <div style={{ display: 'flex' }}>
                <Progress type="circle" percent={progress} width={30} />
                <div
                  className="uploadingIcon"
                  onClick={() => refreshItem(record)}
                >
                  <RedoOutlined />
                </div>
              </div>
            );
          } else {
            return (
              <div style={{ display: 'flex' }}>
                <Progress type="circle" percent={progress} width={30} />
                <div
                  className="uploadingIcon"
                  onClick={() => removeItem(record)}
                >
                  <DeleteOutlined />
                </div>
              </div>
            );
          }
        } else {
          return <Progress type="circle" percent={progress} width={30} />;
        }
      },
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

      <Button type="primary" style={{ padding: 0 }}>
        <input
          id="upload_file"
          style={{ display: 'none' }}
          type="file"
          multiple
          accept={inputAcceptFormat}
          onChange={uploadFile}
        />
        <label
          htmlFor="upload_file"
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          上传文件
        </label>
      </Button>

      <Table
        dataSource={fileList}
        showHeader={false}
        columns={columns}
        rowKey="md5"
        loading={filesLoading}
        pagination={false}
      />
    </div>
  );
}
