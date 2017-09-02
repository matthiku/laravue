<template>
	<div class="row">	
		<div class="col-md-8 col-md-offset-2">
			<div class="card" style="width: 20rem;">
			  <div class="card-body">

			    <h4 class="card-title">Create a new Product</h4>

					<form @submit.prevent="create">
					  <div class="form-group">
					    <label class="form-control-label" for="formGroupName">Name</label>
					    <input  v-model="product.name" 
                      v-validate="'required|min:5'"
                      type="text" class="form-control" name="name"
                      id="formGroupName" placeholder="product name">
              <div class="alert alert-danger" v-show="errors.has('name')">{{ errors.first('name') }}</div>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="formGroupPrice">Price</label>
              <input  v-model="product.price" 
                      v-validate="'required|min_value:0.01'"
                      type="number" class="form-control" 
                      id="formGroupPrice" value="0.00" name="price">
              <div class="alert alert-danger" v-show="errors.has('price')">{{ errors.first('price') }}</div>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="formGroupDescription">Description</label>
              <textarea v-model="product.description" 
                        v-validate="'required|min:5'"
                        class="form-control" id="formGroupDescription" 
                        placeholder="description" name="description"></textarea>
              <div class="alert alert-danger" v-show="errors.has('description')">{{ errors.first('description') }}</div>
					  </div>
			      <input type="submit" class="btn btn-success float-right" value="Create">
          </form>

			  </div>
			</div>
	  </div>
	</div>
</template>


<script>
	export default {

    data () {
      return {
      	product: {
      		name: '',
      		price: 0,
      		description: '',
      	},
      	filledOut: false,
      }
    },

    methods: {
    	create () {
        var vm = this;
        vm.$validator.validateAll().then( () => {        
          debugger;
          vm.$http.post('api/products', vm.product)
            .then(response => {
              console.log(response);
              swal('Success!', 'Product added: "'+vm.product.name+'"' , 'success');
              // vm.$router.push('/feed');
            });
        })
    	}
    }
	}
</script>
