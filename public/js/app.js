"use strict";var App=App||{};App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$("#gardens").on("click",this.showGardens.bind(this)),this.$main.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.register()},App.showGardens=function(e){e&&e.preventDefault(),console.log("gardens was clicked");var t=t||{},n=n;t.mapSetup=function(){var e=document.getElementById("map-canvas"),o={zoom:12,center:new n.maps.LatLng(51.506178,(-.088369)),mapTypeId:n.maps.MapTypeId.ROADMAP};t.map=new n.maps.Map(e,o)},$(t.mapSetup.bind(t))},App.register=function(e){e&&e.preventDefault(),this.$main.html('\n    <h2>Sign Up</h2>\n    <form method="post" action="/register">\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[firstname]" placeholder="Firstname">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[lastname]" placeholder="Lastname">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Register">\n    </form>\n  ')},App.login=function(e){e.preventDefault(),this.$main.html('\n    <h2>Login</h2>\n    <form method="post" action="/login">\n      <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Login">\n    </form>\n  ')},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.handleForm=function(e){e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),n=$(this).attr("method"),o=$(this).serialize();return App.ajaxRequest(t,n,o,function(e){e.token&&App.setToken(e.token),App.loggedInState()})},App.ajaxRequest=function(e,t,n,o){return $.ajax({url:e,method:t,data:n,beforeSend:this.setRequestHeader.bind(this)}).done(o).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.removeToken=function(){return window.localStorage.clear()},$(App.init.bind(App));var googleMap=googleMap||{},google=google;