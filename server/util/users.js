
class Users {
    constructor() {
        this.users = []
    }
    addUser(id,name,room) {
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user)=>user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user)=>user.id === id)[0];
    }
    getListUser(room) {
        var users = this.users.filter((user) => user.room === room);
        var names = users.map((user) => user.name);
        return names;
    }
}

// var users = new Users()
// users.addUser(1,'bob','room1');
// users.addUser(2,'bill','room1');
// users.addUser(3,'sally','room1');
// users.addUser(4,'jen','room1');

// console.log(users.getListUser('room1'));
// console.log(users.users);

// console.log('removed:',users.removeUser(3).name);

// console.log(users.getListUser('room1'));
// console.log(users.users);

module.exports = {Users};