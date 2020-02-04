const plants = require("../data/schema/PlantSchema");
const users = require("../data/schema/UserSchema");
module.exports = {
  find,
  findBy,
  findById,
  findPlantsByUser,
  add,
  update,
  remove
};

function find() {
  return plants
    .where()
    .select("id nickname species water_schedule last_watered");
}

function findBy(plant) {
  return plants.where(plant);
}

function findById(id) {
  return plants.findById(id);
}

async function findPlantsByUser(userId) {
  const result = await users
    .aggregate()
    .lookup({
      from: "flowers",
      localField: "_id",
      foreignField: "user_id",
      as: "plants"
    })
    return result.find(user => user._id == userId)
}

function add(plant) {
  return plants.insertMany(plant)
}

function update(id, changes) {
  return plants.findByIdAndUpdate(id,changes)
}

function remove(id) {
  return plants.findByIdAndDelete(id)
}
