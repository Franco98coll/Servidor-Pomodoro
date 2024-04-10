import app from '../../app.js';
import prisma from '../../../prisma/configprisma.js';

app.post('/tarea', async (req, res) => {
    try {
        const { Description, Status, UserId } = req.body;
        console.log(req.body);

        // Crear una nueva tarea en la base de datos utilizando Prisma
        const newTask = await prisma.task.create({
            data: {
                UserId,
                Description,
                Status,
            },
        });

        // Enviar la nueva tarea como respuesta
        res.json(newTask);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la creación de la tarea
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task' });
    }

});

export default app;