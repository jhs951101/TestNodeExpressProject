const connect = async () => {
    let conn = null;

    try {
        const mysql = require('mysql2/promise');

        var mysqlPool = mysql.createPool({
            host: '(host)',
            user: '(username)',
            password: '(password)',
            database: '(dbname)',
            connectTimeout: 5000,
            connectionLimit: 30
        });

        conn = await mysqlPool.getConnection();
    }
    catch {}

    return conn;
}

const disconnect = (conn) => {
    var success = false;

    try {
        if(conn != null){
            conn.release();
        }

        success = true;
    }
    catch {}

    return success;
}

module.exports = {
    executeQuery: async function(query){
        var result = {};
        result['success'] = false;

        try {
            conn = await connect();
            const [resultset] = await conn.query(query);

            var datas = [];

            for(var i=0; i<resultset.length; i+=1){
                var data = {};

                for(var key in resultset[i]){
                    data[key] = resultset[i][key].toString('utf8');
                }

                datas = [...datas, data];
            }

            result['results'] = datas;
            result['success'] = true;
        }
        catch {}

        disconnect(conn);
        return result;
    }
}