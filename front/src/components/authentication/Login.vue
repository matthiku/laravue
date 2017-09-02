<template>
	<div class="row justify-content-md-center">
	  <div class="form-signin">
	    <h2 class="form-signin-heading">Please sign in</h2>
	    <label for="inputEmail" class="sr-only">Email address</label>
	    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
	    <label for="inputPassword" class="sr-only">Password</label>
	    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
	    <div class="checkbox">
	      <label>
	        <input type="checkbox" value="remember-me"> Remember me
	      </label>
	    </div>
	    <button @click="login" class="btn btn-lg btn-primary btn-block">Login</button>
	  </div>
	</div>
</template>


<script>
	export default {
		data () {
			return {
				email: '',
				password: '',
			}
		},
		methods: {
			login () {
				var data = {
					client_id: 2,
					client_secret: 'wUgCsgjqc1dZcDkTD0LHOHRwSAEF34RK2ohe7adK',
					grant_type: 'password',
					username: this.email,
					password: this.password,
				};
				this.$http.post("oauth/token", data)
					.then(response => {
						this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now());
						// forward to the feed page
						this.$router.push('/feed');
					}, response => {
						console.log(response);
					});
			}
		},
	}
</script>
