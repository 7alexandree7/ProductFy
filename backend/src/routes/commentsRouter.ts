import { Router } from "express";
import * as commentsController from "../controllers/commentsController"
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/:productId", requireAuth(), commentsController.createComment)
router.delete("/:commentId", requireAuth(), commentsController.deleteComment)

export  default router