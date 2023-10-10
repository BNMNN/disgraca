const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_api',
  });

async function selectUsuarios(){
    const results = await connection.query("SELECT * FROM usuario");
    return results[0];
}

async function selectUsuario(id_usuario){
    const results = await connection.query("SELECT * FROM usuario WHERE id_usuario=?", [id_usuario]);
    return results[0];
}

async function insertUsuario(usuario){
    const values = [usuario.nome, usuario.telefone, usuario.cpf, usuario.email, usuario.senha];
    await connection.query("INSERT INTO usuario(nome,telefone,cpf,email,senha) VALUES (?,?,?,?,?)", values);
}

async function updateUsuario(id_usuario, usuario){
    const values = [usuario.nome, id_usuario];
    await connection.query("UPDATE usuario SET nome=? WHERE id_usuario=?", values);
}

async function deleteUsuario(id_usuario){
    const values = [id_usuario];
    await connection.query("DELETE FROM usuario WHERE id_usuario=?", values);
}

/* ---------------------------------------------------------------------- */

/* async function createProfissao(profissao, id_cliente){
    const values = [profissao.nome_profissao, id_cliente];
    await connection.query("INSERT INTO profissao(nome_profissao, id_cliente) VALUES (?,?)", values);
} */

async function insertDoc(uploads){
    const values = [uploads.file];
    await connection.query("INSERT INTO documentos(img_doc) VALUES (?)", values);
}

async function selectDoc(){
    const results = await connection.query("SELECT * FROM documentos");
    return results[0];
}

module.exports = {
    selectUsuarios,
    selectUsuario,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    insertDoc,
    selectDoc
}