var Rooms = {

  add: function () {
    var roomname = prompt('What is the name of the room you\'d like to add?');
    RoomsView.renderRoom(roomname);
    // renderRoom(prompt)
  }
};