import app from "../../app.js";
import multer from 'multer';
import path from 'path';
import prisma from "../../../prisma/configprisma.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Obtener la ruta del directorio actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta donde se guardarán los archivos subidos (dentro de la carpeta "Public" en "src")
const uploadDirectory = join(__dirname, '../../Public');

// Crea la carpeta "Public" si no existe
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Configuración personalizada de Multer para mantener las extensiones de archivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../')); // Ruta de destino de los archivos subidos
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname); // Obtener la extensión del archivo original
        cb(null, 'Public/' + file.fieldname + '-' + Date.now() + extension); // Nombre del archivo guardado con la ruta relativa
    }

});






// Configura Multer con la configuración personalizada de almacenamiento
const upload = multer({ storage: storage });

// Ruta POST para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file; // Accede al archivo enviado en la solicitud
    const { Email } = req.body;

    console.log(Email);
    try {
        // Si no se envió ningún archivo
        if (!file) {
            return res.status(400).send('No se ha enviado ningún archivo.');
        }
        const fullPath = file.path;
        const desiredPath = fullPath.replace('/usr/src/app/', ''); // Eliminar el prefijo no deseado


        const cambiarFoto = async () => {
            console.log("cambiando foto", Email);
            const updateUser = await prisma.user.update({
                where: { Email: Email },
                data: {
                    Photo: desiredPath
                }
            });
            console.log(updateUser);
        }
        cambiarFoto();

        res.send(file);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default app;
