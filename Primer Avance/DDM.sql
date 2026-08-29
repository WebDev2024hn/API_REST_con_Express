INSERT INTO productos (
    sku, 
    nombre, 
    descripcion, 
    precio_compra, 
    precio_venta, 
    stock_minimo, 
    estado, 
    id_categoria, 
    id_proveedor
) 
VALUES ('PROD-004', 'Teclado Mecánico RGB', 'Teclado switch azul distribución ISO', 450.00, 850.00, 8, 'activo', 1, 1);

UPDATE productos 
SET precio_compra = 135, 
    precio_venta = 275 
WHERE sku = 'PROD-004';

SELECT 
    p.sku, 
    p.nombre AS producto, 
    c.nombre AS categoria, 
    pr.nombre_proveedor AS proveedor, 
    p.precio_venta AS precio
FROM productos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
INNER JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
WHERE p.estado = 'activo';
