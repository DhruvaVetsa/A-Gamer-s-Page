let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gaming_project_dv');

let schema = mongoose.Schema(
  {
    user_name_d : {
      type : "String",
      required : true
    },
    game_name_d : {
      type : "String",
      required : true
    },
    review_d : {
      type : "String",
      required : true
    }

  }
)
module.exports = mongoose.model('tasks', schema);