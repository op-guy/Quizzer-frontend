<template>
  <div id="get-questions">
    <v-select
      label="Topic"
      :items="topics"
      v-model="topic"
      @change="questionPick"
    ></v-select>
    <ol>
      <div class="question-list" v-for="entry in questions" :key="entry.id">
        <li>
          <v-card shaped>
            <p class="questions">{{ entry.question }}</p>
            <br />
            <v-radio-group v-model="choice">
              <v-radio
                v-for="opt in answerList(entry.answers)"
                :key="opt.id"
                :label="opt"
                :value="opt"
              ></v-radio>
            </v-radio-group>
          </v-card>
        </li>
      </div>
    </ol>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      questions: [],
      choice: null,
      topic: null,
    };
  },
  methods: {
    answerList: (val) => val.split(";").slice(0, -1),
    questionPick: () => {
      fetch("http://127.0.0.1:8000/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          for (var i = 0; i < data.length; i++) this.questions.push(data[i]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    topics: function () {
      if (this.questions.length == 0) return ["Any"];
      else return this.questions.map((question) => question.topic);
    },
  },
};
</script>

<style scoped>
.question-list {
  margin-top: 100px;
}

.questions {
  text-align: left;
  margin-left: 10px;
  font-size: 20px;
}
</style>
