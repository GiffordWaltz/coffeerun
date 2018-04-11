(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if(!selector){
      throw new Error('No selector provided.');
    }

    this.$formElement = $(selector);
    if(this.$formElement.length === 0){
      throw new Error('Could not find element with selector ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event){
      event.preventDefault();

            //'This' refers to the form
              //-> Then the form element was wrapped and added a $ to get the jQuery object which gives methods
              // -> like serializeArray

              //Serialize array returns the form data as an array of objects, good for grabbing UI data
            //  Iteration 1:
            //          var data = $(this).serializeArray(); <-- grabs UI elements as an
            //                                                          Array of six objects.
            //  Iteration 2: Create a new data object
            //                Use built in forEach method of serializeArray to assign
            //                values to indices of data object.
            var data = {};
            $(this).serializeArray().forEach(function (item) {
              data[item.name] = item.value;
              console.log(item.name + ' is ' + item.value);
            });



      //Displays an Achievement Modal for getting the biggest and baddest drink
      if(data.size === "coffee-zilla" && data.strength >= 240 && data.flavor !== ''){
        $('#achievementModal').modal();
        var radioModals = window.document.querySelectorAll('.radioModal');

        //Make the power-up options visibile when the user enters something
        //  in the email input field

        $('#emailInputModal').one('keydown', function(){
            radioModals.forEach(function(item){
              item.style.display = "inline-block";
            });
          });
          data.emailAddressModal = data.emailAddress;

          //Listen for click and assign achievement variable to the radio button value
          $('.radioModal').on('click', function(){
            data.achievement = $('input[name=achievement]:checked').val();
          });
        };



      //Put the data into the truck object
      fn(data);
      //Reset the page to default
      window.document.getElementById('strengthLevel').style.backgroundColor = "#d3d3d3";
      this.reset();
      this.elements[0].focus();
    });
  };

  // Handler for slider event, see page 241 for event delegation
  FormHandler.prototype.addSliderHandler = function() {
    console.log("Setting slider handler");
    //Get value for slider
    $("#strengthLevel").on('change', function(event){
      event.preventDefault();

      // Grabs value from slider
      var sliderNumber = window.document.getElementById('strengthLevel').value;
      var myRed = 0;
      var myGreen= 0;
      var myBlue = 0;

      if(sliderNumber > 127){
        myRed = 255;
        myGreen = 200 - JSON.parse(sliderNumber);
        myBlue= 30;
      }
      else{
        myGreen = 255;
        myRed = 120 + JSON.parse(sliderNumber);
        myBlue = 100;
      }
      //console.log(myRed, myGreen, myBlue);

      //Grab the slider element and change it background color based on where the slider is
      window.document.getElementById('strengthLevel').style.backgroundColor = "rgb(" + myRed + "," + myGreen + "," +myBlue+")";
  });
};

  //Handle Email Validation event
  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name = "emailAddress"]', function(event){
      var emailAddress = event.target.value;
      var message = '';
      if(fn(emailAddress)){
        event.target.setCustomValidity('');
      }
      else{
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };


  //Handle Decaf validation
  //FormHandler.prototype.addDecafHandler

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
