const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

async function redJson(ruta) {
    const rutaCompleta = path.join(__dirname, ruta);
    const texto = await fs.readFile(rutaCompleta, 'utf8');
    return JSON.parse(texto);
}

async function writeJson(ruta, datos) {
    const rutaCompleta = path.join(__dirname, ruta);
    await fs.writeFile(
        rutaCompleta,
        JSON.stringify(datos, null, 2),
        'utf8'
    );
}



app.get('/productos', async (req, res) => {
    try {
        const productos = await redJson('productos.json');

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: productos
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al leer los productos',
            error: error.message
        });
    }
});



app.post('/productos', async (req, res) => {
    try {
        const producto = req.body;

        // Verificar que el body no esté vacío ni sea null
        if (!producto || typeof producto !== 'object' || Array.isArray(producto)) {
            return res.status(400).json({
                status: 400,
                message: 'Debe enviar un producto válido en el body'
            });
        }

        const ruta = 'productos.json';

        const productos = await redJson(ruta);

        productos.push(producto);

        await writeJson(ruta, productos);

        res.status(201).json({
            status: 201,
            message: 'Registro exitoso',
            data: producto
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al crear el producto',
            error: error.message
        });
    }
});



app.put('/productos/:id', async (req, res) => {
    try {
        const ruta = 'productos.json';

        const productos = await redJson(ruta);

        const id = Number(req.params.id);

        const indice = productos.findIndex(producto => producto.id === id);

        if (indice === -1) {
            return res.status(404).json({
                status: 404,
                message: 'Producto no encontrado'
            });
        }

        productos[indice] = {
            ...productos[indice],
            ...req.body,
            id: id
        };

        await writeJson(ruta, productos);

        res.status(200).json({
            status: 200,
            message: 'Producto actualizado correctamente',
            data: productos[indice]
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
});



app.delete('/productos/:id', async (req, res) => {
    try {
        const ruta = 'productos.json';

        const productos = await redJson(ruta);

        const id = Number(req.params.id);

        const productoExiste = productos.some(producto => producto.id === id);

        if (!productoExiste) {
            return res.status(404).json({
                status: 404,
                message: 'Producto no encontrado'
            });
        }

        const productosActualizados = productos.filter(
            producto => producto.id !== id
        );

        await writeJson(ruta, productosActualizados);

        res.status(200).json({
            status: 200,
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});