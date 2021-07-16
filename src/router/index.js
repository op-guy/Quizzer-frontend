import Vue from "vue";
import VueRouter from "vue-router";
import GetQuestions from "../views/GetQuestions.vue";
import PostQuestion from "../views/PostQuestion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/get-questions",
    name: "get-questions",
    component: GetQuestions,
  },
  {
    path: "/post-question",
    name: "post-questions",
    component: PostQuestion,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
