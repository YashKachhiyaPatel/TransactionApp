"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRateBusiness = exports.DisplayRateBusinessPage = exports.DisplayBusinessListPage = exports.DisplayCustomerDashBoardPage = void 0;
const addbusiness_1 = __importDefault(require("../Models/addbusiness"));
const Util_1 = require("../Util");
function DisplayCustomerDashBoardPage(req, res, next) {
    res.render('customer', { title: 'Customer Dashboard', page: 'index', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayCustomerDashBoardPage = DisplayCustomerDashBoardPage;
function DisplayBusinessListPage(req, res, next) {
    addbusiness_1.default.find({}, null, { sort: { name: 1 } }, function (err, businessList) {
        if (err) {
            return console.error(err);
        }
        res.render('customer/businesslist', { title: 'List of Businesses', page: 'businesslist', businessCollection: businessList, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayBusinessListPage = DisplayBusinessListPage;
function DisplayRateBusinessPage(req, res, next) {
    let id = req.params.id;
    addbusiness_1.default.findById(id, {}, {}, (err, businessToRate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('customer/ratebusiness', { title: 'Rate The Business', page: 'ratebusiness', businessCollection: businessToRate, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayRateBusinessPage = DisplayRateBusinessPage;
function ProcessRateBusiness(req, res, next) {
    let id = req.params.id;
    let rating = req.body.rating;
    addbusiness_1.default.updateOne({ _id: id }, { $inc: { btotalrating: +rating, bnumberofratings: +1 } }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/customer/businesslist');
    });
}
exports.ProcessRateBusiness = ProcessRateBusiness;
//# sourceMappingURL=customerdash.js.map