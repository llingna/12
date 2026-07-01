<template>
  <div>
    <h2 style="font-weight: 600; font-size: 1.8rem; margin-bottom: 24px;">
      {{ isEdit ? '编辑文章' : '写新文章' }}
    </h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">标题</label>
        <input id="title" v-model="form.title" placeholder="输入文章标题..." required />
      </div>
      <div class="form-group">
        <label for="author">作者</label>
        <input id="author" v-model="form.author" placeholder="你的名字 (可选)" />
      </div>
      <div class="form-group">
        <label for="content">正文</label>
        <textarea id="content" v-model="form.content" placeholder="写点什么…" required></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn">{{ isEdit ? '更新' : '发布' }}</button>
        <router-link to="/" class="btn btn-outline">取消</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { getPosts, savePosts, generateId } from '../utils/storage';

export default {
  name: 'Form',
  data() {
    return {
      form: { title: '', author: '', content: '' },
      isEdit: false,
      editId: null,
    };
  },
  mounted() {
    this.initForm();
  },
  watch: {
    '$route'() {
      this.initForm();
    },
  },
  methods: {
    initForm() {
      const id = this.$route.params.id;
      if (id) {
        this.isEdit = true;
        this.editId = id;
        const posts = getPosts();
        const post = posts.find(p => p.id === id);
        if (post) {
          this.form = { title: post.title || '', author: post.author || '', content: post.content || '' };
        }
      } else {
        this.isEdit = false;
        this.editId = null;
        this.form = { title: '', author: '', content: '' };
      }
    },
    handleSubmit() {
      const { title, author, content } = this.form;
      if (!title.trim() || !content.trim()) {
        alert('标题和内容不能为空');
        return;
      }
      let posts = getPosts();
      if (this.isEdit && this.editId) {
        const index = posts.findIndex(p => p.id === this.editId);
        if (index !== -1) {
          posts[index] = {
            ...posts[index],
            title: title.trim(),
            author: author.trim() || '匿名',
            content: content.trim(),
          };
          savePosts(posts);
          this.$router.push(`/post/${this.editId}`);
        }
      } else {
        const newPost = {
          id: generateId(),
          title: title.trim(),
          author: author.trim() || '匿名',
          content: content.trim(),
          createdAt: Date.now(),
        };
        posts.unshift(newPost);
        savePosts(posts);
        this.$router.push(`/post/${newPost.id}`);
      }
    },
  },
};
</script>