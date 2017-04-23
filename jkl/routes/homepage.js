var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'news',
	port:3306
})
/* GET home page. */

         //获取列表信息
  
router.get('/list',function(req,res){
//     console.log("login")
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
//				console.log("getAllUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}
    //登录
    
 router.post('/login',function(req,res){
       console.log("login")
	var username = req.body.username;
	var password = req.body.password;
    var name = req.body.name;
    var age = req.body.age;
    var tel = req.body.tel;
    var qq = req.body.qq;
    
	getlogin(username,function(err,rest){
		if(rest.length==0){
			res.send({flag:2})
		}else if(rest.length>0){
			if(password ==rest[0].password){
				res.send({flag:1})
			}else if(password !=rest[0].password){
				res.send({flag:3})
			}
		}else{
			res.send({flag:4})
		}
		
	})
	
})
function getlogin(uname,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='select * from user where username =?';
		conn.query(sql,[uname],function(err,result){
//			console.log(result)
			if(err){
//				console.log("getAllUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}

//注册

router.post('/zhuce',function(req,res){

	var username = req.body.username;
	var password = req.body.password
	var name = req.body.name;
    var age = req.body.age;
    var tel = req.body.tel;
    var qq = req.body.qq;
	
	getzhce(username,function(err,rest){
		if(rest ==""||rest == null){
			save(username,password,tel,qq,name,age,function(err,resl){
				console.log('dddd'+resl)
				res.send({flag:1})
			})
		}else if(rest!=''||rest!=null){
			res.send({flag:2})
		}else{
			res.send({flag:3})
		}
	})
	
})
    //查询是否重名
function getzhuce(uname,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='select * from user where username =?';
		conn.query(sql,[uname],function(err,result){
//			console.log(result)
			if(err){
//				console.log("getAllUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}
function save(name,pad,tel,qq,name,age,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='insert into user(username,password,tel,qq,name,age) value (?,?,?,?,?,?)';
		conn.query(sql,[name,pad,tel,qq,name,age],function(err,result){
			console.log(result)
			if(err){
//				console.log("insertUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}

module.exports = router;
