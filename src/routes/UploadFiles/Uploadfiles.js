import app from "../../app.js";
import multer from 'multer';
import path from 'path';
import prisma from "../../../prisma/configprisma.js";



// Configuración personalizada de Multer para mantener las extensiones de archivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname); // Obtener la extensión del archivo original
        cb(null, file.fieldname + '-' + Date.now() + extension); // Nombre del archivo guardado (campo original + timestamp + extensión)
    }
});

// Configura Multer con la configuración personalizada de almacenamiento
const upload = multer({ storage: storage });


// Ruta POST para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file; // Accede al archivo enviado en la solicitud
    const { Email } = req.body;

    // Si no se envió ningún archivo
    if (!file) {
        return res.status(400).send('No se ha enviado ningún archivo.');
    }

    // Si se guardó correctamente, envía una respuesta exitosa
    res.send(file);

    // Guarda el nombre del archivo en la base de datos

    prisma.user.update({
        where: {
            Email
        },
        data: {
            Photo: file.path
        }
    });
});



export default app;