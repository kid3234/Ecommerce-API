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
    user,
    price,
    totalQty,
  } = req.body;

  const productexist = await Product.findOne({ name });
  if (productexist) {
    throw new Error("product alredy exists");
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

  if(req?.query?.price){
    const priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
      price: {$gte: priceRange[0] , $lte:priceRange[1]},
    })
  }

  const products = await productQuery;
  res.json({
    status: "success",
    products,
  });
});
