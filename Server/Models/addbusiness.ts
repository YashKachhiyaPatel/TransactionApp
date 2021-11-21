import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const BusinessSchema = new Schema
({
    bname: String,
    baddress: String,
    bdescription: String,
    bowner : {
        type: Schema.Types.ObjectId,
      ref: 'User'
    },
    btotalrating: Number,
    bnumberofratings: Number
},
{
    collection: "addbusiness"
});

const Model = mongoose.model("addbusiness", BusinessSchema);
export default Model;