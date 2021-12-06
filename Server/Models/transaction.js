"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TransactionSchema = new Schema({
    customer: String,
    email: String,
    amount: String,
    status: String
}, {
    collection: "transactions"
});
const Model = mongoose_1.default.model("transactions", TransactionSchema);
exports.default = Model;
//# sourceMappingURL=transaction.js.map