const proveedor = require('../modelBd/entity/Proveedor'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear un Proveedor
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.crearProveedor = async function (oParam) { 
    const oResponse = {};
    try {
        var seqProveedor = "'" +config.seqProveedor +"'";
        var seq = await utilsDao.obtenetSequencia(seqProveedor);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.CodTipoIdentificacion = oParam.oData.sCodTipoIdentificacion;
        oRegistro.TipoIdentificacion    = oParam.oData.sTipoIdentificacion;
        oRegistro.NumeroIdentificacion  = oParam.oData.sNumeroIdentificacion;
        oRegistro.Nombre                = oParam.oData.sNombre;
        oRegistro.Apellido              = oParam.oData.sApellido;
        oRegistro.RazonSocial           = oParam.oData.sRazonSocial;
        oRegistro.CodDepartamento       = oParam.oData.sCodDepartamento;
        oRegistro.Departamento          = oParam.oData.sDepartamento;
        oRegistro.CodProvincia          = oParam.oData.sCodProvincia;
        oRegistro.Provincia             = oParam.oData.sProvincia;
        oRegistro.CodDistrito           = oParam.oData.sCodDistrito;
        oRegistro.Distrito              = oParam.oData.sDistrito;
        oRegistro.Direccion             = oParam.oData.sDireccion;
        oRegistro.Telefono              = oParam.oData.sTelefono;
        oRegistro.EstadoProveedor       = oParam.oData.iEstadoProveedor; 
         
        const crearRegistroPromise = await proveedor.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: proveedor, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Proveedor 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.actualizarProveedor = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sCodTipoIdentificacion !== undefined){
            oRegistro.CodTipoIdentificacion     = oParam.oData.sCodTipoIdentificacion; 
        }
        if(oParam.oData.sTipoIdentificacion !== undefined){
            oRegistro.TipoIdentificacion     = oParam.oData.sTipoIdentificacion; 
        }
        if(oParam.oData.sNumeroIdentificacion !== undefined){
            oRegistro.NumeroIdentificacion     = oParam.oData.sNumeroIdentificacion; 
        }
        if(oParam.oData.sNombre !== undefined){
            oRegistro.Nombre     = oParam.oData.sNombre; 
        }
        if(oParam.oData.sApellido !== undefined){
            oRegistro.Apellido     = oParam.oData.sApellido; 
        }
        if(oParam.oData.sRazonSocial !== undefined){
            oRegistro.RazonSocial     = oParam.oData.sRazonSocial; 
        }
        if(oParam.oData.sCodDepartamento !== undefined){
            oRegistro.CodDepartamento     = oParam.oData.sCodDepartamento; 
        }
        if(oParam.oData.sDepartamento !== undefined){
            oRegistro.Departamento     = oParam.oData.sDepartamento; 
        }
        if(oParam.oData.sCodProvincia !== undefined){
            oRegistro.CodProvincia     = oParam.oData.CodProvincia; 
        }
        if(oParam.oData.sProvincia !== undefined){
            oRegistro.Provincia     = oParam.oData.sProvincia; 
        }
        if(oParam.oData.sCodDistrito !== undefined){
            oRegistro.CodDistrito     = oParam.oData.sCodDistrito; 
        }
        if(oParam.oData.sDistrito !== undefined){
            oRegistro.Distrito     = oParam.oData.sDistrito; 
        }
        if(oParam.oData.sDireccion !== undefined){
            oRegistro.Direccion     = oParam.oData.sDireccion; 
        }
        if(oParam.oData.sTelefono !== undefined){
            oRegistro.Telefono     = oParam.oData.sTelefono; 
        }
        if(oParam.oData.iEstadoProveedor !== undefined){
            oRegistro.EstadoProveedor     = oParam.oData.iEstadoProveedor; 
        }
       
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await proveedor.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: proveedor, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Proveedor 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarProveedor = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await proveedor.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: proveedor, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}