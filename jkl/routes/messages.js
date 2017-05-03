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
       console.log("112312")     
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
		var sql ='select * from content';
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



////分页


router.get('/jie',function(req,res){
	var c=Number(req.query.c);
	var d=7
	console.log(c,d)
	console.log("into jie...");
	jiel(c,d,function(err,results){
		if(err){
			res.send(err);
		}else if(results){
			console.log('>>>'+results);
			res.send(results)
		}
	})
})


function jiel(c,d,callback){
	console.log("$2345678")
	pool.getConnection(function(err,conn){
		var jie_sql='select * from content limit ?,?';
		conn.query(jie_sql,[c,d],function(err,results){
			console.log(c,d)
			console.log("results:"+results)
			if(err){
				console.log("jiel Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			callback(err,results)
		})
	})
}


//删除

router.get('/shanchu',function(req,res){
	var id=req.query.uid;
    shan(id,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('>>>'+result);
			res.send({flag:1})
		}
    })
})



function shan(id,callback){
	pool.getConnection(function(err,conn){
		var shan_sql='delete from content where uid = ?';
		conn.query(shan_sql,[id],function(err,result){ 
			console.log("result:"+result)
			if(err){
				console.log("gai Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			callback(err,result)
		})
	})
}


module.exports = router;