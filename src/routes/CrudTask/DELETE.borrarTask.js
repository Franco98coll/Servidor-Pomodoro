import app from '../../app.js';
import prisma from '../../../prisma/configprisma.js';

app.delete('/tarea', async (req, res) => {
    try {
        // Obtener el ID de la tarea a borrar
        const { TaskId } = req.body;

        // Borrar la tarea de la base de datos utilizando Prisma
        const deletedTask = await prisma.task.delete({
            where: {
                TaskId,
            },
        });

        // Enviar la tarea borrada como respuesta
        res.json(deletedTask);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el borrado de la tarea
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Error deleting task' });
    }
});

export default app;