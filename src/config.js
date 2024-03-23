const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

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
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numberOfProduct: {
    type: Number,
    required: true
  }
});


// Function to save product data
async function saveProduct(productData) {
  try {
    // Create a new product document
    const product = new Product(productData);
    // Save the product to the database
    await product.save();
    console.log('Product saved successfully:', product);
  } catch (error) {
    console.error('Error saving product:', error);
  }
}

// // Example usage
// const productData = {
//   productName: 'Example Product',
//   price: 10,
//   numberOfProduct: 5
// };

// saveProduct(productData);

// collection part
const collection = new mongoose.model("users", Loginschema);


module.exports = collection;