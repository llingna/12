import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ---------- 模拟数据库（内存数组） ----------
let posts = [
  // ... 数据内容不变
];

// ---------- RESTful API ----------
// ... 路由处理代码不变（全部保留）

app.listen(PORT, () => {
  console.log(`🚀 后端服务已启动: http://localhost:${PORT}`);
});