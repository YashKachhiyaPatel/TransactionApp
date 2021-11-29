import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const TransactionSchema = new Schema
({
    customer: String,
    email: String,
    amount: String,
    status: String
},
{
    collection: "transactions"       
});

const Model = mongoose.model("transactions", TransactionSchema);
export default Model;