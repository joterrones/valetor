const cnx = require("../common/appsettings");
const fs = require("fs");
let pool = cnx.pool;
const ruta = "/archivos";

const getusuario = async (request, response) => {
  try {
    let scriptSQL =
      "select n_idseg_usuario,c_usuario,c_clave,c_nombre from seg_usuario where c_usuario = '" +
      request.body.c_usuario +
      "' and c_clave= '" +
      request.body.c_clave +
      "' and n_borrado = 0";
    console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "Resultado correcto",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "Usuario y/o clave incorrecto",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Resultado con error",
    });
  }
};

const insertarventa = async (request, response) => {
  try {
    let scriptSQL =
      "insert into gen_venta (n_idseg_vendedor, n_idgen_equipo, b_pagado, n_borrado, n_id_usercrea, d_fechacrea)values(" +
      request.body.n_idseg_vendedor +
      "," +
      request.body.n_idgen_equipo +
      ",0,0," +
      request.body.n_idseg_vendedor +
      ",now()) returning *";
    console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "Venta registrada correcta",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "No se registró la venta",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Error al registrar la venta " + error,
    });
  }
};

const actualizarhoraventa = async (request, response) => {
  try {
    let scriptSQL =
      "update gen_venta set n_hora =" +
      request.body.n_hora +
      ", n_id_usermodi = " +
      request.body.n_idseg_vendedor +
      ",d_fechamodi = now() where n_idgen_venta = "+request.body.n_idgen_venta+" returning *";
    console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "Venta registrada correcta",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "No se registró la venta",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Error al registrar la venta",
    });
  }
};

const actualizarhorainicio = async (request, response) => {
  try {
    let scriptSQL =
      "update gen_venta set c_hora_inicio ='" +
      request.body.c_hora_inicio +
      "', n_id_usermodi = " +
      request.body.n_idseg_vendedor +
      ",d_fechamodi = now() where n_idgen_venta = "+request.body.n_idgen_venta+" returning *";
    console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "Fecha inicio actualzada correctamente",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "No se actualizó la fecha",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Error al actualizar la fecha",
    });
  }
};

const insertardetalleventa = async (request, response) => {
  try {
    let scriptSQL =
      "insert into gen_detalle_venta (n_idgen_venta, n_idgen_producto, n_cantidad, n_subtotal, b_pagado,  n_borrado, n_id_usercrea, d_fechacrea)values(" +
      request.body.n_idgen_venta +
      "," +
      request.body.n_idgen_producto +
      "," +
      request.body.n_cantidad +
      "," +
      request.body.n_subtotal +
      "," +
      request.body.b_pagado +
      ",0," +
      request.body.n_id_usercrea +
      ",now()) returning *";
    console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "Detalle de venta registrada correctamente",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "No se registró el detalle de la venta",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Error al registrar el detalle de la venta " + error,
    });
  }
};

const actualizarpagodetalleventa = async (request, response) => {
  try {
    let scriptSQL =
      "update gen_detalle_venta set b_pagado =" +
      request.body.b_pagado +
      ", id_usermodi = " +
      request.body.n_idseg_vendedor +
      ",d_fechamodi = now()) returning *";
    console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "El pago se actualizó correctamente",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "No se actualizó el pago",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Error al actualizar pago",
    });
  }
};

const getequipo = async (request, response) => {
  console.log("getequipo");
  let getequipo = await pool.query("select * from gen_equipo");
  response.status(200).json(getequipo.rows);
};

const gettipoproducto = async (request, response) => {
  console.log("gettipoproducto");
  let tipoProductos = await pool.query("select * from gen_tipo_producto");
  response.status(200).json(tipoProductos.rows);
};

const getproducto = async (request, response) => {
  console.log("getproducto");
  let producto = await pool.query(
    "select * from gen_producto where n_gen_tipo_producto = " +
      request.query.n_gen_tipo_producto
  );
  response.status(200).json(producto.rows);
};

const getventa = async (request, response) => {
  console.log("getventa");
  let venta = await pool.query(
    "select * from v_detalleventa where n_idgen_equipo = " +
      request.query.n_idgen_equipo 
  );
  response.status(200).json(venta.rows);
};

const getdetalleventa = async (request, response) => {
  console.log("getdetalleventa");
  let detalleVenta = await pool.query(
    "select dv.n_idgen_detalle_venta,dv.n_idgen_venta,dv.n_idgen_producto,dv.n_cantidad,dv.n_subtotal,dv.b_pagado, p.n_precio, p.c_nombre c_nombreproducto "+
    "from gen_detalle_venta dv inner join gen_producto p on dv.n_idgen_producto = p.n_gen_producto where dv.n_idgen_venta = " +
      request.query.n_idgen_venta + " and dv.b_pagado = 0"
  );
  response.status(200).json(detalleVenta.rows);
};

module.exports = {
  getusuario,
  getequipo,
  gettipoproducto,
  getproducto,
  getventa,
  getdetalleventa,
  insertarventa,
  insertardetalleventa,
  actualizarpagodetalleventa,
  actualizarhorainicio,
  actualizarhoraventa,
};
