"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSendReminderPage = exports.DisplaySendReminderPage = exports.ProcessAddCustomer = exports.DisplayTransactionHistoryPage = exports.ProcessCustomerDeletePage = exports.ProcessCustomerAddPage = exports.DisplayCustomerAddPage = exports.ProcessCustomerEditPage = exports.DisplayaddcustomerEditPage = exports.DisplayaddcustomerListPage = void 0;
const addcustomer_1 = __importDefault(require("../Models/addcustomer"));
const addbusiness_1 = __importDefault(require("../Models/addbusiness"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Util_1 = require("../Util");
function DisplayaddcustomerListPage(req, res, next) {
    addcustomer_1.default.aggregate([
        { '$sort': { 'custname': 1 } },
        { '$lookup': {
                'from': 'addbusiness',
                'localField': 'businessname',
                'foreignField': '_id',
                'as': 'business'
            }
        }
    ]).exec(function (err, result) {
        if (err) {
            return res.redirect('/error');
        }
        res.render('owner/addcustomer', { title: 'Add Contact', page: 'addcustomer', addcustomer: result, displayName: Util_1.UserDisplayName(req), isowner: Util_1.UserRole(req) });
    });
}
exports.DisplayaddcustomerListPage = DisplayaddcustomerListPage;
function DisplayaddcustomerEditPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        const businessCollection = yield addbusiness_1.default.find({});
        addcustomer_1.default.findById(id, {}, {}, (err, addcustomerItemToEdit) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                return res.redirect('/error');
            }
            console.log(addcustomer_1.default);
            res.render('owner/update', { title: 'Edit', page: 'update', addbusiness: businessCollection, addcustomer: addcustomerItemToEdit, displayName: Util_1.UserDisplayName(req) });
        }));
    });
}
exports.DisplayaddcustomerEditPage = DisplayaddcustomerEditPage;
function ProcessCustomerEditPage(req, res, next) {
    let id = req.params.id;
    let updatedaddcustomerItem = new addcustomer_1.default({
        "_id": id,
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": req.body.custamount,
        "businessname": req.body.businessname
    });
    addcustomer_1.default.updateOne({ _id: id }, updatedaddcustomerItem, {}, (err) => {
        if (err) {
            console.error(err);
            return res.redirect('/error');
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessCustomerEditPage = ProcessCustomerEditPage;
function DisplayCustomerAddPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessCollection = yield addbusiness_1.default.find({});
            res.render('owner/update', {
                title: 'Add',
                page: 'update',
                addcustomer: '',
                addbusiness: businessCollection,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (_a) {
            res.redirect('owner/addcustomer');
        }
    });
}
exports.DisplayCustomerAddPage = DisplayCustomerAddPage;
function ProcessCustomerAddPage(req, res, next) {
    let newCustomer = new addcustomer_1.default({
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": req.body.custamount,
        "businessname": req.body.businessname
    });
    addcustomer_1.default.create(newCustomer, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessCustomerAddPage = ProcessCustomerAddPage;
function ProcessCustomerDeletePage(req, res, next) {
    let id = req.params.id;
    addcustomer_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            return res.redirect('/error');
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessCustomerDeletePage = ProcessCustomerDeletePage;
function DisplayTransactionHistoryPage(req, res, next) {
    addcustomer_1.default.find({}, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
        if (err) {
            return res.redirect('/error');
        }
        res.render('owner/transactionhistory', { title: 'Transaction History', page: 'transactionhistory', addcustomer: addcustomerCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayTransactionHistoryPage = DisplayTransactionHistoryPage;
function ProcessAddCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const businessCollection = yield addbusiness_1.default.find({});
        res.render('owner', { title: 'DashBoard', page: 'index', displayName: Util_1.UserDisplayName(req), addbusiness: businessCollection, isowner: Util_1.UserRole(req) });
    });
}
exports.ProcessAddCustomer = ProcessAddCustomer;
function DisplaySendReminderPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        addcustomer_1.default.findById(id, {}, {}, (err, addcustomerItemToEdit) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                res.end(err);
            }
            console.log(addcustomer_1.default);
            res.render('owner/reminder', { title: 'Send Reminder', page: 'reminder', addcustomer: addcustomerItemToEdit, displayName: Util_1.UserDisplayName(req) });
        }));
    });
}
exports.DisplaySendReminderPage = DisplaySendReminderPage;
function ProcessSendReminderPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = ` 
      
      <h3>Your Payment Details:</h3>
      <ul>
      <li><b>Name:</b> ${req.body.custname}</li>
      <li><b>Email:</b> ${req.body.custemail}</li>
      <li><b>Amount:$</b> ${req.body.custamount}</li>
      </ul>
    `;
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'transactionappg3s4@gmail.com',
                pass: 'transaction@123',
            }
        });
        let mailOptions = {
            from: 'transactionappg3s4@gmail.com',
            to: req.body.custemail,
            subject: "URGENT (Pay Your Bill)",
            text: "Hello World",
            html: output
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                console.log('success....' + data.response);
                alert('email sent..');
            }
        });
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessSendReminderPage = ProcessSendReminderPage;
//# sourceMappingURL=addcustomer.js.map