const proveedorTxDao	 = require('../dao/ProveedorTxDao');  
const utils 	     	 = require('../utils/utils'); 
 
/**
 * @description Función que permite registrar proveedor
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.registrarProveedor = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos Almacen
		 var oRegistroCliente = {};
		 oRegistroCliente.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroCliente.oData		  	 = oRequest.oData; 
		 const crearProveedorResponse = await  proveedorTxDao.crearProveedor(oRegistroCliente);
		 if(crearProveedorResponse.iCode !== 1){
			throw new Error(crearProveedorResponse.iCode + "||" + crearProveedorResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearProveedorResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar proveedor
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.actualizarProveedor = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos Area
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarProveedorResponse = await  proveedorTxDao.actualizarProveedor(oRegistro);
		if(actualizarProveedorResponse.iCode !== 1){
		   throw new Error(actualizarProveedorResponse.iCode + "||" + actualizarProveedorResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarProveedorResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar Proveedor
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarProveedor = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarProveedorResponse = await  proveedorTxDao.eliminarProveedor(oRegistro);
			if(eliminarProveedorResponse.iCode !== 1){
				throw new Error(eliminarProveedorResponse.iCode + "||" + eliminarProveedorResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

