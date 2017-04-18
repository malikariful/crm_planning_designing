'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    console.log(user);
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
