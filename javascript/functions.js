$(function() {
 
  toggleMenu();

  getData();

});


function toggleMenu(){

	$(".menu-nav").on("click", function(){

		$("#lines").toggleClass("open");

		$(".burger-menu-close").toggleClass("burger-menu-open");

		
	});

}


function getData(){


$("#access").on("click", function(){

        var myLoc;

        $.getJSON('http://ipinfo.io', function(data){

            myLoc=data.loc.split(",");

            // alert(myLoc);

        
        var apiCoords= "http://api.openweathermap.org/data/2.5/weather?lat=37.98&lon=23.72&APPID=eaf69a1d8aef49e96abdc8a9b590ba64&units=metric";

          $.getJSON("apiCoords", function(wd){
        
           alert(wd);

     });   


});

});





	$("#search-btn").on("click", function(){

var city = $("#search-inpt").val();	

var api="http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=eaf69a1d8aef49e96abdc8a9b590ba64&units=metric";

$.getJSON(api, function(data){


	$(".register").slideUp();
	
	$(".city").html(data.name+", "+data.sys.country);

var icon = data.weather[0].icon;

	$("#clouds").attr("src","../images/icons/"+icon+".svg");

	$(".max-temp").html(data.main.temp_max+" °C");

	$(".min-temp").html(data.main.temp_min+" °C");


	setTimeout(function(){

		$(".weather-box").fadeIn().css("display","flex");

		$(".register-bgcolor").toggleClass("main-bgcolor")

		$(".favourites-box").css("visibility","visible");

		$("#logo-img").attr("src","../images/logo2.svg");

		$(".center-wrapp-footer").css("visibility","visible");


	},500);


});


var apiForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&mode=xml&APPID=eaf69a1d8aef49e96abdc8a9b590ba64&units=metric";


$.ajax({

    url: apiForecast,
    context: document.body

    }).done(function (data) {

    var today = data.documentElement.children[3].attributes[0].nodeValue;
   
    var todaydate = new Date(today);
    
    var todaytest = todaydate.getDay();
   
    var j = 0;
   

    for (let i = 0; i < 5; i++) {        
       
        var date2 = new Date(data.firstChild.lastChild.children[j].attributes[0].nodeValue);
       
        var test = date2.getDay();
       
        while (test == todaytest){
            j++;
            date2 = new Date(data.firstChild.lastChild.children[j].attributes[0].nodeValue);
            test = date2.getDay();
        }

        $("#day" + i + "min").html(data.firstChild.lastChild.children[(i * 8)+j].children[4].attributes[2].nodeValue);
        
        $("#day" + i + "max").html(data.firstChild.lastChild.children[(i * 8) + j].children[4].attributes[3].nodeValue);

        var date = (data.firstChild.lastChild.children[(i * 8) + j].attributes[0].nodeValue).substring(0, 10);
        
        var finalDate = new Date(data.firstChild.lastChild.children[(i*8)+j].attributes[0].nodeValue);
        
        var finalDay = finalDate.getDay();
        
        var weekDay = null;
        switch(finalDay) {
            case 0:
                weekDay = "SUN";
                break;
            case 1:
                weekDay = "MON";
                break;
            case 2:
                weekDay = "TUE";
                break;
            case 3:
                weekDay = "WED";
                break;
            case 4:
                weekDay = "THU";
                break;
            case 5:
                weekDay = "FRI";
                break;
            case 6:
                weekDay = "SAT";
                break;
            default:
                weekDay = "SUN";
        }
        $("#day" + i).html(weekDay);
    }
});
	});
};

