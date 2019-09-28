

const fs =  require('fs');
const yargs = require('yargs');

const customers = require('./notes.js');

// ------------ Start - all command configurations -----------------


const custIdOptions = {
    describe: 'Customer ID',
    demand : true,
    alias : 'i'
}

const custEmailOptions = {
    describe: 'Customer Email',
    demand : true,
    alias : 'e'
}

const custNameOptions = {
    describe: 'Customer Name',
    demand : true,
    alias : 'n'
}

const argv =  yargs

    .command('add','Adding a new customer',{
      custId: custIdOptions,
      custEmail: custEmailOptions,
        custName: custNameOptions
    })
    .command('list','List all the customers')
    .command('read','Read a customer details',{
        custId: custIdOptions
    })
    .command('update', 'Updates the customer details',{
        custId: custIdOptions,
        custEmail: custEmailOptions,
        custName: custNameOptions
    })
    .command('remove','Remove a customer',{
        custId: custIdOptions
    })
    .help()
    .argv;


// ------------ End - command configurations -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.custId, argv.custEmail, argv.custName);
    console.log(customer);
    if (customer){
      customers.logCustomer(customer);                                //adding a new customer
    } else{
      console.log("Customer already exists");
    }
}

else if (command === 'list') {
  var AllCustomers = customers.getAllCustomers();
  console.log(`Printing ${AllCustomers.length} customer(s).`);
  AllCustomers.forEach((customer)=>{                                //listing all customer(s)
    customers.logCustomer(customer);
  });
}

else if (command === 'read') {
   var customer = customers.getCustomer(argv.custId);
   if(customer){
    customers.logCustomer(customer);                                //reading a customer
          }
   else{
    console.log("Customer Details not found");
   }
}
else if (command === 'remove') {
    var customerRemoved = customers.remove(argv.custId);
    var message = customerRemoved ? 'Customer Details are removed' : 'Customer not found';
    console.log(message);
}
else if(command === 'update') {
    var customerToUpdate = customers.updateCustomer(argv.custId, argv.custEmail, argv.custName);
    var message = 'Customer Details updated successfully';
    console.log(message);
}

else{
  console.log('command customer recognized');
}
