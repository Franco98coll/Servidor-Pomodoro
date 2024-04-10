import app from "../../app.js";
import prisma from "../../../prisma/configprisma.js";
import jwt from "jsonwebtoken";


app.post("/newUser", async (req, res) => {
    const { Name, Email, Password, Photo } = req.body;
    try {
        // Hashear la contraseña antes de guardarla en la base de datos



        const newUser = await prisma.user.create({
            data: {
                Name,
                Email,
                Password, // Guarda la contraseña hasheada
                Photo
            },
        });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default app;
