import app from '../../app.js';
import prisma from '../../../prisma/configprisma.js';

app.put('/tarea', async (req, res) => {
    console.log(req.body);
    try {

        // Obtener los datos de la tarea a actualizar
        const { TaskId, Description } = req.body;

        // Actualizar la tarea en la base de datos utilizando Prisma
        const task = await prisma.task.update({
            where: {
                TaskId,
            },
            data: {
                Description,
            },
        });

        // Enviar la tarea actualizada como respuesta
        res.json(task);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la actualización de la tarea
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Error updating task' });
    }
});


export default app;