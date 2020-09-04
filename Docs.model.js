let mongoose = require('mongoose');
let Schema=mongoose.Schema;


module.exports=mongoose.model('Docs',Schema({     //let us to use this model outside 
  _id:Schema.Types.ObjectId,
  title:String,
  Description:String,
  user:{
    required:true,
    type:Schema.Types.ObjectId,
    ref:"User"
    }
}));