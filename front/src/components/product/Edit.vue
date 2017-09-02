<template>
	<div class="row">	
		<div class="col-md-8 col-md-offset-2">
			<div class="card" style="width: 20rem;">
			  <div class="card-body">
			    <h4 class="card-title">Edit a Product</h4>
			    <h6 class="card-subtitle mb-2 text-muted">Details:</h6>
					<form>
					  <div class="form-group">
					    <label class="form-control-label" for="formGroupName">Name</label>
					    <input v-model="product.name" v-on:keyup="enteringData" type="text" class="form-control" id="formGroupName" placeholder="product name">
					  </div>
					  <div class="form-group">
					    <label class="form-control-label" for="formGroupPrice">Price</label>
					    <input v-model="product.price" v-on:change="enteringData" type="number" class="form-control" id="formGroupPrice" value="0.00">
					  </div>
					  <div class="form-group">
					    <label class="form-control-label" for="formGroupDescription">Description</label>
					    <textarea v-model="product.description" v-on:keyup="enteringData" class="form-control" id="formGroupDescription" placeholder="description"></textarea>
					  </div>
					</form>
			    <a href="#" class="card-link">Card link</a>
			    <a href="#" @click="update" class="btn btn-success float-right" v-bind:class="{ disabled: ! filledOut }">Update</a>
			  </div>
			</div>
	  </div>
	</div>
</template>



<script>
	export default {

      created () {
        this.getProduct();
      },

	    data () {
	      return {
          product: {},
	      	filledOut: false,
	      }
	    },

	    methods: {
	    	enteringData () {
	    		if (this.product.name && parseInt(this.product.price) && this.product.description)
	    			this.filledOut = true;
	    		else
	    			this.filledOut = false;
	    	},
        getProduct () {
          this.$http.get('api/products/'+this.$route.params.product)
            .then(response => {
              this.product = response.body;
            });
        },
        update () {
          this.$http.put('api/products/' + this.$route.params.product, this.product)
            .then(response => {
              swal('Updated!', 'The product has been updated.', 'success');
              this.$router.push('/feed');
            });
	    	}
	    }
	}
</script>
