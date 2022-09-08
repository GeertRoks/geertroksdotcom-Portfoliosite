import Vue from "vue";

// Source Warren Wong: https://warrenwong.org/posts/adding-a-date-format-filter-in-nuxt/
Vue.filter("formatDate", (dateStr) =>
  Intl.DateTimeFormat("us-EN", {month: 'short', year: 'numeric'}).format(new Date(dateStr))
);
