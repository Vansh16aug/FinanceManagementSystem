const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Finance");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define the schema
const productSchema = new mongoose.Schema({
  totalBudget: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  numberOfProduct: {
    type: Number,
    required: true
  }
});


// // Function to save product data
// async function saveProduct(productData) {
//   try {
//     // Create a new product document
//     const product = new Product(productData);
//     // Save the product to the database
//     await product.save();
//     console.log('Product saved successfully:', product);
//   } catch (error) {
//     console.error('Error saving product:', error);
//   }
// }

const collection = new mongoose.model("users", Loginschema);
const product = new mongoose.model("product", productSchema);

module.exports = {
  collection,
  product
};