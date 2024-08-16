import expressAsyncHandler from "express-async-handler";
import Category from "../model/category.js";

export const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name, user, image, product } = req.body;

  const existCategory = await Category.find({ name: name });

  console.log("existCategory",existCategory);
  
  if (existCategory.length >  0) {
    throw new Error("The category is alredy exists");
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
    // image,
    // product,
  });

  if (!category) {
    throw new Error("can't create the category");
  }

  res.status(201).json({
    message: "category created successfuly",
    category,
  });
});

export const getCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    throw new Error("there is no category");
  }

  res.status(200).json({
    message: "category fetch successfuly",
    categories,
  });
});

export const getCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("category doesn't exist");
  }

  res.status(200).json({
    message: "category fetch successfuly",
    category,
  });
});

export const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: name.toLowerCase(),
    },
    {
      new: true,
    }
  );

  if (!category) {
    throw new Error("can not update category");
  }
  res.status(200).json({
    message: "categrory updated successfuly",
    category,
  });
});

export const deleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new Error("Can't delete the category");
  }

  res.json({
    status: "success",
    message: "Category deleted successfuly",
  });
});
