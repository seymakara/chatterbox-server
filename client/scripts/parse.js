var $ = require('jquery');
var _ = require('underscore');

var Parse = {
  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function (message, successCB, errorCB = null) {
    $.ajax({
      // crossDomain: true,
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB ||
        function (error) {
          console.error('chatterbox: Failed to post message', error);
        }
    });
    //console.log('sent to server', message);
  },

  readAll: function (successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error:
        errorCB ||
        function (error) {
          console.error('chatterbox: Failed to fetch messages', error);
        }
    });
  }
};
