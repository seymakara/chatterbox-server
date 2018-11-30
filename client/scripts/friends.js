var Friends = {


  friendsList: [],

  toggleStatus: function (username) {
    if (this.allUsers[username] === true) {
      this.allUsers[username] = false;


    } else if (this.allUsers[username] === false) {
      this.allUsers[username] = true;
      this.friendsList.push(username);
    } else {
      return 'user not found.';
    }

    console.log(this.allUsers);

  },

  allUsers: {
    //will be populated with list of user keys with true:false keys
  }

};

