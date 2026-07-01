const STORAGE_KEY = 'vue3_blog_posts';

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  // 初始化示例数据
  const initial = [
    {
      id: '1',
      title: 'Vue3 个人博客搭建',
      author: '大三求职者',
      content: '本篇博客记录了我使用 Vue3 + 组合式 API 构建个人博客的过程。前后端分离，前端采用 Vue Router 管理路由，数据持久化使用 localStorage 模拟后端存储。\n\n主要功能：列表展示、详情、创建、编辑、删除。',
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: '2',
      title: '面试准备 · 前端工程化',
      author: '求职小刘',
      content: '最近在准备大厂面试，整理了关于前端工程化、构建工具、代码规范、性能优化等方面的笔记。\n\n个人博客不仅是一个项目，也是自我表达和知识沉淀的空间。',
      createdAt: Date.now() - 86400000 * 5,
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

export function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}