<template>
  <div class="container">
    <nav class="nav-bar">
      <span class="nav-brand">✍️ 我的博客</span>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/create">写文章</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* 可以将部分全局样式移到这里，但建议保留在全局 style.css 中 */
</style>