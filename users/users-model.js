const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findById,
    findBy,
    find
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

function findBy(filter) {
    return db('user').where(filter).first();
}

function find() {
    return db('user').select('id', 'username', 'department');
}