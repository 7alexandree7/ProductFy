import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express'

import userRoutes from './routes/userRoutes'
import productRoutes from './routes/ProductsRoutes'
import commentRoutes from './routes/commentRoutes'

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware());



app.get('/', (req, res) => {
    res.json({
        message: "Welcome to productfy API - Powered by Postgres, Express, Drizzle, and Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        },
    });
});

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)


app.listen(ENV.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV.PORT}`);
});