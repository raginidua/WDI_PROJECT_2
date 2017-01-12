const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.homePage').on('click', this.homePage.bind(this));
  $('#gardens').on('click', this.showMap.bind(this));
  $('#addGarden').on('click', this.addGarden.bind(this));
  this.$main.on('submit', 'form', this.handleForm);

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
};

App.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
};

App.addGarden = function(e) {
  if (e) e.preventDefault();
  console.log('Add a garden was clicked');
  this.$main.html(`
    <h2>Add a garden</h2>
    <form method="post" action="/users/user:id">
      <div class="form-group">
        <input class="form-control" type="text" name="user[garden][name]" placeholder="Garden Name">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="garden][description]" placeholder="Description">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="user[garden][imageLocation]" placeholder="Image">
      </div>
      <div class="form-group">
        <input class="form-control" type="text" name="user[garden][imageLocation]" placeholder="Image Location">
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
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  new google.maps.Map(canvas, mapOptions);
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

App.removeToken = function(){
  return window.localStorage.clear();
};


$(App.init.bind(App));
