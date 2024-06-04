
const cnx = require('../common/appsettings')
const fs = require('fs');
let pool = cnx.pool;
const ruta = '/archivos';




const getusuario = async (request, response) => {
    let queryUsuario = await pool.query('select * from seg_userprofile where c_usuario = $1 and c_clave= $2 and n_borrado = 0', [response.body.c_usuario, response.body.c_clave]);

    response.status(200).json(queryUsuario.rows);
}

const getdato = async (request, response) => {
    console.log("getdatos");

        let tipoProductos = await pool.query('select * from gen_tipo_producto');
        let productos = await pool.query('select * from gen_producto');
        let tipoEquipos = await pool.query('select * from gen_tipo_equipo');
        let equipos = await pool.query('select * from gen_equipo');
        let usuarios = await pool.query('select * from seg_usuario');

        response.status(200).json({
            tipoProductos: tipoProductos.rows,
            productos: productos.rows,
            tipoEquipos: tipoEquipos.rows,
            equipos: equipos.rows,
            usuarios: usuarios.rows
        })
}



module.exports = {
    getusuario,
    getdato
}

