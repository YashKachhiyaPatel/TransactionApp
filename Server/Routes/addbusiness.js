"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addbusiness_1 = require("../Controllers/addbusiness");
const Util_1 = require("../Util");
const router = express_1.default.Router();
exports.default = router;
router.get('/', Util_1.AuthGuard, addbusiness_1.DisplayCustomerIndexPage);
router.get('/index', Util_1.AuthGuard, addbusiness_1.DisplayCustomerIndexPage);
router.get('/addbusiness', Util_1.AuthGuard, addbusiness_1.DisplayListOfBusinesses);
router.get('/addbusiness/add', Util_1.AuthGuard, addbusiness_1.DisplayAddBusinessPage);
router.post('/addbusiness/add', Util_1.AuthGuard, addbusiness_1.ProcessAddBusiness);
router.get('/addbusiness/edit/:id', Util_1.AuthGuard, addbusiness_1.DisplayEditBusinessPage);
router.post('/addbusiness/edit/:id', Util_1.AuthGuard, addbusiness_1.ProcessEditBusinessPage);
router.get('/ratebusiness', addbusiness_1.DisplayRateBusinessPage);
//# sourceMappingURL=addbusiness.js.map