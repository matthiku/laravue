import swal from 'sweetalert';
import VeeValidate from 'vee-validate';

import Vue from 'vue';
import App from './App.vue';
import Router from './routes.js';
import VueResource from 'vue-resource';
import Auth from './packages/auth/auth.js';

Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(Auth);

Vue.http.options.root = 'http://laravue.dev/back/public';
// provide the auth token in all API requests for the laravel backend
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();

// intercept http request errors
Vue.http.interceptors.push((request, next) => {
	next(response => {
		if (response.status == 404) {
			swal(response.status.toString(), response.body.error, 'error');
		}
		else if (response.status == 500) {
			console.log(response);
			swal(response.status.toString(), 'Problems with the backend. Please report.', 'error');
		}
	});
});

// move authenticated users to a 'productive' page
Router.beforeEach(
	(to, from, next) => {
		if (to.matched.some(record => record.meta.forVisitors)) {
			if (Vue.auth.isAuthenticated()) {
				next({
					path: '/feed',
				})
			} 
			else next();
		}
		else if (to.matched.some(record => record.meta.forAuth)) {
			if (! Vue.auth.isAuthenticated()) {
				next({
					path: '/login',
				})
			} else next();
		}
	}
);

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
});
