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



router.post('/tianjia',function(req,res){
	console.log(21312312313)
	var title=req.body.title;
	var content=req.body.content;//后面的password是页面上的，前面的password是自己在后台重新命名的
	var time=req.body.time;
	var fenlei=req.body.fenlei;
	console.log(title,content,time,fenlei)
	save(title,content,time,fenlei,function(err,result){ //这儿是往下面传参的
		     if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
	})
})

function save(title,content,time,fenlei,callback){//接受参数  ，自己命名的可以随便写
	pool.getConnection(function(err,conn){
		var sql="insert into content(title,content,time,fenlei) values(?,?,?,?)"//这儿是数据库中的列名
	conn.query(sql,[title,content,time,fenlei],function(err,result){//这儿是接受参数，自己所起的名字
			if(err){
				console.log("getAllUsers Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			console.log("11111")
			callback(err,result)
	})
	})
	
}



module.exports = router;