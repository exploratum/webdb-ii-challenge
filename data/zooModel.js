const db = require('./dbConfig')


function find() {
    return db('zoos');
}

function findById(id) {
    return db('zoos')
    .where({id})
    .first();
}

function insert(zoo) {
    return db('zoos').insert(zoo);
}

function update(id, changes) {
    return db('zoos')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('zoos')
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