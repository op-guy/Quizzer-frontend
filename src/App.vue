<template>
  <v-app>
    <v-app-bar dark app>
      <v-toolbar-title>
        <h6 class="site-title">Quizzer.com</h6>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        
      </v-container>
    </v-main>
    <v-footer>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Quizzer</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    result: "",
    responseAvailable: false,
  }),

  methods: {
    fetchQuestions() {
      this.responseAvailable = false;

      fetch("http://127.0.0.1:8000/", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          (this.responseAvailable = true), (this.result = JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.site-title {
  font-family: "Apple Chancery", cursive;
  font-size: 3rem;
}
</style>
