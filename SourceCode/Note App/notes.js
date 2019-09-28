const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCustomers = () => {
  try {                          //if file won't exist
    var customersString = fs.readFileSync('notes-data.json')
    return JSON.parse(customersString);
  } catch(e){
    return [];
  }
};

var saveCustomers = (customers) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(customers));
};


// ------------------End of Reusable functions ---------------------


//  to add a new customer

var addCustomer = (custId,custEmail,custName) => {
    var customers = fetchCustomers();
    var customer = {custId,custEmail,custName}

    var duplicateCustomers =  customers.filter((customer) =>{
        return customer.custId === custId;
    });
    if (duplicateCustomers.length === 0){
      customers.push(customer);
      saveCustomers(customers);
      return customer;
    }

  };


//to list all the customers

var getAllCustomers = () => {
    return fetchCustomers();
};


// to read a customer

var getCustomer = (custId) => {
    
    var customers = fetchCustomers();

    var getCustomers =  customers.filter((customer) => {  // to check if customer exists and return customer
      return customer.custId === custId;
    });

    return getCustomers[0]

};


// to delete a customer

var remove = (custId) => {

    var customers = fetchCustomers(); // reusable func

    var filteredCustomers =  customers.filter((customer) => { // will return all other customers other than "customer to be removed"
      return customer.custId !== custId;
    });

    saveCustomers(filteredCustomers); //save new customers array

    return customers.length !== filteredCustomers.length
    
};

// function just to print out customers to screen for reusability

var logCustomer = (customer) => {
  console.log('--');
  console.log(`Customer Id: ${customer.custId}`);
  console.log(`Customer Name: ${customer.custName}`);
    console.log(`Customer Email: ${customer.custEmail}`);
};

var updateCustomer = (custId,custEmail,custName) => {
    var customers = fetchCustomers();
    var customer = {custId,custEmail,custName};
    var getCustomer =  customers.filter((customer) => { // to check if customer exists
        return customer.custId === custId;
    });
        if(getCustomer.length === 1)
        {
           remove(custId);
           var newCustomers = fetchCustomers();
            newCustomers.push(customer);
            saveCustomers(newCustomers);
            return customer
        }
}

// add new function names here to be accessible from other modules

module.exports = {
  addCustomer, getAllCustomers, remove, getCustomer, logCustomer,updateCustomer
};
