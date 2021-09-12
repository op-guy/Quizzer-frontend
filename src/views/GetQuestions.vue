<template>
  <div id="get-questions">
    <v-select
      label="Topic"
      :items="topic_list"
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
                @click="assignVals(opt, entry.id)"
              ></v-radio>
            </v-radio-group>
            <template v-if="choice_id == entry.id">
              <template v-if="choice == entry.correct_answer">
                Correct
                <p style="color: green">&#10004;</p>
              </template>
              <template
                v-else-if="choice != null && choice != entry.correct_answer"
              >
                Wrong
                <p style="color: red">&#10008;</p>
                The correct answer is
                {{ entry.correct_answer }}</template
              >
            </template>
          </v-card>
        </li>
      </div>
    </ol>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      questions: [],
      choice: null,
      choice_id: null,
      topic: null,
      topic_list: ["Any"],
    };
  },
  created() {
    this.initialFetch();
  },
  methods: {
    answerList: (val) => val.split(";").slice(0, -1),
    initialFetch: function () {
      this.questions = [];
      let url = "http://127.0.0.1:8000/questions";
      
      fetch(url , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.questions = data;
        this.topic_list = this.questions.map((question) => question.topic)
        this.topic_list.splice(0, 0, "Any");
        return;
      })
      .catch((error) => {
        console.log(error);
          });
    },

    questionPick: function () {
      this.questions = [];
      let url = "http://127.0.0.1:8000/questions";
      let sendBody = {};
      let sendMethod = 'GET';
      if(this.topic != "Any") {
        url = "http://127.0.0.1:8000/questions-by-topic";
        sendBody["topic"] = this.topic;
        sendMethod = 'POST';
      }
      
      if(sendMethod == 'GET') {
          fetch(url , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.json())
          .then((data) => {
            this.questions = data;
            if(this.topic_list == null && this.questions != null)
              this.topic_list = this.questions.map((question) => question.topic)
            return;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else {
          fetch(url , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendBody),
          })
            .then((response) => response.json())
            .then((data) => {
              this.questions = data;
              return;
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    assignVals: function(answer, question_id) {
        console.log(answer)
        console.log(question_id)
        this.choice_id = question_id
        this.choice = answer
        return
    }
  },
  computed: {},
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
