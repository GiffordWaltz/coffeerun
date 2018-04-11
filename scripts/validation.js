(function (window) {
  'use strict';
  var App = window.App || {};
  var Validation = {
    isCompanyEmail: function(email){
      //reference page 248
      //Created a literal regular expression by putting apattern between the forward slashes //.
      //  Inside the slashes, I specififed a string that consists of one or more characters (.+)
      // followed by @bignerdranch.com. I used the backslash to indicate that the period in bignerdranch.com should be
      // treated as a literal period. Normally a period in a regular expression is a wildcard that matches any character
      // The "$" at the end of the regular expression means that @bignerdranch should be at the end of the string and no more characters appear after it
      return /.+@bignerdranch\.com$/.test(email);
    }

    // isValidStrength: function(order, strength){
    //   if(order.toLowerCase().includes("decaf")){
    //     return (strength > 20);
    //   }
    // }
  };


  App.Validation = Validation;
  window.App = App;
})(window);
