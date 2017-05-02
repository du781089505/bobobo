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



//查询  内容最新10条的
router.get('/juti',function(req,res){
	var idd=req.query.id
     console.log(idd)
    cha(idd,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function cha(idd,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from content where uid=?";
		conn.query(cha_sql,[idd],function(err,result){ 
			console.log("result:"+result)
                console.log(213313123)
			if(err){
				console.log("cha Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			callback(err,result)
		})
	})
}



module.exports = router;