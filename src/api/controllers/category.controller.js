import responseHandler from '~api/handlers/response.handler.js'
import catchAsync from '~utils/catch-async.js'
import prisma from '~configs/prisma.client'
import { categoryService } from '~api/services'

// [GET] '/categories/'
const getListCategory = catchAsync(async (req, res) => {
  const { categories } = await categoryService.getListCategory(prisma)

  responseHandler.ok(res, { categories })
}, prisma)

// [GET] '/categories/:id'
const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params

  const category = await categoryService.getCategoryById(prisma, id)

  responseHandler.ok(res, { category })
}, prisma)

// [GET] '/categories/:id/products'
const getListProductByCategoryId = catchAsync(async (req, res) => {
  const { id } = req.params

  const products = await categoryService.getListProductByCategoryId(prisma, id)

  responseHandler.ok(res, { products })
}, prisma)

// #region variations
// [POST] '/categories/:id/variations'
const createVariationByCategoryId = catchAsync(async (req, res) => {
  const { id } = req.params

  const variation = await categoryService.createVariationByCategoryId(
    prisma,
    id,
    req.body,
  )

  responseHandler.created(res, { variation })
}, prisma)

// [GET] '/categories/:id/variations'
const getListVariationByCategoryId = catchAsync(async (req, res) => {
  const { id } = req.params

  const variations = await categoryService.getListVariationByCategoryId(
    prisma,
    id,
  )

  responseHandler.ok(res, { variations })
}, prisma)

// #endregion variations

// [POST] '/categories/'
const createCategory = catchAsync(async (req, res) => {
  const { categoryName, icUrl, variations } = req.body
  let category
  if (!variations) {
    category = await categoryService.createCategory(prisma, categoryName, icUrl)
  } else {
    category = await categoryService.createCategoryWithVariations(
      prisma,
      categoryName,
      icUrl,
      variations,
    )
  }
  responseHandler.created(res, { category })
}, prisma)

// [PATCH] '/categories/:id'
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const category = await categoryService.updateCategory(prisma, id, req.body)

  responseHandler.ok(res, { category })
}, prisma)

// [DELETE] '/categories/:id'
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const category = await categoryService.deleteCategory(prisma, id)

  responseHandler.ok(res, { category })
}, prisma)

export default {
  createCategory,
  createVariationByCategoryId,
  deleteCategory,
  getListCategory,
  getCategoryById,
  getListProductByCategoryId,
  getListVariationByCategoryId,
  updateCategory,
}
