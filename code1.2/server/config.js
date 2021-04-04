//配置数据库和端口环境
const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://120.78.7.248:27017/SmallTool',
  port: process.env.PORT || 8000,
};

export default config;
