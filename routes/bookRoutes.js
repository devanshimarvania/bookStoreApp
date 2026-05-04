const express = require('express');
const router = express.Router();
const bookCtl = require('../controllers/bookControllers');

router.get('/', bookCtl.indexPage);
router.get('/add-book', bookCtl.addBook);
router.get('/view-book', bookCtl.viewBook);
router.post('/insertBook', bookCtl.upload, bookCtl.insertBookData);
router.get('/deleteBook/:id', bookCtl.deleteBook);
router.get('/editBook/:id', bookCtl.editBook);
router.post('/updateBook/:id', bookCtl.upload, bookCtl.updateBook);
router.get('/bookDetails/:id', bookCtl.singleBookDetail);

module.exports = router;
