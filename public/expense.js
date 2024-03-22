// Get references to the necessary DOM elements
const productNameInput = document.getElementById('product_name')
const productPriceInput = document.getElementById('product_price')
const numberOfproduct = document.getElementById('numberofproduct')
const totalMoneyInput = document.getElementById('total_budget')
const addProductButton = document.getElementById('add_product')
const productTableBody = document.querySelector('#product_table tbody')
const totalValue = document.getElementById('total_expenses')
const remainingValue = document.getElementById('remaining_value')
const totalMoney = document.getElementById('total')
// Initialize some variables
let products = []
let total = 0
let remaining = 0
let selectedProductIndex = -1
// Define the function to add a new product
function addProduct() {
  // Get the product name and price from the input fields
  const name = productNameInput.value.trim()
  const price = parseFloat(productPriceInput.value)
  const number = parseInt(numberOfproduct.value)
  // Validate the input fields
  if (name === '' || isNaN(price)) {
    alert('Please enter a valid product name and price.')
    return
  }
  // Add the new product to the products array
  products.push({
    name: name,
    TotalProductNum: number,
    price: price,
  })
  // Calculate the new total and remaining values
  total = products.reduce(
    (acc, currentValue) =>
      acc + currentValue.price * currentValue.TotalProductNum,
    0
  )
  remaining = totalMoneyInput.value - total
  totalMoney.textContent = totalMoneyInput.value
  // Update the table and total/remaining values
  updateTable()
  updateTotal()
  updateRemaining()
  // Clear the input fields
  productNameInput.value = ''
  productPriceInput.value = ''
  numberOfproduct.value = ''
}
// Define the function to update the table
function updateTable() {
  // Clear the existing table rows
  productTableBody.innerHTML = ''
  // Loop through the products array and add a new row for each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const row = document.createElement('tr')
    const nameCell = document.createElement('td')
    const priceCell = document.createElement('td')
    const actionsCell = document.createElement('td')
    nameCell.textContent =
      product.name +
      ' ' +
      '(' +
      product.TotalProductNum +
      'x' +
      product.price +
      ')'
    priceCell.textContent = product.price.toFixed(2) * product.TotalProductNum
    const editButton = document.createElement('button')
    editButton.innerHTML = '<i class="uil uil-pen"></i>'
    editButton.addEventListener('click', () => {
      // Set the selected product index and update the form inputs
      selectedProductIndex = i
      productNameInput.value = product.name
      productPriceInput.value = product.price.toFixed(2)
      numberOfproduct.value = product.TotalProductNum
      addProductButton.textContent = 'Save'
    })
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="uil uil-trash-alt"></i>'
    deleteButton.addEventListener('click', () => {
      // Remove the selected product from the products array and update the table
      products.splice(i, 1)
      total = products.reduce(
        (acc, currentValue) =>
          acc + currentValue.price * currentValue.TotalProductNum,
        0
      )
      remaining = totalMoneyInput.value - total
      updateTable()
      updateTotal()
      updateRemaining()
      productNameInput.value = ''
      productPriceInput.value = ''
      addProductButton.textContent = 'Add Product'
    })
    actionsCell.appendChild(editButton)
    actionsCell.appendChild(deleteButton)
    row.appendChild(nameCell)
    row.appendChild(priceCell)
    row.appendChild(actionsCell)
    productTableBody.appendChild(row)
  }
}
// Define the function to update the total value
function updateTotal() {
  totalValue.textContent = total.toFixed(2)
}
// Define the function to update the remaining value
function updateRemaining() {
  remainingValue.textContent = remaining.toFixed(2)
}
// Add an event listener to the Add Product button
addProductButton.addEventListener('click', () => {
  if (addProductButton.textContent === 'Add Product') {
    addProduct()
  } else if (addProductButton.textContent === 'Save') {
    // Update the selected product and reset the form inputs
    const selectedProduct = products[selectedProductIndex]
    selectedProduct.name = productNameInput.value.trim()
    selectedProduct.price = parseFloat(productPriceInput.value)
    selectedProduct.TotalProductNum = parseInt(numberOfproduct.value)
    console.log(selectedProduct)
    // Calculate the new total and remaining values
    total = products.reduce(
      (acc, currentValue) =>
        acc + currentValue.price * currentValue.TotalProductNum,
      0
    )
    remaining = totalMoneyInput.value - total
    // Update the table and total/remaining values
    updateTable()
    updateTotal()
    updateRemaining()
    // Reset the form inputs and selected product index
    productNameInput.value = ''
    productPriceInput.value = ''
    numberOfproduct.value = ''
    addProductButton.textContent = 'Add Product'
    selectedProductIndex = -1
  }
})