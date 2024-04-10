import app from "../../app.js";
import prisma from "../../../prisma/configprisma.js";
import jwt from "jsonwebtoken";


app.get("/traerUser", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Error getting users' });
    }
});

export default app;