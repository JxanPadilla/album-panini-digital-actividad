const express = require("express");
const app = express();
const PORT = 3001; // Puerto de escucha
 
app.use(express.json());
 
let seleccion = [
    {id: 1, pais: "Argentina", confederacion: "Comebol", veces_campeones: "3", img: "https://www.teleadhesivo.com/es/img/mrs04-png/folder/products-detalle-png/pegatinas-coches-motos-argentina---escudo-de-futbol.png" },
    {id: 2, pais: "Colombia", confederacion: "Comebol", veces_campeones: "0", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Escudo_de_la_Federaci%C3%B3n_Colombiana_de_F%C3%BAtbol.png/1024px-Escudo_de_la_Federaci%C3%B3n_Colombiana_de_F%C3%BAtbol.png" },
    {id: 3, pais: "España", confederacion: "Euro", veces_campeones: "1", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Escudo_de_Espa%C3%B1a_%28mazonado%29.svg/1199px-Escudo_de_Espa%C3%B1a_%28mazonado%29.svg.png" },
    {id: 4, pais: "Brazil", confederacion: "Comebol", veces_campeones: "5", img: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Logo_Brasil.png" },
    {id: 5, pais: "Portugal", confederacion: "Euro", veces_campeones: "0", img: "https://www.shutterstock.com/image-vector/logo-fpf-portugal-international-federation-600w-2324345653.jpg" },
]

let confederacion = [
   {id: 1, confederacion: "Concacaf"}, 
   {id: 2, confederacion: "Comebol"}, 
   {id: 3, confederacion: "Euro"}
]

let jugador = [
    {id: 1, nombre: "Lionel Messi", edad: "38 ", equipo: "Argentina", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Messi_vs_Nigeria_2018.jpg/250px-Messi_vs_Nigeria_2018.jpg", Dribling: "100", Velocidad: "80", Regate: "100", stats: "99%"},
    {id: 2, nombre: "Luis Días", edad: "28 ", equipo: "Colombia", img: "https://m.media-amazon.com/images/M/MV5BYmNjZGU5ZWItYmI3ZS00ZTBlLThkY2EtNjBiNTkxOWVlMTMwXkEyXkFqcGc@._V1_.jpg", Dribling: "90", Velocidad: "98", Regate: "89", stats: "93%"},
    {id: 3, nombre: "Lamine Yamal", edad: "18 ", equipo: "España", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6b_eKxkWEUeTe7nm0j_euqNE65MHQUzC0A&s", Dribling: "98", Velocidad: "98", Regate: "90", stats: "95%"},
    {id: 4, nombre: "Neymar Junior", edad: "33 ", equipo: "Brazil", img: "https://www.famousbirthdays.com/headshots/neymar-2.jpg", Dribling: "100", Velocidad: "100", Regate: "100", stats: "98%"},
    {id: 5, nombre: "Cristiano Ronaldo", edad: "40 ", equipo: "Portugal", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDiBn8U85pRsbK5nopUWHa2uxkx5VxFdJjw&s", Dribling: "100", Velocidad: "95", Regate: "100", stats: "99%"},
]

 
app.listen(PORT, () => {
    console.log(`Servidor álbum panini digital corriendo en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('________álbum panini digital________');
});
 
// Mostrar seleccion
app.get("/selec", (req, res) => {
    return res.json(seleccion);
})

// Mostrar confederaciones
app.get('/conf', (req, res) => {
    res.json(confederacion);
});

// Mostrar jugador
app.get('/jug', (req, res) => {
    res.json(jugador);
});


//  Agregar seleccion
app.post("/selec", (req, res) => {
    let selecN = {
        id: seleccion.length + 1,
        pais: req.body.pais,
        confederacion: req.body.confederacion,
        veces_campeones: parseInt(req.body.veces_campeones),
        img: req.body.img,
    };
    if (!selecN.pais){
        return res.status(400).send('Debe agregar el pais');
    } 
    // se agrega la confederacion en caso de que no exista
    if (!(confederacion.includes(selecN.confederacion))){
        let confN = {
        id: confederacion.length + 1,
        confederacion: req.body.confederacion
        }
        confederacion.push(confN)
    } 
    if (!selecN.img) {
        return res.status(400).send('Debe agregar una imagen');
    } 
    seleccion.push(selecN)
    return res.status(200).json(seleccion);
})

// Agregar confederacion
app.post('/conf', (req, res) => {
    let confN = {
        id: confederacion.length + 1,
        confederacion: req.body.confederacion
    }
    confederacion.push(confN)
    res.status(201).json({ message: 'Se agregó la confederacion nueva', confederacion});
});

// Agregar jugador
app.post('/jug', (req, res) => {
    let jugN = {
        id: jugador.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        equipo: req.body.equipo,
        img: req.body.img,
    }
    jugador.push(jugN)
    res.status(201).json({ message: 'Se agregó el jugador nuevo', jugador});
});

