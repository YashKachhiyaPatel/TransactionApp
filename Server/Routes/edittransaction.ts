import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type clothing controller
import { NewTransaction, CreateNewTransaction, DisplayTransaction, EditTransaction } from '../Controllers/edittransaction';

// import Util Functions
import { AuthGuard } from '../Util/index';

// GET new Transaction page.
router.get('/transactions', AuthGuard, NewTransaction);

// POST new Transaction
router.post('/transaction', AuthGuard, CreateNewTransaction);

// GET Transaction to edit
router.get('/transactions/:id', AuthGuard, DisplayTransaction);

// POST edited Transaction
router.post('/transactions/:id', AuthGuard, EditTransaction);