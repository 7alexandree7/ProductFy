import express from 'express';

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});