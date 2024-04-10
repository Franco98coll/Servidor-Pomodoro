// Importa las dependencias necesarias
import app from "../../app.js";
import prisma from "../../../prisma/configprisma.js";
import jwt from "jsonwebtoken";

// Endpoint para el inicio de sesión
app.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    try {
        // Busca al usuario en la base de datos por su correo electrónico
        const user = await prisma.user.findUnique({ where: { Email } });

        // Verifica si el usuario existe y si la contraseña es correcta
        if (!user || user.Password !== Password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Genera un token JWT para el usuario autenticado
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Envía el token JWT como respuesta al cliente
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default app;

