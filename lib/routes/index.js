const express = require('express');
const router = express.Router();

const proveedorRxBusiness        = require('../business/ProveedorRxBusiness');  
const proveedorTxBusiness        = require('../business/ProveedorTxBusiness');  

module.exports = function(){

    //proveedor
    router.post('/', proveedorTxBusiness.registrarProveedor); 
    router.put('/:id', proveedorTxBusiness.actualizarProveedor); 
    router.delete('/', proveedorTxBusiness.eliminarProveedor);  
    router.get('/', proveedorRxBusiness.consultarProveedor); 
 
    return router;
}

