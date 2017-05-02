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