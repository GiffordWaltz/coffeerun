//IIFE declaration
(function (window) {
  'use strict';
  //'Whoever gets there first start a new object, everyone else will use that
  //object' Singleton Pattern
  var App = window.App || {};

  //constructor
  function Truck(truckId, db){
    this.truckId = truckId;
    this.db = db;
  }

  //Create a unique Order
  Truck.prototype.createOrder = function(order){
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order);
  }

  //Deliver an order and remove it from the database
  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  }
  //Print the orders
  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll()
    .then(function (orders) {
      var customerIdArray = Object.keys(orders);

      console.log('Truck ' + this.truckId + ' has pending orders:');
      customerIdArray.forEach(function (id){
        console.log(orders[id]);
        if (printFn) {
          printFn(orders[id]);
        }
      }.bind(this));
    }.bind(this));
  };
  App.Truck = Truck;
  window.App = App;



})(window);
