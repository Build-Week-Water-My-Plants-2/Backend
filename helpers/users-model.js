 const users = require('../data/schema/UserSchema');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
}

function find() {
  return users.where()
}

function findBy(filter) {
  return users.where(filter)
}

function findById(id) {
  return users.findById(id)
}

function add(user) {
  return users.insertMany(user)
}

function update(id, changes) {
  return users.findByIdAndUpdate(id,changes)
}

function remove(id) {
  return users.findByIdAndDelete(id)
} 