var mysql = require('mysql');
var dbConfig = require('./db.config');

module.exports = {
	query:function(sql,params,callback){
		let pool = mysql.createPool(dbConfig)
		pool.getConnection((err,connection) => {
			if(err){
				console.error(err)
			}else{
				connection.query(sql,params,function(err,results,fields) {
					if(err){
						console.error(err)
					}else{
            			callback && callback(JSON.stringify(results),JSON.stringify(fields));
					}
					connection.release()
				})
			}
		})

	}
}