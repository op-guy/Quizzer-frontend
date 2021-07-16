<template>
  <div id="app">
    <v-app>
      <v-app-bar dark app>
        <v-toolbar-title>
          <h1 style="font-family: Times New Roman, Georgia, Garamond">
            Quizzer.com
          </h1>
        </v-toolbar-title>
      </v-app-bar>

      <v-main id="nav">
        <v-container fluid>
          <router-link to="/get-questions"> Get Questions</router-link> |
          <router-link to="/post-question">Post a Question</router-link>
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer>
        <v-col class="text-center" cols="12">
          {{ new Date().toLocaleString() }} — <strong>Quizzer</strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
