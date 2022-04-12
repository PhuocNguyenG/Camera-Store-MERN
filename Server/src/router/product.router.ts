import { Router } from "express";
import { prodController } from "../controller/index";
export const prodRoute = Router();

prodRoute.get("/", prodController.getAllProduct);
prodRoute.post("/", prodController.createProduct);
prodRoute.get('/:id', prodController.getProductById);
prodRoute.put('/update/:id', prodController.updateProduct);
prodRoute.delete('/:id', prodController.deleteProduct);
