"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api";var e=(new Date).toLocaleString();$("#time").text(e),this.$main=$("main"),App.showMap(),this.$modalcontent=$(".modal-content"),this.$modal=$(".modal"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$(".homePage").on("click",this.homePage.bind(this)),$("#gardens").on("click",this.showMapAgain.bind(this)),$("#addGarden").on("click",this.addGarden.bind(this)),$(".userGardens").on("click",this.userGarden.bind(this)),$("#secretGardens").on("click",this.showMapSecret.bind(this)),$(".editGarden").on("click",this.editGarden.bind(this)),this.$modal.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide(),this.homePage(),$(".helloUser").hide(),this.currentUser()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.showMap()},App.loggedOut=function(){this.$main.html("<h1>Welcome to KEY: unlocking the door to London's Secret Gardens</h1>")},App.register=function(e){e&&e.preventDefault(),this.$modalcontent.html("\n    <h2>Sign Up</h2>\n    <form method='post' action='/register'>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='user[firstName]' placeholder='First name'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='user[lastName]' placeholder='Last name'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='email' name='user[email]' placeholder='Email'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='password' name='user[password]' placeholder='Password'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='password' name='user[passwordConfirmation]' placeholder='Password Confirmation'>\n      </div>\n      <input class='btn btn-primary' type='submit' value='Register'>\n    </form>\n  "),this.$modal.modal("show")},App.login=function(e){e.preventDefault(),this.$modalcontent.html("\n    <h2>Login</h2>\n    <form method='post' action='/login'>\n      <div class='form-group'>\n        <input class='form-control' type='email' name='email' placeholder='Email'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='password' name='password' placeholder='Password'>\n      </div>\n      <input class='btn btn-primary' type='submit' value='Login'>\n    </form>\n  "),this.$modal.modal("show")},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.homePage=function(e){e&&e.preventDefault(),console.log("Home page was clicked"),this.$modalcontent.html("<h1>Welcome to KEY: unlocking the door to London's Secret Gardens</h1>"),this.$modal.modal("show")},App.showMap=function(e){e&&e.preventDefault(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=new google.maps.StyledMapType([{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#ebd5ec"},{visibility:"on"}]}]),o=document.getElementById("map-canvas"),n={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","hybrid","terrain","styled_map"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(o,n),App.map.mapTypes.set("styled_map",t),App.map.setMapTypeId("styled_map")},App.showMapAgain=function(e){e&&e.preventDefault(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=new google.maps.StyledMapType([{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#495421"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{weight:4.1}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#daebc6"},{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{color:"#cae9c2"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#769E72"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#7B8758"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{visibility:"simplified"},{color:"#89d88f"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#ff0000"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#459945"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#d8d8d8"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{visibility:"on"},{color:"#d2f0ef"}]}]),o=document.getElementById("map-canvas"),n={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","hybrid","terrain","styled_map"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(o,n),App.map.mapTypes.set("styled_map",t),App.map.setMapTypeId("styled_map"),App.getGardens()},App.getGardens=function(){this.ajaxRequest(this.apiUrl+"/gardens","get",null,this.loopThroughGardens.bind(this))},App.loopThroughGardens=function(e){console.log(this),console.log(e),$.each(e.gardens,function(e,t){App.createMarkerForGarden(t),console.log(t.name)})},App.createMarkerForGarden=function(e){var t=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:t,map:App.map,animation:google.maps.Animation.DROP});this.getWeatherInfo(e),this.addInfoWindowForGarden(e,o)},App.showMapSecret=function(e){e&&e.preventDefault(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=document.getElementById("map-canvas"),o={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(t,o),App.getGardensSecret()},App.getGardensSecret=function(){this.ajaxRequest(this.apiUrl+"/gardens","get",null,this.loopThroughGardensSecret.bind(this))},App.loopThroughGardensSecret=function(e){console.log(this),console.log(e),$.each(e.gardens,function(e,t){App.createMarkerForGardenSecret(t),console.log(t.name)})},App.createMarkerForGardenSecret=function(e){var t=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:t,map:App.map,icon:"/images/icon.png"});google.maps.event.addListener(o,"mouseover",function(){o.setIcon("../images/blue_flower.ico"),o.setVisible(!0)}),this.getWeatherInfo(e),this.addInfoWindowForGarden(e,o)},App.getWeatherInfo=function(e){$.get("http://api.openweathermap.org/data/2.5/forecast?lat="+e.lat+"&lon="+e.lng+"&mode=JSON&APPID=a7960494b38d3fe6fb56a4880fc25bc8").done(function(e){var t=e.list[0].main.temp,o=e.list[0].weather[0].description;console.log(e),console.log(t,o)})},App.addInfoWindowForGarden=function(e,t){var o=this;google.maps.event.addListener(t,"click",function(){"undefined"!=typeof o.infoWindow&&o.infoWindow.close(),o.infoWindow=new google.maps.InfoWindow({content:"<div class='infoWindow'><header class = 'infoWindowHeader'><h4>"+e.name+"</h4></header><img src='"+e.image+"'></img><p>"+e.description+"</p></div>",maxWidth:"260"}),o.infoWindow.open(o.map,t),o.map.setCenter(t.getPosition()),o.map.setZoom(15)})},App.addGarden=function(e){e&&e.preventDefault(),console.log("Add a garden was clicked"),this.$modalcontent.html("\n    <h2>Add a garden</h2>\n    <form method='post' action='/gardens'>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[name]' placeholder='Garden Name'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[description]' placeholder='Description'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[image]' placeholder='Image'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[lat]' placeholder='Garden latitude'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[lng]' placeholder='Garden Longitude'>\n      </div>\n      <input class='btn btn-primary' type='submit' value='Add Garden'>\n    </form>\n  "),this.$modal.modal("show")},App.userGarden=function(e){var t=this;e&&e.preventDefault(),console.log("user garden to be shown"),this.getToken()&&!function(){var e=t.getToken(),o=e.split(".")[1],n=JSON.parse(window.atob(o)).id;console.log(n),t.ajaxRequest(t.apiUrl+"/gardens","get",null,function(e){t.$modalcontent.html("<ul></ul>"),$.each(e.gardens,function(e,o){n===o.user&&(console.log(o.name),t.$modalcontent.append("\n            <li>"+o.name+"</li>\n            <input class='btn btn-primary editGarden' type='submit' value='Edit Garden'>\n            <input class='btn btn-primary deleteGarden' type='submit' value='Delete Garden'>\n          "),t.$modal.modal("show"))})})}()},App.editGarden=function(e){e&&e.preventDefault(),console.log("edit garden was clicked")},App.handleForm=function(e){e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),o=$(this).attr("method"),n=$(this).serialize();return App.ajaxRequest(t,o,n,function(e){e.token&&App.setToken(e.token),App.loggedInState(),App.$modal.modal("hide")})},App.ajaxRequest=function(e,t,o,n){return $.ajax({url:e,method:t,data:o,beforeSend:this.setRequestHeader.bind(this)}).done(n).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.currentUser=function(){if(this.getToken()){var e=this.getToken(),t=e.split(".")[1],o=JSON.parse(window.atob(t)).id;this.ajaxRequest(this.apiUrl+"/users/"+o,"get",null,function(e){$(".navbar-right").append("\n        <li class='nav-item loggedIn helloUser'>\n          <a class='nav-link' href='#'>Hello "+e.user.firstName+"</a>\n        </li>")})}},App.removeToken=function(){return window.localStorage.clear()},$(App.init.bind(App));