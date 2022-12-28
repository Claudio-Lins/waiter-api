import path from 'node:path'

import { Router } from 'express'
import { createCategories } from './app/useCases/categories/createCategory'
import { listCategories } from './app/useCases/categories/listCategories'
import { createProduct } from './app/useCases/Products/createProduct'
import { listProducts } from './app/useCases/Products/listProducts'

import multer from 'multer'
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory'
import { listOrders } from './app/useCases/Oders/listOrders'
import { createOrders } from './app/useCases/Oders/createOrders'
import { changeOrderStatus } from './app/useCases/Oders/changeOrderStatus'
import { cancelOrder } from './app/useCases/Oders/cancelOrder'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

// List categories
router.get('/categories', listCategories)

// Create categories
router.post('/categories', createCategories)

// List Products
router.get('/products', listProducts)

// Create Products
router.post('/products', upload.single('image'), createProduct)

// Get Products by Category
router.get('/categories/:categoryId/products', listProductsByCategory)

//  List Orders
router.get('/orders', listOrders)

// Create Orders
router.post('/orders', createOrders)

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatus)

// Delete/Cancel Order
router.delete('/orders/:orderId', cancelOrder)
