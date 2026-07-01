// src/api/posts.js

// 开发环境使用 Vite 代理（/api），生产环境使用 Railway 真实地址
const API_BASE = import.meta.env.DEV 
  ? '/api/posts' 
  : 'https://你的railway域名.railway.app/posts';

// 获取所有文章
export async function fetchPosts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('获取列表失败');
  return await res.json();
}

// 获取单篇文章
export async function fetchPostById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('获取详情失败');
  return await res.json();
}

// 创建文章
export async function createPost(post) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('创建失败');
  return await res.json();
}

// 更新文章
export async function updatePost(id, post) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('更新失败');
  return await res.json();
}

// 删除文章
export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('删除失败');
  return await res.json();
}