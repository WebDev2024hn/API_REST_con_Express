const express = require('express');
const fs = require('fs/promises');
const app = express();
const PORT = 3000;

app.use(express.json());

async function redJson(ruta) {
    const contenido = await fs.readFile(ruta, 'utf-8');
    return JSON.parse(contenido);
}

async function writeJson(ruta, datos) {
    await fs.writeFile(ruta, JSON.stringify(datos, null, 2), 'utf-8');
}


app.get('/productos', async (req, res) => {
    const ruta = 'data/productos.json';
    const productos = await redJson(ruta);
    res.status(200).json({ status: 200, message: 'Exito', data: productos });
});


app.post('/productos', async (req, res) => {
    const producto = req.body;
    const ruta = 'data/productos.json';
    const productos = await redJson(ruta);
    productos.push(producto);
    await writeJson(ruta, productos);
    res.status(201).json({ status: 201, message: 'Registro exitoso' });
});

app.get('/fabricantes', async (req, res) => {
    const ruta = 'data/fabricantes.json';
    const fabricantes = await redJson(ruta);
    res.status(200).json({ status: 200, message: 'Exito', data: fabricantes });
});


app.put('/productos/:id', async (req, res) => {
    const idBuscado = req.params.id;
    const datosNuevos = req.body;
    const ruta = 'data/productos.json';

    const productos = await redJson(ruta);
    const productoEncontrado = productos.find(p => p.id == idBuscado);

    if (!productoEncontrado) {
        return res.status(404).json({ status: 404, message: 'Producto no encontrado' });
    }

    productoEncontrado.nombre = datosNuevos.nombre;
    productoEncontrado.precio = datosNuevos.precio;
    productoEncontrado.stock = datosNuevos.stock;

    await writeJson(ruta, productos);

    res.status(200).json({ status: 200, message: 'Producto actualizado', data: productoEncontrado });
});



app.delete('/productos/:id', async (req, res) => {
    const idBuscado = req.params.id;
    const ruta = 'data/productos.json';

    const productos = await redJson(ruta);
    const productoEncontrado = productos.find(p => p.id == idBuscado);

    if (!productoEncontrado) {
        return res.status(404).json({ status: 404, message: 'Producto no encontrado para eliminar' });
    }
    const productosFiltrados = productos.filter(p => p.id != idBuscado);

    await writeJson(ruta, productosFiltrados);
    res.status(200).json({ status: 200, message: 'Eliminado' });
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});