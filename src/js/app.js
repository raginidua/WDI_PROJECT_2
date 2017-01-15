const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  const date = new Date().toString();

  $('#time').text(date);
  this.$main  = $('main');
  App.showMap();
  // this.$modalcontent = $('.modal-content');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.homePage').on('click', this.homePage.bind(this));
  $('#gardens').on('click', this.showMapAgain.bind(this));
  $('#addGarden').on('click', this.addGarden.bind(this));
  $('.userGardens').on('click', this.userGarden.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  // instead of the above add in modal content

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.homePage();
  $('.helloUser').hide();
  this.currentUser();
};

App.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.showMap();
};

App.loggedOut = function() {
  this.$main.html(`<h1>Welcome to KEY: unlocking the door to London's Secret Gardens</h1>`);
};

App.userGarden = function(e) {
  if (e) e.preventDefault();
  console.log('user garden to be shown');
  if (this.getToken()) {
    const token   = this.getToken();
    const payload = token.split('.')[1];
    const userId  = JSON.parse(window.atob(payload)).id;
    console.log(userId);
    this.ajaxRequest(`${this.apiUrl}/gardens`, 'get', null, (data) => {
      $.each(data.gardens, (index, garden) => {
        if (userId === garden.user) {
          console.log(garden.name);
          this.$main.append(`
            <p>${garden.name}</p>
          `);
        }
      });
    });
  }
};

App.addGarden = function(e) {
  if (e) e.preventDefault();
  console.log('Add a garden was clicked');
  this.$main.html(`
    <h2>Add a garden</h2>
    <form method="post" action="/gardens">
      <div class="form-group">
        <input class="form-control" type="text" name="garden[name]" placeholder="Garden Name">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="garden[description]" placeholder="Description">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="garden[image]" placeholder="Image">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="garden[lat]" placeholder="Garden latitude">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="garden[lng]" placeholder="Garden Longitude">
      </div>
      <input class="btn btn-primary" type="submit" value="Add Garden">
    </form>
  `);
};

App.homePage = function(e) {
  if (e) e.preventDefault();
  console.log('Home page was clicked');
  this.$main.html(`<h1>Welcome to KEY: unlocking the door to London's Secret Gardens</h1>`);
};

App.showMap = function(e){
  if (e) e.preventDefault();
  console.log('Gardens was clicked');
  this.$main.html(`<div id="map-canvas"></div>`);
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }
  };
  App.map = new google.maps.Map(canvas, mapOptions);
};

App.showMapAgain = function(e){
  if (e) e.preventDefault();
  console.log('Gardens was clicked');
  this.$main.html(`<div id="map-canvas"></div>`);
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }
  };
  App.map = new google.maps.Map(canvas, mapOptions);
  App.getGardens();
};

App.getGardens = function(){
  this.ajaxRequest(`${this.apiUrl}/gardens`, 'get', null, this.loopThroughGardens.bind(this));
};

App.loopThroughGardens = function(data){
  console.log(this);
  console.log(data);
  $.each(data.gardens, (index, garden) => {
    App.createMarkerForGarden(garden);
    console.log(garden.name);
  });
};

App.createMarkerForGarden = function(garden) {
  const latlng = new google.maps.LatLng(garden.lat, garden.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: App.map,
    animation: google.maps.Animation.DROP
  });
  this.getWeatherInfo(garden);
  this.addInfoWindowForGarden(garden, marker);
};

App.getWeatherInfo = function(garden) {
  $.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${garden.lat}&lon=${garden.lng}&mode=JSON&API`).done(data => {
    const temp = data.list[0].main.temp;
    const weather = data.list[0].weather[0].description;
    console.log(data);
    console.log(temp, weather);
  });
};

App.addInfoWindowForGarden = function(garden, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class="infoWindow"><header class = "infoWindowHeader"><h4>${ garden.name}</h4></header><img src="${garden.image}"></img><p>${garden.description }</p></div>`,
      maxWidth: '260'
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });
};

App.register = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <h2>Sign Up</h2>
    <form method="post" action="/register">
      <div class="form-group">
        <input class="form-control" type="text" name="user[firstName]" placeholder="First name">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="user[lastName]" placeholder="Last name">
      </div>
      <div class="form-group">
        <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
    </form>
  `);
};

App.login = function(e) {
  e.preventDefault();
  this.$main.html(`
    <h2>Login</h2>
    <form method="post" action="/login">
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
  `);
};

App.logout = function(e){
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.handleForm = function(e){
  e.preventDefault();

  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return App.ajaxRequest(url, method, data, data => {
    if (data.token) App.setToken(data.token);
    App.loggedInState();
  });
};

App.ajaxRequest = function(url, method, data, callback){
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

App.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

App.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

App.getToken = function(){
  return window.localStorage.getItem('token');
};

App.currentUser = function() {
  if (this.getToken()) {
    const token   = this.getToken();
    const payload = token.split('.')[1];
    const userId  = JSON.parse(window.atob(payload)).id;
    this.ajaxRequest(`${this.apiUrl}/users/${userId}`, 'get', null, data => {
      $('.navbar-nav').append(`
        <li class="nav-item loggedIn helloUser">
          <a class="nav-link" href="#">Hello ${data.user.firstName}</a>
        </li>`);
    });
  }
};

App.removeToken = function(){
  return window.localStorage.clear();
};


$(App.init.bind(App));
