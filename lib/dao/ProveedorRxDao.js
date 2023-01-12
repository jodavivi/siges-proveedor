const proveedor = require('../modelBd/entity/Proveedor');  

/**
 * @description Función que permite consultar los proveedores
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.consultarProveedor = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sNumeroIdentificacion !== undefined){
            oFiltroLista.where.NumeroIdentificacion  = oFiltro.sNumeroIdentificacion; 
        } 
        if(oFiltro.sCodEmpresa !== undefined){
            oFiltroLista.where.CodEmpresa  = oFiltro.sCodEmpresa; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        } 
         
        oFiltroLista.where.EstadoId     = 1; 
        const consultarListaResponse = await  proveedor.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del proveedor'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: proveedor, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}