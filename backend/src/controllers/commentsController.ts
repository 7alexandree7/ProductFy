
import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(400).json({ error: "not authorized" });

        const { productId } = req.params;
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: "content not found" });

        const product = await queries.getProductById(productId);
        if (!product) return res.status(404).json({ error: "product not found" });

        const comment = await queries.createComment({
            content,
            userId,
            productId
        })
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "falled to create comment" });
    }
}


export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(400).json({ error: "not authorized" })

        const { commentId } = req.params

        const existingComment = await queries.getCommentById(commentId);
        if (!existingComment) return res.status(404).json({ error: `comment with id ${commentId} not found` });
        if (existingComment.userId !== userId) return res.status(403).json({ error: "you are not the owner of this comment" });

        const deleteComment = await queries.deleteComment(commentId);
        res.status(200).json(deleteComment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "falled to delete comment" });
    }
}