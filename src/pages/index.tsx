import { Link } from 'umi';

import { Space, Divider } from 'antd';

export default function IndexPage() {
  return (
    <div>
      <Space split={<Divider type="vertical" />}>
        <Link to="/accessToken" target="_blank">
          Access Token凭证获取
        </Link>
        <Link to="/upload" target="_blank">
          上传示例页
        </Link>
        <Link to="/fileList" target="_blank">
          文件列表页
        </Link>
        <Link to="/viewToken" target="_blank">
          viewToken浏览模型
        </Link>
      </Space>
    </div>
  );
}
