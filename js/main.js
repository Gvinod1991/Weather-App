ar el = $(".odometer");
var glob="cel";

/*od = new Odometer({
  el: el,
  value: 0,

  // Any option (other than auto and selector) can be passed in here
  format: '',
  
});*/
function getLocation() {
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       console.log("error");
      
        $("#loc").html( "Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    $.getJSON("https://crossorigin.me/https://api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude+"&lon="+position.coords.longitude+"&appid=dee7cebd5f6e2671566a0fab0c99944b",function(result)
   {
     name=result["name"]+','+result["sys"].country;
      var temp_kel=result["main"].temp;
      var celc=Math.round(temp_kel-273.15);
      var farc=Math.round(temp_kel * 9/5 - 459.67);
      $(".loc").html(name);
      
        if(glob=="cel"){
          //$("#temp").html(celc);
          setTimeout(function(){
              //od.update(celc) ;
              odometer.innerHTML = celc;
          }, 1000);
          //od.update(celc);
          $("#cel").addClass("active");
          $("#far").removeClass("active");
        }
      else{
         //odometer.innerHTML = 0;
        setTimeout(function(){
               //od.update(far) ;
          odometer.innerHTML = farc;
          }, 1000);
         $("#far").addClass("active");
          $("#cel").removeClass("active");
      }
      
      $(".icon").html("<img src='https://crossorigin.me/https://openweathermap.org/img/w/" + result.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    });
}
getLocation();
$("#cel").on("click",function(){
  getLocation();
  glob="cel";
  
});
$("#far").on("click",function(){
  getLocation();
  glob="far";
});

