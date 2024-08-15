import Brand from "../model/Brand.js";
import Category from "../model/category.js";
import Product from "../model/Product.js";
import expressAsyncHandler from "express-async-handler";

export const createProductCtrl = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
  } = req.body;

  const productexist = await Product.findOne({ name ,brand,category });
  if (productexist) {
    throw new Error("product alredy exists");
  }

  const categoryFound = await Category.findOne({ name: category });
  console.log("category", categoryFound);

  if (!categoryFound) {
    return res.status(404).json({
      message: "category not found please create category first!",
    });
  }
console.log("brand",brand.toLowerCase());

  const brandFound = await Brand.findOne({ name: brand.toLowerCase() });
  if (!brandFound) {
    return res.status(404).json({
      message: "brand not found please create brand first!",
    });
  }

  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  });

  categoryFound.product.push(product._id);
  await categoryFound.save();

  brandFound.products.push(product._id);
  await brandFound.save();
  //   push the product in the category

  // send responce
  res.json({
    status: "success",
    message: "product created successfuly",
    product,
  });
});

export const getAllProductsCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.query);
  let productQuery = Product.find();

  //  filtter by brand
  if (req?.query?.name) {
    productQuery = productQuery.find({
      name: { $regex: req?.query?.name, $options: "i" },
    });
  }

  // filtter by color
  if (req?.query?.color) {
    productQuery = productQuery.find({
      colors: { $regex: req?.query?.color, $options: "i" },
    });
  }

  // filtter by size
  if (req?.query?.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req?.query?.sizes, $options: "i" },
    });
  }

  // filter by brand
  if (req?.query?.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req?.query?.brand, $options: "i" },
    });
  }

  // filtter by category
  if (req?.query?.category) {
    productQuery = productQuery.find({
      category: { $regex: req?.query?.category, $options: "i" },
    });
  }

  // fillter product by price range

  if (req?.query?.price) {
    const priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // Pagination

  const page = parseInt(req?.query?.page) ? parseInt(req?.query?.page) : 1;
  const limit = parseInt(req?.query?.limit) ? parseInt(req?.query?.limit) : 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  const pagination = {};
  if (endIndex < total) {
    pagination.netx = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const products = await productQuery.populate('reviews');
  res.json({
    status: "success",
    total,
    result: products.length,
    pagination,
    message: "Product fetched successfuly",
    products,
  });
});

export const getProductCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate('reviews');
  if (product) {
    return res.status(200).json({
      message: "product is fetched successfuly",
      product,
    });
  } else {
    throw new Error("product not found");
  }
});

export const updateProductCtrl = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    },
    {
      new: true,
    }
  );

  if (!product) {
    throw new Error("Ptoduct not updated");
  }

  res.json({
    message: "product updated successfuly",
    product,
  });
});

export const deleteProductCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error("can't delete product");
  }
  res.json({
    message: "Product delated successfuly",
    product,
  });
});
