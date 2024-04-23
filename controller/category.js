const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const Category = require("../models/Category");

const getCategories = asyncHandler(async (req, res, next) => {
  const keyWord = req.query.keyWord;

  if (keyWord) {
    const searchItem = keyWord
      ? { name: { $regex: keyWord, $options: "i" } }
      : {};
    const searchProduct = await Category.find(searchItem);
    console.log(searchProduct);

    res.status(200).send({
      status: "success",
      data: { results: searchProduct, count: searchProduct.length },
    });
  } else {
    res.status(200).send({ status: "success", data: res.advanceResults });
  }
});

const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category)
    throw createError(
      404,
      `Category is not found with id of ${req.params.categoryId}`
    );

  res.status(200).send({ status: "success", data: category });
});

const addCategory = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const category = await Category.create(req.body);
  res.status(201).send({ status: "success", data: category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const editCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editCategory)
    throw createError(
      404,
      `Category is not found with id of ${req.params.categoryId}`
    );

  const updatedUser = await Category.findById(req.params.categoryId);

  res.status(201).send({ status: "success", data: updatedUser });
});

const removeCategory = asyncHandler(async (req, res, next) => {
  const findCategory = await Category.findByIdAndDelete(req.params.categoryId);

  if (!findCategory)
    throw createError(
      404,
      `Category is not found with id of ${req.params.categoryId}`
    );

  res
    .status(204)
    .send({ status: "success", message: "Category Deleted Successfully" });
});
module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  removeCategory,
};
