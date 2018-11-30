var RoomsView = {
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function () {
    var allRooms = [];
    Messages.storage.forEach(function (post) {
      allRooms.push(Messages.sanitizeRoom(post));
    });
    var uniqRooms = _.uniq(allRooms);
    uniqRooms.forEach(function (roomname) {
      RoomsView.renderRoom(roomname);
    });
  },

  renderRoom: function (roomname) {
    // var sanitized = Messages.sanitizeRoom(post);

    $('#rooms select').append(
      `<option value='${roomname}'>${roomname}</option>`
    );
  },
};

RoomsView.$button.on('click', function () {
  Rooms.add();
});
