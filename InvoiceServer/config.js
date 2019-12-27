var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'invoicedb',
    debug: false
});

/**
 * This function represent database connection
 * @param {*} query 
 * @param {*} callback 
 * @author Amol Dhamale
 */
function handle_database(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback({ "code": 100, "status": "Error in connection database" }, null);
            return;
        }
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                callback(null, rows);
            }
        });

        connection.on('error', function (err) {
            callback({ "code": 100, "status": "Error in connection database" }, null);
            return;
        });
    })
}

function handle_database_await_query(query) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve({ "code": 100, "status": "Error in connection database" }, null);
                return;
            }

            connection.query(query, function (err, rows) {
                connection.release();
                if (!err) {
                    resolve(null, rows);
                }
            });

            connection.on('error', function (err) {
                resolve({ "code": 100, "status": "Error in connection database" }, null);
                return;
            });
        })
    })
}

module.exports = {
    excecuteQuery: handle_database,
    excecuteAwaitQuery: handle_database_await_query,
}
