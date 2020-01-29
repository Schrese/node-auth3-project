const db = require('../data/dbConfig.js');

module.exports = {
    add
}

function add(user) {
    return db('user').insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function findById(id) {
    return db('user').select('id', 'username', 'department').where({ id });
}