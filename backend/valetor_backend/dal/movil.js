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
    console.log(
      "select * from gen_venta where n_idgen_equipo =" +
        request.body.n_idgen_equipo
    );

    let queryValidaSql = await pool.query(
      "select * from v_venta where n_idgen_equipo =" +
        request.body.n_idgen_equipo
    );

    if (queryValidaSql.rowCount == 0) {
      let scriptSQL =
        "insert into gen_venta (n_idseg_vendedor, n_idgen_equipo, b_pagado, n_borrado, n_id_usercrea, d_fechacrea)values(" +
        request.body.n_idseg_vendedor +
        "," +
        request.body.n_idgen_equipo +
        ",0,0," +
        request.body.n_idseg_vendedor +
        ",now()) returning *";
      console.log(scriptSQL);
      await pool.query(scriptSQL);
    }

    let venta = await pool.query(
      "select * from v_venta where n_idgen_equipo = " +
        request.body.n_idgen_equipo
    );

    response.status(200).json({
      data: venta.rows,
      flag: true,
      mensaje: "Venta registrada correcta",
    });
  } catch (error) {
    console.log(error);
    response.status(200).json({
      data: venta.rows,
      flag: false,
      mensaje: "error",
    });
  }
};

const agregarhoras = async (request, response) => {
  try {
    let scriptSQL =
    "insert into gen_hora_venta (n_idgen_venta, n_cantidad,n_precio, n_subtotal, b_pagado, n_borrado, n_id_usercrea, d_fechacrea)values(" +
    request.body.n_idgen_venta +
    "," +
    request.body.n_cantidad + "," + request.body.n_precio +
    ",0,0,0," +
    request.body.n_idseg_vendedor +
    ",now()) returning *";
     console.log(scriptSQL);
    let queryUsuario = await pool.query(scriptSQL);
    if (queryUsuario.rowCount > 0) {
      response.status(200).json({
        data: queryUsuario.rows,
        flag: true,
        mensaje: "Hora registrada correcta",
      });
    } else {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "No se registró la hora",
      });
    }
  } catch (error) {
    response.status(200).json({
      data: null,
      flag: false,
      mensaje: "Error al registrar la hora",
    });
  }
};

const actualizarhorainicio = async (request, response) => {
  try {
    let scriptSQL =
      "update gen_venta set d_fecha = now(), n_id_usermodi = " +
      request.body.n_idseg_vendedor +
      ",d_fechamodi = now() where n_idgen_venta = " +
      request.body.n_idgen_venta +
      " returning *";
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

const actualizarpago = async (request, response) => {
    try {
      let scriptSQL =
        "update gen_venta set b_pagado = 1, n_id_usermodi = " +
        request.body.n_idseg_vendedor +
        ",d_fechamodi = now() where n_idgen_venta = " +
        request.body.n_idgen_venta +
        " returning *";
      console.log(scriptSQL);
      let queryUsuario = await pool.query(scriptSQL);
      if (queryUsuario.rowCount > 0) {
        response.status(200).json({
          data: queryUsuario.rows,
          flag: true,
          mensaje: "Pago actualizado correctamente",
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
        mensaje: "Error al actualizar el pago",
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
  let getequipo = await pool.query("select * from v_equipo");
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

const getventahistorica = async (request, response) => {
  console.log("getproducto");
  let producto = await pool.query(
    "select * from v_ventahistorico");
  response.status(200).json(producto.rows);
};

const getventahistoricafecha = async (request, response) => {
  console.log("getproducto");
  let ventas = await pool.query(
    "select * from v_ventahistorico where d_fecha = " + request.query.d_fecha);
  response.status(200).json(ventas.rows);
};


const getventa = async (request, response) => {
  console.log("getventa");
  let venta = await pool.query(
    "select * from v_venta where n_idgen_equipo = " +
      request.query.n_idgen_equipo
  );
  response.status(200).json(venta.rows);
};

const getdetalleventa = async (request, response) => {
  console.log("getdetalleventa");
  let detalleVenta = await pool.query(
    "select * from v_detalleventa where n_idgen_venta = " +
      request.query.n_idgen_venta 
  );
  response.status(200).json(detalleVenta.rows);
};

const gethoraventa = async (request, response) => {
    console.log("gethoraventa");
    let detalleVenta = await pool.query(
      "select * from v_hora where n_idgen_venta = " +
        request.query.n_idgen_venta 
    );
    response.status(200).json(detalleVenta.rows);
  };

  const anularHora = async (request, response) => {
    try {
      let scriptSQL =
        "update gen_hora_venta set n_borrado = 1 where n_idgen_hora_venta = " + request.body.n_idgen_hora_venta + " returning *";
      console.log(scriptSQL);
      let queryUsuario = await pool.query(scriptSQL);
      if (queryUsuario.rowCount > 0) {
        response.status(200).json({
          data: queryUsuario.rows,
          flag: true,
          mensaje: "la hora se anuló correctamente",
        });
      } else {
        response.status(200).json({
          data: null,
          flag: false,
          mensaje: "No se anuló la hora",
        });
      }
    } catch (error) {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "Error al anular la hora",
      });
    }
  };

  const anularproducto = async (request, response) => {
    try {
      let scriptSQL =
        "update gen_detalle_venta set n_borrado = 1 where n_idgen_detalle_venta = " + request.body.n_idgen_detalle_venta + " returning *";
      console.log(scriptSQL);
      let queryUsuario = await pool.query(scriptSQL);
      if (queryUsuario.rowCount > 0) {
        response.status(200).json({
          data: queryUsuario.rows,
          flag: true,
          mensaje: "la hora se anuló correctamente",
        });
      } else {
        response.status(200).json({
          data: null,
          flag: false,
          mensaje: "No se anuló la hora",
        });
      }
    } catch (error) {
      response.status(200).json({
        data: null,
        flag: false,
        mensaje: "Error al anular la hora",
      });
    }
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
  actualizarpago,
  agregarhoras,
  gethoraventa,
  anularHora,
  anularproducto,
  getventahistorica,
  getventahistoricafecha
};
