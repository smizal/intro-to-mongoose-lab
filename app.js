const prompt = require('prompt-sync')()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/Customer.js')

const username = prompt('What is your name? ')

const connect = async () => {
  await mongoose.connect(process.env.MONGO_DB)
  console.log('Connected to MongoDB')
  init()
}

const init = async () => {
  console.log(
    '------------------------\n------------------------\nWelcome ' +
      username +
      ' to the CRM,\n\nWhat would you like to do?\n\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit'
  )
  const userChoice = prompt('Number of action to run: ')
  console.log('------------------------\n')
  if (userChoice == 1) {
    await addNewCustomer()
  } else if (userChoice == 2) {
    await showCustomersList()
  } else if (userChoice == 3) {
    await UpdateCustomer()
  } else if (userChoice == 4) {
    await DeleteCustomer()
  } else if (userChoice == 5) {
    await mongoose.disconnect()
    console.log('exiting...')

    process.exit()
  }
}

const addNewCustomer = async () => {
  console.log('Add new Customer:')
  const customerName = prompt('What is the customer name? ')
  const customerAge = prompt('What is the customer age? ')
  const customer = await Customer.create({
    name: customerName,
    age: customerAge
  })
  console.log('New customer added successfully:', customer)
  await init()
}

const showCustomersList = async () => {
  console.log('Below is a list of customers:')
  const allCustomers = await Customer.find({})
  allCustomers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
  await init()
}

const UpdateCustomer = async () => {
  console.log('Below is a list of customers:')
  const allCustomers = await Customer.find({})
  // console.log(allCustomers)
  allCustomers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })

  const customerID = prompt(
    'Copy and paste the id of the customer you would like to update here: '
  )
  const customerName = prompt('What is the customers new name? ')
  const customerAge = prompt('What is the customers new age? ')

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerID,
    { name: customerName, age: customerAge },
    { new: true }
  )
  console.log('Customer updated successfully:', updatedCustomer)

  await init()
}

const DeleteCustomer = async () => {
  console.log('Below is a list of customers:')
  const allCustomers = await Customer.find({})
  // console.log(allCustomers)
  allCustomers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })

  const customerID = prompt(
    'Copy and paste the id of the customer you would like to delete here: '
  )

  const deletedCustomer = await Customer.findByIdAndDelete(customerID)
  console.log('Customer deleted successfully:', deletedCustomer)

  await init()
}

connect()
