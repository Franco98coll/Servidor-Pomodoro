import app from '../../app.js';
import prisma from '../../../prisma/configprisma.js';

app.post('/tareas', async (req, res) => {
    try {
        // Obtener todas las tareas de la base de datos utilizando Prisma
        const { idUsuario } = req.body;
        const tasks = await prisma.task.findMany({
            where: {
                UserId: idUsuario,
            },
        });

        // Enviar las tareas como respuesta
        res.json(tasks);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la obtención de las tareas
        console.error('Error getting tasks:', error);
        res.status(500).json({ error: 'Error getting tasks' });
    }
});

export default app;