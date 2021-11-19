import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const AddBussinessSchema = new Schema
({
    bizname: String,
    bizaddress: String,
    bizdescription: String,
},
{
    collection: "addbusiness"       
});

const Model = mongoose.model("addbusiness", AddBussinessSchema);
export default Model;