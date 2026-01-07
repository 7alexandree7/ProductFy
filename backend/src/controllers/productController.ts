
import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error / products not found" });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const filteredProduct = await queries.getProductById(id);

        if (!filteredProduct) return res.status(404).json(`product with id ${id} not found`);

        res.status(200).json(filteredProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error / product not found" });
    }

}

export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(400).json({ error: "Unauthorized" });

        const myProduct = await queries.getProductsByUserId(userId);
        res.status(200).json(myProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "dont have any product" });
    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(400).json({ error: "not authorized" });

        const { title, description, imageUrl } = req.body;
        if (!title || !description || !imageUrl) return res.status(400).json({ error: "title or description or imageUrl not found" });

        const newProduct = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        })

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "falled to create product" });
    }
}


export const updateProduct = async (req: Request, res: Response) => {

    const { userId } = getAuth(req);
    if (!userId) return res.status(400).json({ error: "not authorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) return res.status(400).json({ error: "title or description or imageUrl not found" });

    const existingProduct = await queries.getProductById(id)
    if (!existingProduct) return res.status(404).json({ error: `product with id ${id} not found` });

    if(existingProduct.userId !== userId) return res.status(403).json({ error: "you are not the owner of this product" });

    const updateProduct = await queries.updateProduct(id, { title, description, imageUrl });
    res.status(200).json(updateProduct);
}