const proveedorRxDao = require('../dao/ProveedorRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar proveedor
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.consultarProveedor = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroCliente = {};
		 oFiltroCliente.sRazonSocial  = req.query.sRazonSocial;
		 oFiltroCliente.iId 	  		= req.query.iId; 
		 var consultarProveedorResponse =  await proveedorRxDao.consultarProveedor(oFiltroCliente);
		 if(consultarProveedorResponse.iCode !== 1){
			throw new Error(consultarProveedorResponse.iCode + "||" + consultarProveedorResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarProveedorResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 