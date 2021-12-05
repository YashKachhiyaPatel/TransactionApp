"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTransaction = exports.DisplayTransaction = exports.CreateNewTransaction = exports.NewTransaction = void 0;
const transaction_1 = __importDefault(require("../Models/transaction"));
const Util_1 = require("../Util");
function NewTransaction(req, res, next) {
    res.render('owner/edittransaction', { title: 'Add Transaction',
        transaction: [],
        displayName: Util_1.UserDisplayName(req)
    });
}
exports.NewTransaction = NewTransaction;
function CreateNewTransaction(req, res, next) {
    let newTransaction = new transaction_1.default({
        "customer": req.body.customer,
        "email": req.body.email,
        "amount": req.body.amount,
        "status": req.body.status
    });
    transaction_1.default.create(newTransaction, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/transactionhistory');
    });
}
exports.CreateNewTransaction = CreateNewTransaction;
function DisplayTransaction(req, res, next) {
    let id = req.params.id;
    transaction_1.default.findById(id, {}, {}, function (err, transaction) {
        if (err) {
            return console.error(err);
        }
        res.render('owner/edittransaction', { title: 'Edit Transaction',
            transaction: transaction,
            displayName: Util_1.UserDisplayName(req)
        });
    });
}
exports.DisplayTransaction = DisplayTransaction;
function EditTransaction(req, res, next) {
    let id = req.params.id;
    let updatedTransaction = new transaction_1.default({
        "_id": id,
        "customer": req.body.customer,
        "email": req.body.email,
        "amount": req.body.amount,
        "status": req.body.status
    });
    transaction_1.default.updateOne({ _id: id }, updatedTransaction, {}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/owner/transactionhistory');
        }
    });
}
exports.EditTransaction = EditTransaction;
//# sourceMappingURL=edittransaction.js.map