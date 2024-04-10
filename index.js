import app from './src/app.js';
import prisma from './prisma/configprisma.js';
import './src/routes/index.js';


app.get('/', (req, res) => {
    res.send('Hello World');
}
);


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`✔ Server running on port ${PORT}`);
        console.log("✔ Database connected");
    } catch (err) {
        console.log(err);
        process.exit(1); // Salir con código de error en caso de falla en la conexión a la base de datos
    }
});
