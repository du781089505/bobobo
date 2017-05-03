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


//   点击收藏

router.post('/shoucang',function(req,res){
	console.log(1111111)
     var id=req.body.id;
     var uid=req.body.uid;
	console.log(id,uid)
	getuserZhce(id,uid,function(err,rest){
		if(rest ==""||rest == null){
		save(id,uid,function(err,resl){
				res.send({flag:1})  //注册成功
			})
		}else if(rest!=''||rest!=null){
			res.send({flag:2})   //用户名已存在
		}else{
			res.send({flag:3})    //注册失败
		}
	})
	
})
function getuserZhce(id,uid,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='select * from shoucang where id=? &&  uid=?';
		conn.query(sql,[id,uid],function(err,result){
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
function save(id,uid,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='insert into shoucang(id,uid) value (?,?)';
		conn.query(sql,[id,uid],function(err,result){
			console.log(result)
			if(err){
				console.log("insertUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}
//发布评论

router.post('/pinglun',function(req,res){
	console.log(222222222)
     var id=req.body.id;
     var name=req.body.name;
     var uid=req.body.uid;
     var pcon=req.body.pcon;
	console.log(id,uid,pcon,name)
	ping(id,uid,pcon,name,function(err,result){
				 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
	})
	
})
function ping(id,uid,pcon,name,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='insert into pinglun(id,uid,pcon,name) value (?,?,?,?)';
		conn.query(sql,[id,uid,pcon,name],function(err,result){
			console.log(result)
			if(err){
				console.log("insertUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}

//获取评论的内容
router.get('/pinglun',function(req,res){
	 var uid=req.query.uid;
     console.log(uid)
    lun(uid,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function lun(uid,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from pinglun where uid=?";
		conn.query(cha_sql,[uid],function(err,result){ 
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