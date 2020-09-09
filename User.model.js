let mongoose = require('mongoose');
let Schema=mongoose.Schema;


module.exports=mongoose.model('User',Schema({     //let us to use this model outside 
  _id:Schema.Types.ObjectId,
  name:
  {
    type:String,
    required:true,
    validate:
    {
      validator: function(text)
      {
        return text.length > 0;
      },
      message : "Empty(0) not allowed"
    }
  }
}));