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
              ></v-radio>
            </v-radio-group>
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
      let url = "http://127.0.0.1:8000/";
      
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
      let url = "http://127.0.0.1:8000/";
      let sendBody = {};
      let sendMethod = 'GET';
      if(this.topic != "Any") {
        url += "question-list";
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
