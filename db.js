const mysql      = require('mysql');

const pool  = mysql.createPool({
    host     : '120.79.185.179',   // 数据库地址
    user     : 'root',    // 数据库用户
    password : 'zhang1107' ,  // 数据库密码
    database : 'test'  // 选中数据库
  });

const query = (sql,values)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err, connection) {
            if (err) {
              reject( err )
            } else {
              connection.query(sql, values, ( err, rows) => {
      
                if ( err ) {
                  reject( err )
                } else {
                  resolve( rows )
                }
                connection.release()
              })
            }
          })
    });
}

module.exports = { query }