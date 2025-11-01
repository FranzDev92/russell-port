import mongoose from "mongoose";
const catwaySchema=new mongoose.Schema({
  catwayNumber:{type:Number,required:true,unique:true},
  catwayType:{type:String,enum:["long","short"],required:true},
  catwayState:{type:String,required:true}
},{timestamps:true});
export default mongoose.model("Catway",catwaySchema);
