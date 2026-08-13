// Ruta para obtener UN producto por ID
app.get('/productos/:id', async (req, res) => {
  try {
    const productos = await readJson('productos.json');
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el archivo' });
  }
});

// Ruta para ACTUALIZAR un producto por ID (PUT)
app.put('/productos/:id', async (req, res) => {
  try {
    const productos = await readJson('productos.json');
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Actualizamos los datos manteniendo el ID original
    productos[index] = { ...productos[index], ...req.body, id: parseInt(req.params.id) };
    
    await writeJson('productos.json', productos);
    res.json(productos[index]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para ELIMINAR un producto por ID (DELETE)
app.delete('/productos/:id', async (req, res) => {
  try {
    const productos = await readJson('productos.json');
    const nuevosProductos = productos.filter(p => p.id !== parseInt(req.params.id));
    
    if (productos.length === nuevosProductos.length) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    
    await writeJson('productos.json', nuevosProductos);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});