import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type clothing controller
import { ProcessAddCustomer, DisplayCustomerAddPage, DisplayaddcustomerListPage, DisplayaddcustomerEditPage, ProcessCustomerAddPage, ProcessCustomerDeletePage, ProcessCustomerEditPage, DisplayTransactionHistoryPage } from '../Controllers/addcustomer';

// import Util Functions
import { AuthGuard } from '../Util/index';

/* GET /customer-list page. */
router.get('/', ProcessAddCustomer);

/* GET - display /customer/add page. */
router.get('/addcustomer/add', AuthGuard, DisplayCustomerAddPage);

/* GET - display /customer/edit/:id page. */
router.get('/addcustomer/edit/:id', AuthGuard, DisplayaddcustomerEditPage);

/* POST - process /customer/add page */
router.post('/addcustomer/add', AuthGuard, ProcessCustomerAddPage);

/* POST - process /customer/edit/:id page */
router.post('/addcustomer/edit/:id', AuthGuard, ProcessCustomerEditPage);

/* GET - process /customer/delete/:id */
router.get('/addcustomer/delete/:id', AuthGuard, ProcessCustomerDeletePage);

// GET - the owner's transaction history page
router.get('/transactionhistory', AuthGuard, DisplayTransactionHistoryPage);

//dashboard to customer-list page
router.get('/addcustomer', AuthGuard, DisplayaddcustomerListPage);

