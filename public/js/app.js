"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="https://bloom-secret-garden.herokuapp.com/api";var e={weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"},t=(new Date).toLocaleTimeString("en-us",e);console.log(t),$("#time").text(t),$(".currentTime").text(t),this.$main=$("main"),this.$modalcontent=$(".modal-content"),this.$modal=$(".modal"),App.showMap(),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$("#gardens").on("click",this.showMapAgain.bind(this)),$(".userGardens").on("click",this.userGarden.bind(this)),$("#secretGardens").on("click",this.showMapSecret.bind(this)),$("body").on("click",".editGarden",this.editGarden.bind(this)),this.$modal.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.loggedInState=function(){$(".navigationBar").css("background-color","#CEECAC"),$(".bloomIcon").css("background-color","#95D051"),$(".bloomIcon").css("margin-right","15px"),$(".homePage").on("click",App.instructionPage.bind(this)),$(".loggedIn").show(),$(".loggedOut").hide(),App.showMapLoggedIn(),$(".helloUser").hide(),this.currentUser()},App.loggedOutState=function(){$(".navigationBar").css("background-color","#F596A5"),$(".bloomIcon").css("background-color","#f16186"),$(".homePage").on("click",App.homePage.bind(this)),$(".loggedIn").hide(),$(".loggedOut").show(),this.showMap()},App.loggedOut=function(){this.$main.html("<h1>BLOOM</h1>")},App.register=function(e){e&&e.preventDefault(),this.$modalcontent.html("\n    <div class='signInModal'>\n    <h2>Sign Up</h2>\n    <form method='post' action='/register' class='signInForm'>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='user[firstName]' placeholder='First name'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='user[lastName]' placeholder='Last name'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='email' name='user[email]' placeholder='Email'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='password' name='user[password]' placeholder='Password'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='password' name='user[passwordConfirmation]' placeholder='Password Confirmation'>\n      </div>\n      <input class='btn btn-primary logInButton' type='submit' value='Register'>\n    </form>\n    </div>\n  "),this.$modal.modal("show")},App.login=function(e){e.preventDefault(),this.$modalcontent.html("\n    <div class='logInModal'>\n    <form method='post' action='/login' class='logInForm'>\n      <div class='form-group'>\n        <input class='form-control' type='email' name='email' placeholder='Email'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='password' name='password' placeholder='Password'>\n      </div>\n      <input class='btn btn-primary logInButton' type='submit' value='Login'>\n    </form></div>\n  "),this.$modal.modal("show")},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.homePage=function(e){e&&e.preventDefault(),console.log("Home page was clicked"),this.$modalcontent.html("<div class='mainImage'><h1>Bloom</h1><h6>A GUIDE TO LONDON'S SECRET GARDENS</h6><p>LOG IN OR SIGN UP</p></div>"),this.$modal.modal("show")},App.instructionPage=function(e){e&&e.preventDefault(),console.log("instructions page was clicked"),this.$modalcontent.html("<div class='instructions'><h1>Bloom</h1><p>Welcome to Bloom, the exclusive guide to London's hidden gardens and parks. Select 'Secret View' to find the gardens by moving the mouse.  Select 'Gardens' to find a secret garden near you. Double click on the map to share your secret garden.</p></div>"),this.$modal.modal("show")},App.showMap=function(e){e&&e.preventDefault(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=new google.maps.StyledMapType([{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#F9D6DB"},{visibility:"on"}]}]),o=document.getElementById("map-canvas"),n={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","hybrid","terrain","styled_map"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(o,n),App.map.mapTypes.set("styled_map",t),App.map.setMapTypeId("styled_map")},App.showMapLoggedIn=function(e){e&&e.preventDefault(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=new google.maps.StyledMapType([{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#495421"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{weight:4.1}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#daebc6"},{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{color:"#cae9c2"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#769E72"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#7B8758"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{visibility:"simplified"},{color:"#ABE06E"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#ff0000"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#459945"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#d8d8d8"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{visibility:"on"},{color:"#d2f0ef"}]}]),o=document.getElementById("map-canvas"),n={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","hybrid","terrain","styled_map"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(o,n),App.map.mapTypes.set("styled_map",t),App.map.setMapTypeId("styled_map")},App.showMapAgain=function(e){e&&e.preventDefault(),console.log(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=new google.maps.StyledMapType([{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#495421"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{weight:4.1}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#daebc6"},{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{color:"#cae9c2"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#769E72"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#7B8758"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{visibility:"simplified"},{color:"#ABE06E"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#ff0000"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#459945"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#d8d8d8"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{visibility:"on"},{color:"#d2f0ef"}]}]),o=document.getElementById("map-canvas"),n={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,disableDoubleClickZoom:!0,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","hybrid","terrain","styled_map"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(o,n),App.map.mapTypes.set("styled_map",t),App.map.setMapTypeId("styled_map"),App.map.addListener("dblclick",function(e){var t=e.latLng;App.addGarden.bind(App)(t)}),App.getGardens()},App.getGardens=function(){this.ajaxRequest(this.apiUrl+"/gardens","get",null,this.loopThroughGardens.bind(this))},App.loopThroughGardens=function(e){console.log(this),console.log(e),$.each(e.gardens,function(e,t){App.createMarkerForGarden(t),console.log(t.name)})},App.createMarkerForGarden=function(e){var t=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:t,map:App.map,animation:google.maps.Animation.DROP,icon:"/images/rose.png"});this.getWeatherInfo(e,o)},App.getWeatherInfo=function(e,t){var o=this;console.log(t),$.get("http://api.openweathermap.org/data/2.5/forecast?lat="+e.lat+"&lon="+e.lng+"&mode=JSON&&units=metric&APPID=a7960494b38d3fe6fb56a4880fc25bc8").done(function(n){var a=n.list[0].main.temp,l=n.list[0].weather[0].description,i=n.list[1].main.temp,s=n.list[1].weather[0].description,r=n.list[2].main.temp,p=n.list[2].weather[0].description,d=n.list[3].main.temp,m=n.list[3].weather[0].description,c=n.list[4].main.temp,g=n.list[4].weather[0].description;o.addInfoWindowForGarden(e,t,l,a,s,i,p,r,m,d,g,c)})},App.addInfoWindowForGarden=function(e,t,o,n,a,l,i,s,r,p,d,m){var c=this;google.maps.event.addListener(t,"click",function(){"undefined"!=typeof c.infoWindow&&c.infoWindow.close(),c.infoWindow=new google.maps.InfoWindow({content:"<div class='infoWindow'><h6>"+e.name+'</h6><div class="gardenImage"><img src=\''+e.image+'\'></img></div><div class="gardenDescription"><p>'+e.description+"</p></div><div class='weather'><h6>Weather</h6><p>Now, "+n+"°, "+o+". +3hrs, "+l+"°, "+a+". +6hrs, "+s+"°, "+i+". +9hrs, "+p+"°, "+r+". +12hrs, "+m+"°, "+d+"</p></div></div>",maxWidth:"400"}),c.infoWindow.open(c.map,t),c.map.setCenter(t.getPosition()),c.map.setZoom(15)})},App.showMapSecret=function(e){e&&e.preventDefault(),console.log("Gardens was clicked"),this.$main.html("<div id='map-canvas'></div>");var t=new google.maps.StyledMapType([{stylers:[{hue:"#AEDD77"},{saturation:10}]},{featureType:"water",stylers:[{color:"#effefd"}]},{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]}]),o=document.getElementById("map-canvas"),n={zoom:13,center:new google.maps.LatLng(51.5117321,(-.1254584)),mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,disableDoubleClickZoom:!0,mapTypeControlOptions:{mapTypeIds:["roadmap","satellite","hybrid","terrain","styled_map"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}};App.map=new google.maps.Map(o,n),App.map.mapTypes.set("styled_map",t),App.map.setMapTypeId("styled_map"),App.getGardensSecret()},App.getGardensSecret=function(){this.ajaxRequest(this.apiUrl+"/gardens","get",null,this.loopThroughGardensSecret.bind(this))},App.loopThroughGardensSecret=function(e){console.log(this),console.log(e),$.each(e.gardens,function(e,t){App.createMarkerForGardenSecret(t),console.log(t.name)})},App.createMarkerForGardenSecret=function(e){var t=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:t,map:App.map,icon:"/images/icon.png"});google.maps.event.addListener(o,"mouseover",function(){o.setIcon("../images/roseicon.png"),o.setVisible(!0)}),this.getWeatherInfo(e,o)},App.addGarden=function(e){console.log("Add a garden was clicked"),this.$modalcontent.html("\n    <div class=\"addGardenModal\"><h2>Add a garden</h2>\n    <form method='post' action='/gardens'>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[name]' placeholder='Garden Name'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[description]' placeholder='Description'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[image]' placeholder='Image'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[lat]' placeholder='Garden latitude' value='"+e.lat()+"'>\n      </div>\n      <div class='form-group'>\n        <input class='form-control' type='text' name='garden[lng]' placeholder='Garden Longitude' value='"+e.lng()+"'>\n      </div>\n      <input class='btn btn-primary addGardenButton' type='submit' value='Add Garden'>\n    </form></div>\n  "),this.$modal.modal("show")},App.userGarden=function(e){var t=this;e&&e.preventDefault(),console.log("user garden to be shown"),this.getToken()&&!function(){var e=t.getToken(),o=e.split(".")[1],n=JSON.parse(window.atob(o)).id;console.log(n),t.ajaxRequest(t.apiUrl+"/gardens","get",null,function(e){t.$modalcontent.html('<div class="userGardenModal"><ul class="userGardenUl"></ul></div>'),$.each(e.gardens,function(e,o){n===o.user&&(console.log(o),$("ul.userGardenUl").append('\n            <div class="userGardenCollection"><li>'+o.name+'</li>\n            <img class="userGardenImage" src='+o.image+"></li>\n            <input data-identifier='"+o._id+"' class='btn btn-primary editGarden editGarden' type='submit' value=' Edit '>\n            <form method='delete' action='/gardens/"+o._id+"'><input class='btn btn-primary btn-danger deleteGarden' type='submit' value='Delete'></form></div>\n          "),t.$modal.modal("show"))})})}()},App.editGarden=function(e){e&&e.preventDefault(),console.log("edit garden was clicked"),this.ajaxRequest(this.apiUrl+"/gardens/"+e.target.getAttribute("data-identifier"),"get",null,function(e){App.$modalcontent.html("\n      <div class=\"editGardenModal\"><h2>Edit garden</h2>\n      <form method='post' action='/gardens/"+e.garden._id+"'>\n        <input type='hidden' name='_method' value='put'>\n        <div class='form-group'>\n          <input class='form-control' type='text' name='garden[name]' value='"+e.garden.name+"'>\n        </div>\n        <div class='form-group'>\n          <input class='form-control' type='text' name='garden[description]' value='"+e.garden.description+"'>\n        </div>\n        <div class='form-group'>\n          <input class='form-control' type='text' name='garden[image]' value='"+e.garden.image+">'\n        </div>\n        <div class='form-group'>\n          <input class='form-control' type='text' name='garden[lat]' value='"+e.garden.lat+">'\n        </div>\n        <div class='form-group'>\n          <input class='form-control' type='text' name='garden[lng]' value='"+e.garden.lng+"'>\n        </div>\n        <input class='btn btn-primary editGardenButton' type='submit' value='Edit Garden'>\n      </form></div>\n    ")})},App.handleForm=function(e){e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),o=$(this).attr("method"),n=$(this).serialize();return App.ajaxRequest(t,o,n,function(e){e.token&&App.setToken(e.token),App.loggedInState(),App.$modal.modal("hide")})},App.ajaxRequest=function(e,t,o,n){return $.ajax({url:e,method:t,data:o,beforeSend:this.setRequestHeader.bind(this)}).done(n).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.currentUser=function(){if(this.getToken()){var e=this.getToken(),t=e.split(".")[1],o=JSON.parse(window.atob(t)).id;this.ajaxRequest(this.apiUrl+"/users/"+o,"get",null,function(e){$(".navbar-nav").append("\n        <li class='nav-item loggedIn helloUser rightSide2 signUpNavBarLi active'>\n          <a class='nav-link signUpNavBarA' href='#'>Hello "+e.user.firstName+"</a>\n        </li>")})}},App.removeToken=function(){return window.localStorage.clear()},$(App.init.bind(App));