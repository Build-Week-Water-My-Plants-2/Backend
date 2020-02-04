const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ID = mongoose.Types.ObjectId
const PlantSchema = new Schema({
  user_id:{
    type: ID,
    default: ID
  },
  nickname: {
    type: String,
    max: 128,
    required: true
  },
  species: {
    type: String,
    max: 128,
    required: true
  },
  last_watered: {
    type: Date,
    default: Date.now()
  },
  water_schedule: {
    type: Date
  },
  img_url: String,
  frequency:Number
});

module.exports = plant = mongoose.model("flower", PlantSchema);
