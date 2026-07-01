<template>
  <div class="post-detail" v-if="post">
    <h2>{{ post.title }}</h2>
    <div class="post-meta">
      <span>📅 {{ formatDate(post.createdAt) }}</span>
      <span>·</span>
      <span>✏️ {{ post.author || '匿名' }}</span>
    </div>
    <div class="content">{{ post.content }}</div>
    <div style="margin-top: 32px; display: flex; gap: 14px;">
      <router-link to="/" class="btn btn-outline">← 返回列表</router-link>
      <router-link :to="'/edit/' + post.id" class="btn">编辑文章</router-link>
    </div>
  </div>
  <div v-else class="text-center" style="padding: 40px 0; color: #64748b;">文章不存在或加载中…</div>
</template>

<script>
import { getPosts } from '../utils/storage';

export default {
  name: 'Detail',
  data() {
    return { post: null };
  },
  mounted() {
    this.loadPost();
  },
  watch: {
    '$route.params.id'() {
      this.loadPost();
    },
  },
  methods: {
    loadPost() {
      const id = this.$route.params.id;
      const posts = getPosts();
      this.post = posts.find(p => p.id === id) || null;
    },
    formatDate(timestamp) {
      if (!timestamp) return '未知日期';
      const d = new Date(timestamp);
      return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
    },
  },
};
</script>