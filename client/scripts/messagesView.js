var MessagesView = {
  $chats: $('#chats'),

  initialize: function () {
    Messages.storage.forEach(function (post) {
      MessagesView.renderMessage(post);
      $('.username').on("click", 'a', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var user = this.id;
        console.log(user);
        Friends.toggleStatus(user);
      });
    });

  },

  renderMessage: function (allChats) {
    // debugger;
    var message = Messages.sanitizeMsg(allChats);
    var username = Messages.sanitizeUsr(allChats);
    var date = allChats.createdAt;
    var post = message + username + date;

    Friends.allUsers[username] = false;

    this.$chats.append(`<div class='chat'><div class='username'><a id=${username} ><div>${username}</div></a></div><div class='message'><p>${message}</p></div><div class='created-at'><p>${date}</p></div></div>`);
  }
};