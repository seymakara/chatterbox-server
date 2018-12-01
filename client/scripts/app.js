var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function () {
    App.username = window.location.search.substr(10);

    FormView.initialize();

    setTimeout(MessagesView.initialize, 400);
    setTimeout(RoomsView.initialize, 400);

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    // $('#chats').find('a').on('click', function () {
    //   console.log('ughhhh')
    //   alert('it works!')
    // })
  },

  fetch: function (callback = () => { }) {
    Parse.readAll(data => {
      // examine the response from the server request:
      // console.log(data['results'][0]);
      Messages.storage = data['results'];
      console.log(Messages.storage);
      callback();
    });
  },

  startSpinner: function () {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function () {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

};