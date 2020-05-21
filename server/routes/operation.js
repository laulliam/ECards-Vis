
var MysqlPool = require('./mysql_pool');

var mysqlPool = new MysqlPool();
var pool = mysqlPool.getPool();

module.exports = {
    query: function (sql,res) {
        pool.getConnection(function(err, connection) {
            connection.query(sql, function(err, result) {
                if(err){
                    console.log(err);
                }
                res(result);
                connection.release();
            });
        });
    }
};

