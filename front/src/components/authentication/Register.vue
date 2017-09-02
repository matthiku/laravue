<template>
	<div class="row justify-content-md-center">
	  <form class="form-signin">
	    <h2 class="form-signin-heading">Enter Registration details here:</h2>
	    <label for="inputName" class="sr-only">Name</label>
	    <input v-model="name" type="text" id="inputName" class="form-control" placeholder="Your name" required autofocus>
	    <label for="inputEmail" class="sr-only">Email address</label>
	    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
	    <label for="inputPassword" class="sr-only">Password</label>
	    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
	    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
	  </form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				name: '',
				email: '',
				password: '',
			}
		},
	}
</script>

<style>
	
</style>