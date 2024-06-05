
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
                data:null,
                    flag: false,
                    mensaje: "Usuario y/o clave incorrecto"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:null,
                flag: false,
                mensaje: "Resultado con error"
            });
    }

}

const insertarventa = async (request, response) => {
    
    try {
        let scriptSQL = "insert into gen_venta (n_idseg_vendedor, n_idgen_equipo, n_borrado, id_usercrea, d_fechacrea)values("+request.body.n_idseg_vendedor+","+request.body.n_idgen_equipo+",0,"+request.body.id_usercrea+",now()) returning *";
        console.log(scriptSQL)
        let queryUsuario = await pool.query(scriptSQL);
        if(queryUsuario.rowCount>0){
            response.status(200).json({
                    data:queryUsuario.rows,
                    flag: true,
                    mensaje: "Venta registrada correcta"
                });
        }else{
            response.status(200).json({
                data:null,
                    flag: false,
                    mensaje: "No se registró la venta"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:null,
                flag: false,
                mensaje: "Error al registrar la venta"
            });
    }

}

const actualizarhoraventa = async (request, response) => {
    
    try {
        let scriptSQL = "update gen_venta set n_hora ="+request.body.n_hora+", id_usermodi = "+request.body.n_idseg_vendedor+",d_fechamodi = now()) returning *";
        console.log(scriptSQL)
        let queryUsuario = await pool.query(scriptSQL);
        if(queryUsuario.rowCount>0){
            response.status(200).json({
                    data:queryUsuario.rows,
                    flag: true,
                    mensaje: "Venta registrada correcta"
                });
        }else{
            response.status(200).json({
                data:null,
                    flag: false,
                    mensaje: "No se registró la venta"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:null,
                flag: false,
                mensaje: "Error al registrar la venta"
            });
    }

}

const actualizarfechaventa = async (request, response) => {
    
    try {
        let scriptSQL = "update gen_venta set d_fecha ="+request.body.d_fecha+", id_usermodi = "+request.body.n_idseg_vendedor+",d_fechamodi = now()) returning *";
        console.log(scriptSQL)
        let queryUsuario = await pool.query(scriptSQL);
        if(queryUsuario.rowCount>0){
            response.status(200).json({
                    data:queryUsuario.rows,
                    flag: true,
                    mensaje: "Fecha inicio actualzada correctamente"
                });
        }else{
            response.status(200).json({
                data:null,
                    flag: false,
                    mensaje: "No se actualizó la fecha"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:null,
                flag: false,
                mensaje: "Error al actualizar la fecha"
            });
    }

}

const insertardetalleventa = async (request, response) => {
    
    try {
        let scriptSQL = "insert into gen_detalle_venta (n_idgen_venta, n_idgen_producto, n_cantidad, n_subtotal, b_pagado,  n_borrado, id_usercrea, d_fechacrea)values("+request.body.n_idgen_venta+","+request.body.n_idgen_producto+","+request.body.n_cantidad+","+request.body.n_subtotal+","+request.body.b_pagado+",0,"+request.body.id_usercrea+",now()) returning *";
        console.log(scriptSQL)
        let queryUsuario = await pool.query(scriptSQL);
        if(queryUsuario.rowCount>0){
            response.status(200).json({
                    data:queryUsuario.rows,
                    flag: true,
                    mensaje: "Detalle de venta registrada correctamente"
                });
        }else{
            response.status(200).json({
                data:null,
                    flag: false,
                    mensaje: "No se registró el detalle de la venta"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:null,
                flag: false,
                mensaje: "Error al registrar el detalle de la venta"
            });
    }

}

const actualizarpagodetalleventa = async (request, response) => {
    
    try {
        let scriptSQL = "update gen_detalle_venta set b_pagado ="+request.body.b_pagado+", id_usermodi = "+request.body.n_idseg_vendedor+",d_fechamodi = now()) returning *";
        console.log(scriptSQL)
        let queryUsuario = await pool.query(scriptSQL);
        if(queryUsuario.rowCount>0){
            response.status(200).json({
                    data:queryUsuario.rows,
                    flag: true,
                    mensaje: "El pago se actualizó correctamente"
                });
        }else{
            response.status(200).json({
                data:null,
                    flag: false,
                    mensaje: "No se actualizó el pago"
                });
        }
     
    } catch (error) {
        response.status(200).json({
            data:null,
                flag: false,
                mensaje: "Error al actualizar pago"
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
    getdato,
    insertarventa,
    insertardetalleventa,
}

