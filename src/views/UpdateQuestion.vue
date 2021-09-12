<template>
  <div id="update-question">
    <div>
      <v-select
        label="What do you want to do?"
        :items="actions"
        v-model="chosen"
      ></v-select>
      <div>
        <v-form ref="form" @submit.prevent="sendformData">
          <v-text-field
            v-model="question_id"
            label="Question number"
            required
            :disabled="chosen == null"
          ></v-text-field>
          <v-card flat>
            <v-text-field
              v-model="form.question"
              label="Question"
              required
              :disabled="chosen != 'Update'"
            ></v-text-field>
            <v-text-field
              v-model="form.answers"
              label="Possible responses"
              required
              :disabled="chosen != 'Update'"
            ></v-text-field>
            <v-text-field
              v-model="form.correct_answer"
              label="Correct Response"
              required
              :disabled="chosen != 'Update'"
            ></v-text-field>
            <v-text-field
              v-model="form.topic"
              label="Topic"
              required
              :disabled="chosen != 'Update'"
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
    </div>
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
      actions: ["Update", "Delete"],
      chosen: null,
      question_id: null,
    };
  },
  methods: {
    sendformData: function () {
      let the_method = this.chosen == "Update" ? "PUT" : "DELETE";
      fetch("http://127.0.0.1:8000/questions/" + this.question_id, {
        method: the_method,
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
        this.chosen == "Delete" ||
        (this.form.question &&
          this.form.answers &&
          this.form.correct_answer &&
          this.form.topic)
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
