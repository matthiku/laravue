<?php

namespace App\Http\Controllers;

use Auth;
use App\Product;
use Illuminate\Http\Request;


class ProductsController extends Controller
{

    // list all products
    public function index() {
    	return Product::orderBy('created_at', 'desc')->get();
    }


    // get one product
    public function show($id) {

        $product = Product::find($id);
        if (count($product) > 0)
            return response()->json($product);

        return response()->json(['error' => 'resource not found'], 404);
    }

    // update a product
    public function update(Request $request, $id) {

        $product = Product::find($id);
        if ($product->count()==0)
            return response()->json(['not found', 404]);

        try {
            $product->update($request->all());
            return response()->json($product, 202);
        }
        catch ( \Exception $e) {
            return response()->json(['error' => 'unable to update the item'], 500);
        }
    }



    // store a new product in the DB
    public function store(Request $request) {

    	try {
    		$product = Product::create($request->all() + ['user_id' => Auth::id()]);
    		return $product;
    	}
    	catch ( \Exception $e) {
    		return response()->json(['error' => 'unable to create the item'], 500);
    	}
    }



    // delete a single item
    public function destroy($id) {

    	try {
	    	Product::destroy($id);
    		return response()->json(['destroyed!'], 204);
    	}
    	catch ( \Exception $e) {
    		return response()->json(['error' => 'unable to delete the item'], 500);
    	}
    }

}
