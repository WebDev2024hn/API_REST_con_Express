const express= require("express");
const app = express();
const PORT = 3000;

//Libros
const libros = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        anioPublicacion: 1967
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopía",
        anioPublicacion: 1949
    },
    {
        id: 3,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "Fantasía",
        anioPublicacion: 1943
    },
    {
        id: 4,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "Novela",
        anioPublicacion: 1605
    },
    {
        id: 5,
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J. K. Rowling",
        genero: "Fantasía",
        anioPublicacion: 1997
    }
];

//lectura de todos los libros
app.get("/api/books", (req, res)=> {
    res.send(libros);
});


//lectura mediante el # de ID
app.get("/api/books/:id", (req, res)=> {
    const id= parseInt(req.params.id);
    const libro = libros.find((libro)=> libro.id === id);

    if(!libro){
      return res.status(404).json({status:404, message:"Libro no encontrado"});
    }
    res.status(200).json({status:200, message: `El libro encontrado es: ${libro.titulo}`});
});


app.listen(PORT,()=>{
    console.log(`Servidor en puerto http://localhost:${PORT}`);
});