import { Request, Response } from "express";
import { ProductModel } from "../model/index";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProd = req.body;
    const product = new ProductModel(newProd);
    console.log(newProd);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = req.body;
    const product = await ProductModel.findByIdAndUpdate(
      { _id: updateProduct._id },
      updateProduct,
      { new: true }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(_id);
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
