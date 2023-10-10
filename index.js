import storage from ('./multerConfig');

require("dotenv").config();
const multer = require("multer");
const db = require("./db")
const express = require("express");

const upload = multer({ storage })

const app = express();

app.use(express.json());

app.post('/uploads', upload.single('img'), async (require, response) => {
    await db.insertDoc();
    response.sendStatus(200);
})


app.get('/documentos', async (request, response) =>{
    await db.selectDoc();
    response.sendStatus(200);
})


/* ------------------------------------------------------ */

/* app.post("/profissao/:id", async (request, response) => {
    const profissao = request.body;
    await db.createProfissao(profissao);
    response.sendStatus(200);
})
 */
/* ------------------------------------------------------ */

app.delete("/usuario/:id", (request, response) => {
    const id = parseInt(request.params.id);
    db.deleteUsuario(id);
    response.sendStatus(204);
})

app.patch("/usuario/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const usuario = request.body;
    db.updateUsuario(id, usuario);
    response.sendStatus(200);
})

app.post("/usuario", async (request, response) => {
    const usuario = request.body;
    await db.insertUsuario(usuario);
    response.sendStatus(201);
})

app.get("/usuario/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectUsuario(id);
    response.json(results);
})

app.get("/usuario", async (request, response) => {
    const results = await db.selectUsuarios();
    response.json(results);
})

app.get("/", (request, response) => {
    response.json(
        {message:"WORKS"}
    )
})

app.listen(process.env.PORT, () => {
    console.log("APP funcionando");
});