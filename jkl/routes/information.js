var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'news',
	port:3306
})



router.get('/list',function(req,res){
       console.log("login")
       	getuserName(function(err,rest){
		if(err){
			res.send(err)
		}else if(rest){
			res.send(rest)
		}
	})	
})

function getuserName(callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='select * from user ';
		conn.query(sql,function(err,result){
//			console.log(result)
			if(err){
				console.log("getAllUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}



module.exports = router;