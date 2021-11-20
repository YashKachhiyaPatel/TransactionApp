import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type clothing controller
import { DisplayaddbusinessEditPage, DisplayaddBusinessListPage, DisplayBusinessAddPage, ProcessBusinessAddPage, ProcessBusinessDeletePage, ProcessBusinessEditPage } from '../Controllers/addbusiness';

// import Util Functions
import { AuthGuard } from '../Util/index';

//dashboard to list page
router.get('/addbusiness', AuthGuard, DisplayaddBusinessListPage);
/* GET - display add page. */
router.get('/addbusiness/add', AuthGuard, DisplayBusinessAddPage);

/* POST - process add page */
router.post('/addbusiness/add', AuthGuard, ProcessBusinessAddPage);


/* GET - display edit page. */
router.get('/addbusiness/edit/:id', AuthGuard, DisplayaddbusinessEditPage);

/* POST - process edit page */
router.post('/addbusiness/edit/:id', AuthGuard, ProcessBusinessEditPage);

/* GET - process delete */
router.get('/addbusiness/delete/:id', AuthGuard, ProcessBusinessDeletePage);






