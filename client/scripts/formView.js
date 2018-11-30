var FormView = {

  $form: $('form'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function (event) {
    // Stop the browser from submitting the form
    var text = document.getElementById('message').value;
    var roomname = $("#rooms option:selected").val();

    var submission = { "text": text, "username": App.username, "roomname": roomname };

    // console.log($("#rooms option:selected").val());
    event.preventDefault();
    Parse.create(submission);
  },

  setStatus: function (active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },



};
// var testPost = '{ "text": "The quick brown fox jumped over the lazy dog.", "username": "linden" }';