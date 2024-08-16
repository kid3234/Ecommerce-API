import expressAsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

export const createBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const brandexist = await Brand.find({ name });
  if (brandexist.length > 0) {
    throw new Error("Brand alredy exists");
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  if (!brand) {
    throw new Error("can't create brand");
  }

  res.status(201).json({
    message: "Brand created successfuly",
    brand,
  });
});

export const getAllBrands = expressAsyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (!brands) {
    throw new Error("there is no registered brands");
  }

  res.status(200).json({
    message: "Brands featched successfuly",
    brands,
  });
});

export const getBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) {
    throw new Error("Brand does not exist");
  }

  res.status(200).json({
    message: "Brand featched successfuly",
    brand,
  });
});

export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    id,
    {
      name: name.toLowerCase(),
    },
    {
      new: true,
    }
  );
  if (!brand) {
    throw new Error("can't update brand");
  }
  await brand.save();

  res.status(200).json({
    message: "Brand updated successfuly",
    brand,
  });
});

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    throw new Error("can't delete brand");
  }

  res.status(200).json({
    message: "Brand deleted successfuly",
  });
});
