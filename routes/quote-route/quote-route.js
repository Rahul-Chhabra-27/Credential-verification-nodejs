const { createQuote, updateQuote, deleteQuote, getAllQuotes } = require('../../controllers/quote-controller/quote-controller');
const router = require('express').Router();
const protect = require('../../middlewares/auth-middleware');

router.post('/',protect,createQuote);
router.put('/:id',protect,updateQuote);
router.delete('/:id',protect,deleteQuote);
router.get('/',protect,getAllQuotes);

module.exports = router;