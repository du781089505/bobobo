
$(".reg_bar_close").click(function(){
		$("#reg_index").css({"top":"0px"})
	})
	$("#reg_now").click(function(){
		$("#reg_index").css({"top":"-100vh"})
		
	})
    var n=false;
    $(".menu_open").click(function(){
    if(n==false){
    	$(".wrapper_home").css({"left":"250px"})
    	n=true;
    }else{
    	$(".wrapper_home").css({"left":"0px"})
    	n=false;
    }	
	})
    
    $(".queding").click(function(){
    	$(".wrapper_home").css({"left":"0px"})
    	$(".denglu").css({"display":"none"})
    	m=true;
    })
    $(".queding1").click(function(){
    	
    	$(".denglu1").css({"display":"none"})
    	
    })
    $(".queding3").click(function(){
    	
    	$(".zhuce1").css({"display":"none"})
    	
    })
    $(".queding2").click(function(){
    	
    	$(".denglu2").css({"display":"none"})
    	
    })
      var m=true;
    $(".search_open").click(function(){
    if(m){
    	$(".wrapper_home").css({"left":"-250px"})
    	m=false;
    }else{
    	$(".wrapper_home").css({"left":"0px"})
    	m=true;
    }	
	})

    
    var v=true;
    $(".quan1").click(function(){
    	if(v){
    		$(".home_content_left_xia").css({"top":"0px"})
    		v=false;
    	}else{
    		$(".home_content_left_xia").css({"top":"calc(100vh - 100px)"})
    		v=true;
    	}	
    	
    })
   
    $('.ppp').click(function(){
    	
    	nima = $(this).find('p:first-child').html()
    	$.ajax({
			type: "get",
			url: "http://"+ip+"/homepage/chaa",
			data:"conten="+nima,	
			success: function(data) {
//				console.log(data.length)
					var html = ""
						$(".aaaa").html("");
						for(var i = 0; i < data.length; i++) {
						html +="<div class='niye' name="+data[i].uid+"><p>发布人:"+data[i].name+"</p><p>类型 :"+data[i].fenlei+"</p><p>标题:"+data[i].title+"</p><p>内容:"+data[i].content+"</p><p>发布时间:"+data[i].time+"</p></div>"
						}
						$(".aaaa").append(html)
						$(".bbbb").html("")
						$(".aaaa").css("height","calc(100% - 50px)");
						$(".aaaa").css("overflow","auto")
				
			}
		});
    })
///////////////////

               $.ajax({
				type: "get",
				url:"http://"+ip+"/homepage/list",
				success: function(e) {
					
//					console.log(111)
//					console.log(e.flag)
					
					c = 1;
					b = Math.ceil(e.length / 3)
					n=Math.ceil((c-1)*3)
					$(".aa").html(c)
					$(".bb").html(b)
					
					aa();
				}
			})
               var da =[]
			function aa() {
				$.ajax({
					type: "get",
					url: "http://"+ip+"/homepage/jie",
					data: {
						c:n 
					},
					success: function(data) {
//						console.log(data)
						
						var html = ""
						$(".aaaa").html("");
						console.log(data)
						console.log(data[0].uid)
						for(var i = 0; i < data.length; i++) {
								html +="<div class='niye' name="+data[i].uid+"><p>发布人:"+data[i].name+"</p><p>类型 :"+data[i].fenlei+"</p><p>标题:"+data[i].title+"</p><p>内容:"+data[i].content+"</p><p>发布时间:"+data[i].time+"</p></div>"
								
								
						}
						$(".aaaa").append(html)
					}
				})
			}
			
			$(".aaaa").delegate(".niye",'click',function(){
//				console.log($(this).attr("name"))
//console.log("da")
//				console.log(da[$(this).attr("name")].uid)
console.log($(this))
				var id = $(this).attr("name")
				
				console.log(id)
				location.href="#!/details?id="+id
			})
			$(".shang").click(function() {
				c--;
				n=Math.ceil((c-1)*3)
				if(c <= 1) {
					c = 1
				document.querySelector(".shang").setAttribute("disabled", "disabled")	
				}else if(c!=1){
					document.querySelector(".xia").removeAttribute("disabled")
				}
				
				$(".aa").html(c)
				aa()
			})
			$(".xia").click(function() {
				c++;
				n=Math.ceil((c-1)*3)
				if(c >= b) {
					c = b
				    document.querySelector(".xia").setAttribute("disabled", "disabled")
				}else if(c != b){
					  document.querySelector(".shang").removeAttribute("disabled")
				}
				$(".aa").html(c)
				aa()
			})
			
			
				