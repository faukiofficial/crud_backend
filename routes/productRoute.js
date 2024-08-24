const router = require('express').Router()
const multer = require('multer')
const {createProduct, getAllProducts, getProductById, updateProductById, deleteProductById} = require('../controllers/productController')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

router.post('/products', upload.single('image'), createProduct)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.put('/products/:id', upload.single('image'), updateProductById)
router.delete('/products/:id', deleteProductById)

module.exports = router