"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const addbusiness_1 = require("../Controllers/addbusiness");
const index_1 = require("../Util/index");
router.get('/addbusiness', index_1.AuthGuard, addbusiness_1.DisplayaddBusinessListPage);
router.get('/addbusiness/add', index_1.AuthGuard, addbusiness_1.DisplayBusinessAddPage);
router.post('/addbusiness/add', index_1.AuthGuard, addbusiness_1.ProcessBusinessAddPage);
router.get('/addbusiness/edit/:id', index_1.AuthGuard, addbusiness_1.DisplayaddbusinessEditPage);
router.post('/addbusiness/edit/:id', index_1.AuthGuard, addbusiness_1.ProcessBusinessEditPage);
router.get('/addbusiness/delete/:id', index_1.AuthGuard, addbusiness_1.ProcessBusinessDeletePage);
//# sourceMappingURL=addbusiness.js.map