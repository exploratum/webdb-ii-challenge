const db = require('./dbConfig')

function find() {
    return db('bears');
}

function findById(id) {
    return db('bears')
    .where({id})
    .first();
}

function insert(zoo) {
    return db('bears').insert(zoo);
}

function update(id, changes) {
    return db('bears')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('bears')
    .where({id})
    .del();
}


module.exports = {
    find,
    findById,
    insert,
    update,
    remove
};