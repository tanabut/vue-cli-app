import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SearchPlace from './views/SearchPlace.vue';
import SequenceNumber from './views/SequenceNumber.vue';
import LineMessaging from './views/LineMessaging.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/seqnum',
      name: 'seqnum',
      component: SequenceNumber,
    },
    {
      path: '/searchplace',
      name: 'searchplace',
      component: SearchPlace,
    },
    {
      path: '/linemessaging',
      name: 'linemessaging',
      component: LineMessaging,
    }
  ],
});
