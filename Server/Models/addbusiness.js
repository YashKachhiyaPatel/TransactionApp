"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AddBussinessSchema = new Schema({
    bizname: String,
    bizaddress: String,
    bizdescription: String,
}, {
    collection: "addbusiness"
});
const Model = mongoose_1.default.model("addbusiness", AddBussinessSchema);
exports.default = Model;
//# sourceMappingURL=addbusiness.js.map