<template>
  <header>
    <img alt="logo" class="logo" src="@/assets/logo.svg" />
    <nav class="menu">
      <RouterLink to="/">Форма</RouterLink>
      <RouterLink to="preview">Превью</RouterLink>
    </nav>
  </header>
</template>
<style scoped>
header {
  line-height: 1.5;
  min-height: 20px;
  padding: 1rem 1.5rem;
  display: flex;
}

.logo {
  flex: 0 0 10%;
  max-width: 80px;
  margin-right: 12px;
}
.menu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  font-size: 1rem;
}
nav a {
  transition: color 0.3s ease 0s;
}
nav a.router-link-exact-active {
  color: var(--color-primary);
}

@media (any-hover: hover) {
  nav a:hover {
    color: var(--color-primary);
  }
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
@media (min-width: 756px) {
  header {
    min-height: 40px;
    padding: 1rem 2rem;
  }
  .logo {
    flex: 0 0 13%;
    max-width: 120px;
    margin-right: 12px;
  }
  .menu {
    font-size: 1.2rem;
  }
}
</style>
