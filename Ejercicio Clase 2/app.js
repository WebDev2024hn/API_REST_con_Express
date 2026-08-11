const express = require('express');
const app = express();
const PORT = 3000;

const fs = require('fs');

app.use(express.json());

function obtenerProductos() {
    const data = fs.readFileSync('productos.json', 'utf8');
    return JSON.parse(data);
}

function registrarProductos(productos) {
    fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2),);
}

app.get('/productos', (req, res) => {
    let productos = obtenerProductos();
    res.status(200).json({ status: 200, message: "exito", data: productos })
});

app.post('/productos', (req, res) => {
    const producto = req.body;
    let productos = obtenerProductos();
    productos.push(producto);

    registrarProductos(productos);

    res.status(200).json({ status: 200, message: "exito", data: producto })
})

app.put('/productos', (req, res) => {
    const actproducto = req.body;
    let productos = obtenerProductos();

    let existe = false;
    productos.forEach(producto => {
        if (actproducto.id === producto.id) {
            existe = true;

            producto.nombre = actproducto.nombre;
            producto.marca = actproducto.marca
            producto.fabricante - actproducto.fabricante;
            producto.categoria = actproducto.categoria;

        }
    });
    if (!existe) {
        return res.status(404).json({ status: 404, message: "No existe el producto" });
    }
    registrarProductos(productos);

    return res.status(200).json({ status: 200, message: "Exito, producto actualizado", data: cproducto });
})


app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    let delproductos = obtenerProductos();

    const filtroProducto = delproductos.filter(producto => String(producto.id) !== String(id));


    if (filtroProducto.length !== delproductos.length) {
        delproductos = filtroProducto;
        res.status(200).json({ status: 200, message: "Exito, producto eliminado" });

        registrarProductos(delproductos);
    }
    else {
        res.status(404).json({ status: 404, message: "No existe el producto" })
    }
});

app.listen(PORT, () => {
    console.log(`el servidor escucha en http://localhost:${PORT}`);
})
