import app from "../../app.js";
import prisma from "../../../prisma/configprisma.js";
import jwt from "jsonwebtoken";
import cors from "cors";

app.use(cors());

app.post("/newUserGoogle", async (req, res) => {
    console.log('entro a newUserGoogle');
    const { Name, Email, Photo } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                Email,
            },
        });
        if (!user) {
            console.log('no esta registrado');
            const newUser = await prisma.user.create({
                data: {
                    Name,
                    Email,
                    Photo,
                },
            });
            const token = jwt.sign({ id: newUser.UserId }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            console.log('token generado');
            res.status(201).json({ token, newUser });
        } else {
            const token = jwt.sign({ id: user.UserId }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            res.status(201).json({ token, user });
        }
    } catch (err) {
        res.status(400).json({ error: 'lalalalala' });
    }
});

export default app;
