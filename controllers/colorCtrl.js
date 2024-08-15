import expressAsyncHandler from "express-async-handler";
import Color from "../model/Color.js";

export const createColor = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const colorexist = await Color.find({ name });
  if (!colorexist) {
    throw new Error("color alredy exists");
  }

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  if (!color) {
    throw new Error("can't create color");
  }

  res.status(201).json({
    message: "color created successfuly",
    color,
  });
});

export const getAllColors = expressAsyncHandler(async (req, res) => {
  const colors = await Color.find();

  if (!colors) {
    throw new Error("there is no registered colors");
  }

  res.status(200).json({
    message: "colors featched successfuly",
    colors,
  });
});

export const getcolor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const color = await Color.findById(id);
  if (!color) {
    throw new Error("color does not exist");
  }

  res.status(200).json({
    message: "color featched successfuly",
    color,
  });
});

export const updateColor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const color = await Color.findByIdAndUpdate(
    id,
    {
      name: name.toLowerCase(),
    },
    {
      new: true,
    }
  );
  if (!color) {
    throw new Error("can't update color");
  }
  await color.save();

  res.status(200).json({
    message: "color updated successfuly",
    color,
  });
});

export const deleteColor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const color = await Color.findByIdAndDelete(id);
  if (!color) {
    throw new Error("can't delete color");
  }

  res.status(200).json({
    message: "color deleted successfuly",
  });
});
