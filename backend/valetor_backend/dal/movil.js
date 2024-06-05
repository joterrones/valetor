
const cnx = require('../common/appsettings')
const fs = require('fs');
let pool = cnx.pool;
const ruta = '/archivos';




const getusuario = async (request, response) => {
    
    try {
        let scriptSQL = "select n_idseg_usuario,c_usuario,c_clave,c_nombre from seg_usuario where c_usuario = '"+request.body.c_usuario+"' and c_clave= '"+request.body.c_clave+"' and n_borrado = 0";
        console.log(scriptSQL)
        let queryUsuario = await pool.query(scriptSQL);
        if(queryUsuario.rowCount>0){
            response.status(200).json({
                    data:queryUsuario.rows,
                    flag: true,
                    mensaje: "Resultado correcto"
                });
        }else{
            response.status(200).json({
                data:[],
                    flag: false,
                    mensaje: "Usuario y/o clave incorrecto"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:[],
                flag: false,
                mensaje: "Resultado con error"
            });
    }

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

