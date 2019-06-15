const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient();

class User {
  static getByName(name, cb) {
    User.getId(name, (err, id) => {
      if (err) {
        return cb(err);
      }

      User.get(id, cb);
    });
  }

  static getId(name, cb) {
    db.get(`user:id:${name}`, cb);
  }

  static get(id, cb) {
    db.hgetall(`user:${id}`, (err, user) => {
      if (err) {
        return cb(err);
      }

      cb(null, new User(user));
    });
  }

  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if (err) {
        return cb(err);
      }

      if (!user.id) {
        return cb();
      }

      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) {
          return cb(err);
        }

        if (hash === user.pass) {
          return cb(null, user);
        }

        cb();
      });
    });
  }

  constructor(obj) {
    for( let key in obj) {
      this[key] = obj[key];
    }
  }

  save(cb) {
    if (this.id) {
      this.update(cb);
    } else {
     db.incr('user:ids', (err, id) => {
       if (err) {
         return cb(err);
       }

       this.id = id;
       this.hashPassword( err => {
         if (err) {
           return cb(err);
         }

         this.update(cb);
       });
     }); 
    }
  }

  hashPassword(cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        return cb(err);
      }

      this.salt = salt;
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) {
          return cb(err);
        }

        this.pass = hash;
        cb();
      });
    });
  }

  update(cb) {
    const id = this.id;

    db.set(`user:id:${this.name}`, id, err => {
      if (err) {
        return cb(err);
      }

      db.hmset(`user:${id}`, this, err => {
        cb(err);
      });
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name
    }
  }
}

/*
const user = new User({
  name: 'Test',
  pass: '1234567'
});

user.save(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('user id %d', user.id);
  }
});

User.getByName('Test', (err, user)=> {
  console.log(user);
});

User.authenticate('Test', '1234567', (err, user)=> {
  console.log(user);
});
*/

module.exports = User;
