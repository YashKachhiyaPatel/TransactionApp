import express from 'express';
import { DisplayAddBusinessPage, DisplayCustomerIndexPage, DisplayEditBusinessPage, DisplayListOfBusinesses, DisplayRateBusinessPage, ProcessAddBusiness, ProcessEditBusinessPage } from '../Controllers/addbusiness';
import { AuthGuard } from '../Util';
const router = express.Router();
export default router;

// CUSTOMER DASHBOARD ====================
// GET customer dashboard 
router.get('/', AuthGuard,DisplayCustomerIndexPage);
router.get('/index', AuthGuard, DisplayCustomerIndexPage);

// GET customer's list of business contacts
router.get('/addbusiness', AuthGuard, DisplayListOfBusinesses);

// (ADDING) BUSINESS ===================
// GET customer's add business page
router.get('/addbusiness/add', AuthGuard, DisplayAddBusinessPage);

// POST customer's add business page
router.post('/addbusiness/add', AuthGuard, ProcessAddBusiness);

// (EDIT) BUSINESS ====================
// GET customer's edit business page
router.get('/addbusiness/edit/:id', AuthGuard, DisplayEditBusinessPage);

// POST customer's edit business page
router.post('/addbusiness/edit/:id', AuthGuard, ProcessEditBusinessPage);

// (RATE) BUSINESS (in progress) ====================
/* GET customer/ratebusiness page */
router.get('/ratebusiness', DisplayRateBusinessPage);

