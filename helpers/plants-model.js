const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  findPlantsByUser,
  add,
  update,
  remove
}

function find() {
  return db('plants');
}

function findBy(filter) {
  return db('plants')
    .where(filter);
}

function findById(id) {
  return db('plants')
    .where({ id })
    .first();
}

function findPlantsByUser(userId) {
  return db('users')
    .join('plants', 'users.id', 'plants.user_id')
    .select('plants.id', 'plants.nickname', 'plants.species', 'plants.water_schedule', 'plants.frequency', 'plants.last_watered', 'plants.image_url')
    .where('users.id', userId);
}

function add(plant) {
  return db('plants')
    .insert(plant, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function update(id, changes) {
  return db('plants')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("plants")
      .where("id", id)
      .del();
}