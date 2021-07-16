<template>
  <div id="post-questions">
    <v-form ref="form" @submit.prevent="sendformData">
      <v-card flat>
        <v-text-field
          v-model="form.question"
          label="Question"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.answers"
          label="Possible responses"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.correct_answer"
          label="Correct Response"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.topic"
          label="Topic"
          required
        ></v-text-field>
        <v-btn
          color="primary"
          :disabled="!formisValid"
          elevation="2"
          type="submit"
          >SEND</v-btn
        >
      </v-card>
    </v-form>
  </div>
</template>

<script>
export default {
  data: function () {
    const defaultForm = Object.freeze({
      question: null,
      topic: null,
      answers: null,
      correct_answer: null,
    });
    return {
      form: Object.assign({}, defaultForm),
    };
  },
  methods: {
    sendformData: function () {
      console.log(JSON.stringify(this.form));
      fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      })
        .then((response) => {
          console.log(response.status);
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    formisValid: function () {
      return (
        this.form.question &&
        this.form.answers &&
        this.form.correct_answer &&
        this.form.topic
      );
    },
  },
};
</script>

<style scoped></style>
