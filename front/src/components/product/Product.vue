<template>
	<div class="col-sm-6" v-if="(filtered && authenticatedUser.id==product.user_id) || !filtered">
	  <div class="card mb-2">
	    <div class="card-body">

	      <h4 class="card-title">{{ product.name }} <small> ({{ product.user_id }})</small><big class="float-right"><strong>{{ showPrice(product.price) }}</strong></big></h4>

		  	<!-- <a href="#" class="btn btn-sm btn-primary float-right">More...</a> -->
	      <p class="card-text small">{{ product.description.substr(0,155) }}...
		  		<a v-if="authenticatedUser.id==product.user_id" 
		  			 @click="$emit('delete-product', product.id)"
		  			 href="#" class="btn btn-sm btn-danger float-right">Delete</a>
		  		<router-link 
		  			 v-if="authenticatedUser.id==product.user_id"
		  			 :to="'/products/'+product.id+'/edit'" tag="button" 
		  			 class="btn btn-sm btn-info float-right mr-1">Edit</router-link>
	      </p>

	      <!-- <img class="card-img-bottom" src="./sample.png" alt="Card image cap"> -->


	    </div>
	  </div>
  </div>
</template>


<script>
	export default {

		props: ['product', 'authenticatedUser', 'filtered'],

		methods: {
			showPrice (val) {
				return '€ ' + parseFloat(val).toFixed(2);
			},
		},

	}
</script>
