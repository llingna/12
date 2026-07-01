<template>
  <div>
    <div class="flex" style="justify-content: space-between; margin-bottom: 12px;">
      <h2 style="font-weight: 600; font-size: 1.8rem;">最新文章</h2>
      <router-link to="/create" class="btn">+ 新建</router-link>
    </div>

    <div v-if="loading" class="text-center" style="padding: 40px 0; color: #64748b;">加载中...</div>
    <div v-else-if="posts.length === 0" class="text-center" style="padding: 40px 0; color: #64748b;">
      还没有文章，<router-link to="/create">写第一篇</router-link>
    </div>

    <div class="post-list" v-else>
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h3>{{ post.title }}</h3>
        <div class="post-meta">
          <span>📅 {{ formatDate(post.createdAt) }}</span>
          <span>·</span>
          <span>✏️ {{ post.author || '匿名' }}</span>
        </div>
        <p class="post-excerpt">{{ post.excerpt || post.content?.slice(0, 120) + '...' }}</p>
        <div class="post-actions">
          <router-link :to="'/post/' + post.id" class="btn btn-outline" style="padding: 6px 18px;">阅读全文</router-link>
          <router-link :to="'/edit/' + post.id" class="btn btn-outline" style="padding: 6px 18px;">编辑</router-link>
          <button @click="deletePost(post.id)" class="btn btn-danger" style="padding: 6px 18px;">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPosts, savePosts } from '../utils/storage'; // 稍后创建工具函数

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.loading = true;
      setTimeout(() => {
        this.posts = getPosts().sort((a, b) => b.createdAt - a.createdAt);
        this.loading = false;
      }, 100);
    },
    deletePost(id) {
      if (!confirm('确定删除这篇文章吗？')) return;
      let posts = getPosts();
      posts = posts.filter(p => p.id !== id);
      savePosts(posts);
      this.posts = posts.sort((a, b) => b.createdAt - a.createdAt);
    },
    formatDate(timestamp) {
      if (!timestamp) return '未知日期';
      const d = new Date(timestamp);
      return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
    },
  },
};
</script>