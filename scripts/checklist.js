//IIFE declaration
(function (window){
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector){
    if(!selector) {
      throw new Error('No selector provided!');
    }

    this.$element = $(selector);
    if(this.$element.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function Row(coffeeOrder){
    //Create div tag and its attributes
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class:' : 'checkbox'
    });

    //Create Label for the order
    var $label = $('<label></label>');

    //Create the checkbox for the order
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    //Assign and format the information for the order
    var description = '[' + coffeeOrder.strength + 'x]';
    description += " " + coffeeOrder.size + " ";

    //Check if there is a flavor selected
    if(coffeeOrder.flavor){
      //add the flavor to the description
      description += coffeeOrder.flavor + " ";

      //change the background color to match the flavor shot
      var backgroundColor = "";
      if(coffeeOrder.flavor === "caramel"){
        backgroundColor = '#F5F5DC';
      }
      else if(coffeeOrder.flavor === "almond"){
        backgroundColor = '#DEB887';
      }
      else if(coffeeOrder.flavor === "mocha"){
        backgroundColor = '#D2691E';
      }
    }
    if (backgroundColor) {
      $label.css('background', backgroundColor);
    }
    description += coffeeOrder.coffee + " ";
    description += "order is " + coffeeOrder.togo;
    description += ' (' + coffeeOrder.emailAddress + ')';

    //Append all the elements together into one DOM object, working from smallest element to biggest
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  CheckList.prototype.addRow = function (coffeeOrder) {
    //Remove any existing rows that match the email email address
    this.removeRow(coffeeOrder.emailAddress);

    //Create a new instance of a row, using the coffee order information
    var rowElement = new Row(coffeeOrder);

    //Add the new row instance's $element property to the CheckList
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value= "' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  //Listener for click to remove an order
  CheckList.prototype.addClickHandler = function(fn) {
    //'input' is passed as a filtering; it only runs when the event is triggered by an input element
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;
      fn(email)
        .then(function () {
          this.removeRow(email);
      }.bind(this));
    }.bind(this));
  };




  App.CheckList = CheckList;
  window.App = App;
})(window);
