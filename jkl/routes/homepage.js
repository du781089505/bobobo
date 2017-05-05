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



    //获取列表信息  获取的是内容的列表
    
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
		var sql ='select * from content ';
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



    //登录   个人信息的
    
router.post('/login',function(req,res){
       console.log("login-----")
	var username = req.body.username;
	var password = req.body.password
  console.log(username,password)
	getLogin(username,function(err,rest){
		if(rest.length==0){
			res.send({flag:2})     //账号不存在
		}else if(rest.length>0){
			console.log("ddddddd")
			if(password ==rest[0].password){
				req.session.uname = username;
				res.send({flag:1})  //登陆成功
			}else if(password !=rest[0].password){
				res.send({flag:3})   //密码不正确
			}
		}else{
			res.send({flag:4})
		}
		
	})
	
})
function getLogin(uname,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='select * from user where username =?';
		conn.query(sql,[uname],function(err,result){
			console.log(result)
			if(err){
//				console.log("getAllUser Eroor:"+err.message)
				return
			}
			conn.release()  //释放连接
			callback(err,result)
		})
	})
}


//注册    个人信息的

router.post('/zhuce',function(req,res){
	console.log(1111111)
	var username = req.body.username;
	var password = req.body.password;
	var img = req.body.img;
	var tel = req.body.tel;
	var qq = req.body.qq;
	var name= req.body.name;
	var age = req.body.age;
	var status = req.body.status;
	console.log(username,password,tel,qq,name,age,status,img)
	getuserZhce(username,function(err,rest){
		if(rest ==""||rest == null){
			save(username,password,tel,qq,name,age,status,img,function(err,resl){
				console.log('dddd'+resl)
				res.send({flag:1})  //注册成功
			})
		}else if(rest!=''||rest!=null){
			res.send({flag:2})   //用户名已存在
		}else{
			res.send({flag:3})    //注册失败
		}
	})
	
})
function getuserZhce(uname,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='select * from user where username =?';
		conn.query(sql,[uname],function(err,result){
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
function save(username,pad,tel,qq,name,age,status,img,callback){
	pool.getConnection(function(err,conn){ //获取连接
		var sql ='insert into user(username,password,tel,qq,name,age,status,img) value (?,?,?,?,?,?,?,?)';
		conn.query(sql,[username,pad,tel,qq,name,age,status,img],function(err,result){
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

//修改 个人信息

router.post('/xiugai',function(req,res){
	var id=req.body.id;//这儿的 body是后台post 的用法  并且 body后面的id是自己在页面中冒号前面的
	var password=req.body.password;
	var tel=req.body.tel;
	var qq=req.body.qq;
	var name=req.body.name;
	var age=req.body.age;
	console.log(id)
	console.log(password,tel,qq,name,age)
	gai(id,password,tel,qq,name,age,function(err,result){ //这儿是往下面传参的
        if(err){
			res.send(err);
		}
        if(result.changedRows > 0){//判断修改的行数     如数据没有修改changedRows为0
			res.send({flag:1})
		}else if(err){
			res.send({flag:2})
		}else {
			res.send({flag:3})
		}
		
	 })
})

function gai(id,password,tel,qq,name,age,callback){//这儿接收上面的传参
	pool.getConnection(function(err,conn){
		var gai_sql='update userbiao set password=?,tel=?,qq=?,name=?,age=? where id = ?';
		conn.query(gai_sql,[password,tel,qq,name,age,id],function(err,result){ 
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




//查询  内容最新10条的
router.get('/cha',function(req,res){
	var content=0;
	var cott=10;
     console.log(content)
    cha(content,cott,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function cha(con,cott,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from content order by uid desc limit ?,?";
		conn.query(cha_sql,[con,cott],function(err,result){ 
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

//查询个人信息
router.get('/ca',function(req,res){
	 var id=req.query.id
     console.log(id)
    ca(id,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function ca(id,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from user where id=?";
		conn.query(cha_sql,[id],function(err,result){ 
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


//  关键字搜索的  搜索内容的

router.get('/search',function(req,res){
	var conten=req.query.conppp;
     console.log(conten)
     console.log(111111111111)
    search(conten,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function search(conp,callback){
	pool.getConnection(function(err,conn){
		var search_sql="select * from content where title like ? or content like ?";
		conn.query(search_sql,['%'+conp+'%','%'+conp+'%'],function(err,result){ 
			console.log("result:"+result)
                console.log(213313123)
			if(err){
				console.log("search Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			callback(err,result)
		})
	})
}


/////////////////////////查询

router.get('/chaa',function(req,res){
	var cp=req.query.conten;
     console.log(cp)
    chaa(cp,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function chaa(cp,callback){
	pool.getConnection(function(err,conn){
		var chaa_sql='select * from content where fenlei=?' ;
		conn.query(chaa_sql,[cp],function(err,result){ 
			console.log("result:"+result)
                console.log(1111111111)
			if(err){
				console.log("chaa Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			callback(err,result)
		})
	})
}

///  分页


router.get('/jie',function(req,res){
	var c=Number(req.query.c);
	var d=3
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

///////细致分页


router.get('/jiee',function(req,res){
	var aa=req.query.das
	var c=Number(req.query.c);
	var d=3
	console.log(aa,c,d)
	console.log("into jie...");
	jiell(aa,c,d,function(err,results){
		if(err){
			res.send(err);
		}else if(results){
			console.log('>>>'+results);
			res.send(results)
		}
	})
})


function jiell(aa,c,d,callback){
	console.log("$2345678")
	pool.getConnection(function(err,conn){
		var jie_sql='select * from content where fenlei= ? limit ?,?';
		conn.query(jie_sql,[aa,c,d],function(err,results){
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





/* GET home page. */
module.exports = router;
