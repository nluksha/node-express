const redis = require('redis');
const db = redis.createClient();
const ENTRY_TABLE = 'entries';

class Entry {
  static getRange(from, to, cb) {
    db.lrange(ENTRY_TABLE, from, to, (err, items) => {
      if (err) {
        return cb(err);
      }

      let entries = [];
      items.forEach(item => {
        entries.push(JSON.parse(item));
      });
      
      cb(null, entries);
    });
  }

  constructor(obj) {
    for( let key in obj) {
      this[key] = obj[key];
    }
  }

  save(cb) {
    const entryJson = JSON.stringify(this);

    db.lpush(ENTRY_TABLE, entryJson, err => {
      if (err) {
        return cb(err);
      }

      cb();
    });
  }
}

module.exports = Entry;
