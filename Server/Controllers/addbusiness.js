"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayRateBusinessPage = exports.ProcessEditBusinessPage = exports.DisplayEditBusinessPage = exports.ProcessAddBusiness = exports.DisplayAddBusinessPage = exports.DisplayListOfBusinesses = exports.DisplayCustomerIndexPage = void 0;
const addbusiness_1 = __importDefault(require("../Models/addbusiness"));
const Util_1 = require("../Util");
function DisplayCustomerIndexPage(req, res, next) {
    res.render('customer', { title: 'Dashboard', page: 'index', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayCustomerIndexPage = DisplayCustomerIndexPage;
function DisplayListOfBusinesses(req, res, next) {
    addbusiness_1.default.find({}, null, { sort: { name: 1 } }, function (err, addBusinessCollection) {
        if (err) {
            return console.error(err);
        }
        res.render('customer/businesslist', { title: "Your List of Businesses", page: "businesslist", addbusiness: addBusinessCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayListOfBusinesses = DisplayListOfBusinesses;
function DisplayAddBusinessPage(req, res, next) {
    res.render('customer/addbusiness', { title: "Add Business", page: "addbusiness", addbusiness: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddBusinessPage = DisplayAddBusinessPage;
function ProcessAddBusiness(req, res, next) {
    let newBusiness = new addbusiness_1.default({
        "bizname": req.body.bizname,
        "bizaddress": req.body.bizaddress,
        "bizdescription": req.body.bizdescription
    });
    addbusiness_1.default.create(newBusiness, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/customer/addbusiness');
    });
}
exports.ProcessAddBusiness = ProcessAddBusiness;
function DisplayEditBusinessPage(req, res, next) {
    let id = req.params.id;
    addbusiness_1.default.findById(id, {}, {}, (err, addbusinessItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('customer/addbusiness', { title: 'Edit', page: 'addbusiness', addbusiness: addbusinessItemToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayEditBusinessPage = DisplayEditBusinessPage;
function ProcessEditBusinessPage(req, res, next) {
    let id = req.params.id;
    let updateAddBusinessItem = new addbusiness_1.default({
        "_id": id,
        "bizname": req.body.bizname,
        "bizaddress": req.body.bizaddress,
        "bizdescription": req.body.bizdescription
    });
    addbusiness_1.default.updateOne({ _id: id }, updateAddBusinessItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/customer/addbusiness');
    });
}
exports.ProcessEditBusinessPage = ProcessEditBusinessPage;
function DisplayRateBusinessPage(req, res, next) {
    res.render('customer/ratebusiness', { title: 'Rate The Business', page: 'ratebusiness', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayRateBusinessPage = DisplayRateBusinessPage;
//# sourceMappingURL=addbusiness.js.map