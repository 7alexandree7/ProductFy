import { Router} from "express";
import { requireAuth } from "@clerk/express"; 
import * as productController from "../controllers/productController"

const router = Router();

router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.get("/my", requireAuth(), productController.getMyProducts)

export default router