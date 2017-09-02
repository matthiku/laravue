<template>
	<div>
		<router-link to="/products/create" tag="button" class="btn btn-sm btn-success float-right ml-2">Add New Product</router-link>
		<button href="#" @click="filtered = ! filtered" class="btn btn-sm btn-default float-right">Show {{ filtered ? 'all' : 'my products' }}</button>

		<h1>Products</h1>

		<div class="row">
			<myProduct
				v-for="(product, index) in products"
			  v-bind:product="product"
			  v-bind:index="index"
			  v-bind:key="product.id"
			  @delete-product="deleteProduct(product)"
			  :authenticatedUser="authenticatedUser"
			  :filtered="filtered"
			></myProduct>
		</div>

	</div>
</template>



<script>
	import Product from './product.vue';

	export default {

		components: {
			myProduct: Product,
		},

		data () {
			return {
				products: [],
				authenticatedUser: this.$auth.getAuthenticatedUser(),
				filtered: false,
			}
		},

		created () {
			this.$http.get('api/products')
				.then(response => {
					this.products = response.body;
				})
        .catch( response => {
          console.log(response);
          swal(response.status.toString(), response.body.error, 'error');
  				this.$router.push('/feed');
        });
		},

		methods: {
			deleteProduct (product) {
				var vm = this;
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this product!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: false
				},
				function() {
					vm.$http.delete('api/products/'+product.id)
						.then(
							response => {
								console.log(response);
								var index = vm.products.indexOf(product);
								vm.products.splice(index, 1);
				  			swal("Deleted!", "Your product has been deleted.", "success")
			  			}
		  			);
				});
			}
		},
	}
</script>
