import express from "express";
import multer from "multer";
import { registrarGato, obtenerGatos, actualizarGato, eliminarGato, buscarGatos } from "../controllers/gato.controller.js";
import { capturarInfoSolicitud } from "../middlewares/auditoria.js";
import {
  registrarGato,
  obtenerGatos,
  actualizarGato,
  eliminarGato,
  buscarGatos,
  enviarGatosPorEmail,   // Importe el nuevo controlador
} from '../controllers/gato.controller.js';


const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Después de crear el router.
// Debajo de const router = express.Router();
router.use(capturarInfoSolicitud);   // aplica a todas las rutas de este router

router.get('/gatos/enviar-email', enviarGatosPorEmail);

router.post(
  "/gato",
  upload.single("imagen"),
  registrarGato
);
router.get("/gatos", obtenerGatos);


router.put("/gato/:id", upload.single("imagen"), actualizarGato);

router.delete("/gato/:id", eliminarGato);

router.get("/gatos/buscar", buscarGatos);   // nueva ruta

export default router;
