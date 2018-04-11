(function(winow) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url){
    if(!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    return $.post(this.serverUrl, val, function (serverResponse){
          console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    //see page 268 for callback Reference
    // Must pass a function argument and call that function inside $.get callback that way
    // I have access to both the function argument and the server response.
    return $.get(this.serverUrl, function (serverResponse) {
      if(cb){
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  RemoteDataStore.prototype.get = function(key, cb){
    return $.get(this.serverUrl + '/' + key, function(serverResponse) {
      if(cb){
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    return $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
