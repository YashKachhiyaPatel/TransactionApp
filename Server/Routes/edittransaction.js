"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const edittransaction_1 = require("../Controllers/edittransaction");
const index_1 = require("../Util/index");
router.get('/transactions', index_1.AuthGuard, edittransaction_1.NewTransaction);
router.post('/transaction', index_1.AuthGuard, edittransaction_1.CreateNewTransaction);
router.get('/transactions/:id', index_1.AuthGuard, edittransaction_1.DisplayTransaction);
router.post('/transactions/:id', index_1.AuthGuard, edittransaction_1.EditTransaction);
//# sourceMappingURL=edittransaction.js.map