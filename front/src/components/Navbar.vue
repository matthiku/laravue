<template>
  <div class="header clearfix">

    <nav>
      <ul class="nav nav-pills float-right">

        <li v-if="! isAuth" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>

        <li v-if="! isAuth" class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>

        <li v-if="isAuth" class="nav-item">
          <router-link class="nav-link" to="/feed">Shop</router-link>
        </li>

        <li v-if="isAuth" class="nav-item">
          <a class="nav-link" @click="logout" href="#">Logout</a>
        </li>
      </ul>
    </nav>

    <h3 class="text-muted">Laravel&amp;Vue - TestProject</h3>

  </div>
</template>


<script>
	export default {

    data () {
      return {
        isAuth: false,
      }
    },

    methods: {
      logout () {
        this.$auth.destroyToken();
        this.$router.push('/login');
      },
      setAuthenticatedUser () {
        this.$http.get('api/user')
          .then(response => {
            this.$auth.setAuthenticatedUser(response.body);
            console.log(this.$auth.getAuthenticatedUser());
          });
      },
    },

    created () {
      this.isAuth = this.$auth.isAuthenticated();

      this.setAuthenticatedUser();
    },
  }
</script>
