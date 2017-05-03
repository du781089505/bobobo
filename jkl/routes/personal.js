var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();

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

//查询个人信息
router.get('/xun',function(req,res){
	 var username=req.query.username
     console.log(username)
    cha(username,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function cha(username,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from user where username=?";
		conn.query(cha_sql,[username],function(err,result){ 
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


//上传图片
router.post('/upload',function(req,res){
	var form=new formidable.IncomingForm();	//创建IncomingForm对象
	console.log(11111111)
	form.uploadDir="./public/images/";	//设置上传文件存放的文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名    
	//如果form.uploadDir不赋值，它默认的位置是c:\user\用户名\AppData\Local\Temp
	//form.encoding="utf-8"； 设定文件的编码
	form.parse(req, function(error,fields,files){
//	    console.log(files)
		for(var i in files){
				console.log(3333333)
			var file=files[i]
			var fName=(new Date()).getTime()
			switch(file.type){
				case "image/jpeg":
				    fName=fName+".jpg";
				    break;
				case "image/png":
				    fName=fName+".png";
				    break;
				case "image/gif":
				    fName=fName+".gif";
				    break;
			}
			 
			var newPath="public/images/"+fName;
			fs.renameSync(file.path,newPath);//重命名
			res.send(fName)
		}
	})
})


//往后台传

router.post('/chuantu',function(req,res){
	console.log(21312312313)
    var id=req.body.id;
	var img=req.body.img;
	console.log(id,img)
		save(id,img,function(err,result){
	      if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
   });
})
function save(img,id,callback){//接受参数  ，自己命名的可以随便写
	pool.getConnection(function(err,conn){
		var sql="insert into user(img) values(?) where id=?"//这儿是数据库中的列名
	conn.query(sql,[img,id],function(err,result){//这儿是接受参数，自己所起的名字
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




//修改个人信息

router.get('/xiugaihou',function(req,res){
	var id=req.query.id //这儿的 query是后台 get 的用法  并且 query后面的id是自己在页面中冒号前面的
	console.log(id) 
	xiu(id,function(err,result){ //这儿是往下面传参的
	 if(err){
			res.send(err);
		}else if(result){
			console.log('>>>'+result);
			res.send(result)
		}
	 })
})

function xiu(id,callback){//这儿接收上面的传参
	pool.getConnection(function(err,conn){
		var xiu_sql='select * from user where id = ?';
		conn.query(xiu_sql,[id],function(err,result){ 
			console.log("result:"+result)
			if(err){
				console.log("xiu Error:"+err.message);
				return;
			}
			conn.release();  //释放连接
			callback(err,result)
		})
	})
}



//改完后      后台改     前面的页面改


router.post('/xiugaihou',function(req,res){
	var id=req.body.id;//这儿的 body是后台post 的用法  并且 body后面的id是自己在页面中冒号前面的
	var name=req.body.name;
	var password=req.body.password;
	var tel=req.body.tel;
	var qq=req.body.qq;//时间不能修改
	var age=req.body.age;
	console.log(id)
	console.log(name,password,tel,qq,age)
	gai(id,name,password,tel,qq,age,function(err,result){ //这儿是往下面传参的
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

function gai(id,name,password,tel,qq,age,callback){//这儿接收上面的传参
	pool.getConnection(function(err,conn){
		var gai_sql='update user set name=?,password=?,tel=?,qq=?,age=? where id = ?';
		conn.query(gai_sql,[name,password,tel,qq,age,id],function(err,result){ 
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




router.get('/yifa',function(req,res){
	 var id=req.query.id;
	 console.log(11111111111111111)
     console.log(id)
    yi(id,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function yi(id,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from content where id=?";
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


///   获取我已经收藏的uid
router.get('/yicang',function(req,res){
	 var id=req.query.id;
	 console.log(222222222222222)
     console.log(id)
    cang(id,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function cang(id,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from shoucang where id=?";
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


router.get('/yican',function(req,res){
	 var uid=req.query.uid;
	 console.log(222222222222222)
     console.log(uid)
    can(uid,function(err,result){
    	 if(err){
			res.send(err);
		}else if(result){
			console.log('ttototo'+result);
			res.send(result)
		}
    })
})


function can(uid,callback){
	pool.getConnection(function(err,conn){
		var cha_sql="select * from content where uid=?";
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


/* GET home page. */


module.exports = router;