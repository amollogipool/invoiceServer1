var mysqlQuery = require('../../config');
/**
 * This function represent to insert record to Vendor master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewInvoice(req, res) {
    var param = req.body;
    var query1 = "INSERT INTO `vendor_master`(`vendorname`, `email`, `phno`, `panno`, `gstno`, `address`, `status`) VALUES ('" + param.vendorname + "','" + param.email + "','" + param.phno + "','" + param.panno + "','" + param.gstno + "','" + param.address + "',1)";
    mysqlQuery.excecuteQuery(query1, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            var query2 = "INSERT INTO `invoice_master` (`vendorid`,`item`,`description`,`price`, `qty`, `discount`, `amount`, `sgst`, `cgst`, `amttax`,`paymthd`,`issuedate`,`duedate`,`paid`,`status`) VALUES (" + result.insertId + ",'" + param.item + "','" + param.description + "','" + param.price + "','" + param.qty + "','" + param.discount + "','" + param.amount + "','" + param.sgst + "','" + param.cgst + "','" + param.amttax + "','" + param.paymthd + "','" + param.issuedate + "','" + param.duedate + "','" + param.paid + "',1)";
            mysqlQuery.excecuteQuery(query2, function (error, result) {
                if (error) {
                    return res.json({
                        error: true,
                        message: error
                    })
                } else {
                    return res.json({
                        error: false,
                        message: "Record Inserted Successfully"
                    });
                }
            });
        }
    });
}

/**
 * This function represent to select all record from Vender Master table
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getAllVender(req, res) {
    var query = "SELECT `vendorid`, `vendorname`, `email`, `phno`, `panno`, `gstno`, `address`, `status` FROM `vendor_master` where  status = 1 ORDER by vendorid DESC";
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}

/**
 * This function represent to select all record from Invoice Master table
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

function getAllInvoice(req, res) {
    var query = "SELECT `id`, `vendorid`, `item`, `description`, `price`, `qty`, `discount`, `amount`, `sgst`, `cgst`, `amttax`, `paymthd`, `issuedate`, `duedate`, `paid` FROM `invoice_master` where status = 1 ORDER by id DESC";
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}

/**
 * This function represent select record from Employee Master table for edit
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

function getVenderInvoiceById(req, res) {
    var id = req.params.id;
    // var query="SELECT * FROM `vendor_master` WHERE vendorid =" + id;
    var query="SELECT * FROM `vendor_master` JOIN invoice_master on vendor_master.vendorid=invoice_master.vendorid WHERE vendor_master.vendorid =" + id;
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                result: result[0]
            });
        }
    })
}

/**
 * This function represent to update the Empoyee Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateVenderById(req, res) {
    var param = req.body;
    var query = "UPDATE vendor_master SET `vendorname`= '" + param.vendorname + "',`email`= '" + param.email + "',`phno`= '" + param.phno + "',`panno`= '" + param.panno + "', `gstno`= '" + param.gstno + "',`address`= '" + param.address + "' WHERE vendorid =" + param.id;
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (!error) {
            return res.json({
                error: false,
                message: "Vendor Updated Successfully"
            });
        } else {
            return res.json({
                error: true,
                message: error
            })
        }
    })
}

/**
 * This function represent to delete record from Employee Master table
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function DeleteVenderById(req, res) {
    var param = req.body;
    var query = "UPDATE `vendor_master` SET `status` = 0 WHERE vendorid=" + param.vendorid;
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                result: result
            })
        }
    })
}

/**
 * This function represent to select all record from Client Master and Invoice Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getCommonData(req, res) {
    var query = "SELECT invoice_master.id, invoice_master.item, invoice_master.price,invoice_master.qty, client_master.clientname,client_master.email,client_master.phno,client_master.gstno FROM invoice_master JOIN client_master on invoice_master.cid=client_master.cid WHERE invoice_master.status=1 and client_master.status=1;"
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            })
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}
module.exports = {
    addNewInvoice: addNewInvoice,
    getAllVender: getAllVender,
    getAllInvoice: getAllInvoice,
    getVenderInvoiceById: getVenderInvoiceById,
    updateVenderById: updateVenderById,
    DeleteVenderById: DeleteVenderById,
    getCommonData: getCommonData,
}