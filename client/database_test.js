'use strict';

const bookshelf = require('../server/psqldb.js');

const User = bookshelf.Model.extend({
  tableName: 'users'
});

const Users = new bookshelf.Collection();

Users.model = User;



new User({ username: 'Gina' }).fetch().then(found => {
    if (found) {
   		console.log(found);
    }
    else {
    	console.log("NOT FOUND! ADDED!");
		let testUser = new User({
			username: 'Gina',
			fullname: 'Gina Z',
			email: 'gina@gmail.com'
		});

		testUser.save().then(function(newUser) {
			Users.add(newUser);
		});
    }
});


exports.module = {};