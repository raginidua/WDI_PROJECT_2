const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  const date = new Date().toLocaleString();
  console.log(date);
  $('#time').text(date);

  App.getWeatherTimes = function() {
    console.log('Get weather timesg logging');
    $.get(`http://api.openweathermap.org/data/2.5/forecast?lat=51.5074&lon=0.1278&mode=JSON&APPID=a7960494b38d3fe6fb56a4880fc25bc8`).done(data => {
      $.each(data.list, (index, time) => {
        console.log(data);
        console.log(time.dt_txt);
        $('.weatherTimes').append(`<option>${time.dt_txt}</option>`);
        $(`.${time.dt}`).on('click', function() {
          console.log(time);
        });
      });
    });
  };

  App.getWeatherTimes();

  $('.currentTime').text(date);
  this.$main  = $('main');
  this.$modalcontent = $('.modal-content');
  this.$modal = $('.modal');
  App.showMap();
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.homePage').on('click', this.homePage.bind(this));
  $('#gardens').on('click', this.showMapAgain.bind(this));
  $('.userGardens').on('click', this.userGarden.bind(this));
  $('#secretGardens').on('click', this.showMapSecret.bind(this));
  $('body').on('click', '.editGarden', this.editGarden.bind(this));
  // $('.deleteGarden').on('click', this.deleteGarden.bind(this));
  this.$modal.on('submit', 'form', this.handleForm);

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
  this.$main.html(`<h1>BLOOM</h1>`);
};

App.register = function(e){
  if (e) e.preventDefault();
  this.$modalcontent.html(`
    <div class="signInModal">
    <h2>Sign Up</h2>
    <form method='post' action='/register' class='signInForm'>
      <div class='form-group'>
        <input class='form-control' type='text' name='user[firstName]' placeholder='First name'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='text' name='user[lastName]' placeholder='Last name'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='email' name='user[email]' placeholder='Email'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='password' name='user[password]' placeholder='Password'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='password' name='user[passwordConfirmation]' placeholder='Password Confirmation'>
      </div>
      <input class='btn btn-primary' type='submit' value='Register'>
    </form>
    </div>
  `);
  this.$modal.modal('show');
};

App.login = function(e) {
  e.preventDefault();
  this.$modalcontent.html(`
    <div class="logInModal">
    <form method='post' action='/login' class='logInForm'>
      <div class='form-group'>
        <input class='form-control' type='email' name='email' placeholder='Email'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='password' name='password' placeholder='Password'>
      </div>
      <input class='btn btn-primary logInButton' type='submit' value='Login'>
    </form></div>
  `);
  this.$modal.modal('show');
};

App.logout = function(e){
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.homePage = function(e) {
  if (e) e.preventDefault();
  console.log('Home page was clicked');
  this.$modalcontent.html(`<div class="mainImage"><h1>Bloom</h1><h6>A GUIDE TO LONDON'S SECRET GARDENS.</h6></div>`);
  this.$modal.modal('show');
};

App.showMap = function(e){
  if (e) e.preventDefault();
  console.log('Gardens was clicked');
  this.$main.html(`<div id='map-canvas'></div>`);
  const styledMapType = new google.maps.StyledMapType([{'featureType': 'administrative','elementType': 'labels.text.fill','stylers': [{'color': '#444444'}]},{'featureType': 'landscape','elementType': 'all','stylers': [{'color': '#f2f2f2'}]},{'featureType': 'poi','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'road','elementType': 'all','stylers': [{'saturation': -100},{'lightness': 45}]},{'featureType': 'road.highway','elementType': 'all','stylers': [{'visibility': 'simplified'}]},{'featureType': 'road.arterial','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},{'featureType': 'transit','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'water','elementType': 'all','stylers': [{'color': '#ebd5ec'},{'visibility': 'on'}]}]);
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']
    },
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
  App.map.mapTypes.set('styled_map', styledMapType);
  App.map.setMapTypeId('styled_map');
};

App.showMapAgain = function(e){
  if (e) e.preventDefault();
  console.log();
  console.log('Gardens was clicked');
  this.$main.html(`<div id='map-canvas'></div>`);
  const styledMapType = new google.maps.StyledMapType([{'featureType': 'administrative','elementType': 'geometry.fill','stylers': [{'visibility': 'off'}]},{'featureType': 'administrative','elementType': 'geometry.stroke','stylers': [{'visibility': 'on'}]},{'featureType': 'administrative','elementType': 'labels.text.fill','stylers': [{'color': '#495421'}]},{'featureType': 'administrative','elementType': 'labels.text.stroke','stylers': [{'visibility': 'on'},{'weight': 4.1}]},{'featureType': 'landscape','elementType': 'geometry.fill','stylers': [{'color': '#daebc6'},{'visibility': 'on'}]},{'featureType': 'landscape.natural.terrain','elementType': 'geometry.fill','stylers': [{'color': '#cae9c2'}]},{'featureType': 'poi','elementType': 'geometry.fill','stylers': [{'color': '#769E72'}]},{'featureType': 'poi','elementType': 'labels.text.fill','stylers': [{'color': '#7B8758'}]},{'featureType': 'poi','elementType': 'labels.text.stroke','stylers': [{'color': '#ffffff'}]},{'featureType': 'poi.park','elementType': 'geometry','stylers': [{'visibility': 'simplified'},{'color': '#89d88f'}]},{'featureType': 'road','elementType': 'geometry.fill','stylers': [{'color': '#ff0000'}]},{'featureType': 'road','elementType': 'labels.text.fill','stylers': [{'color': '#459945'}]},{'featureType': 'road','elementType': 'labels.text.stroke','stylers': [{'color': '#ffffff'}]},{'featureType': 'road','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},{'featureType': 'road.highway','elementType': 'geometry','stylers': [{'color': '#ffffff'}]},{'featureType': 'road.arterial','elementType': 'geometry','stylers': [{'color': '#eeeeee'}]},{'featureType': 'road.local','elementType': 'geometry','stylers': [{'color': '#d8d8d8'}]},{'featureType': 'transit','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'water','elementType': 'geometry','stylers': [{'visibility': 'on'},{'color': '#d2f0ef'}]}]);
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDoubleClickZoom: true,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']
    },
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
  App.map.mapTypes.set('styled_map', styledMapType);
  App.map.setMapTypeId('styled_map');

  App.map.addListener('dblclick', function(e) {
    const coords = e.latLng;

    App.addGarden.bind(App)(coords);
  });

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
  // this.getWeatherTimes(garden, marker);
  this.getWeatherInfo(garden, marker);
};

App.getWeatherInfo = function(garden, marker) {
  console.log(marker);
  $.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${garden.lat}&lon=${garden.lng}&mode=JSON&&units=metric&APPID=a7960494b38d3fe6fb56a4880fc25bc8`).done(data => {
    const temp = data.list[0].main.temp;
    const weather = data.list[0].weather[0].description;
    const date = data.dt_text;
    console.log(data);
    console.log(date);
    console.log(temp, weather);
    this.addInfoWindowForGarden(garden, marker, weather, temp);
  });
};

App.addInfoWindowForGarden = function(garden, marker, weather, temp) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class='infoWindow'><header class = 'infoWindowHeader'><h4>${ garden.name}</h4></header><img src='${garden.image}'></img><p>${garden.description }</p><p>${weather}, ${temp}</p></div>`,
      maxWidth: '260'
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });
};

App.showMapSecret = function(e){
  if (e) e.preventDefault();
  console.log('Gardens was clicked');
  this.$main.html(`<div id='map-canvas'></div>`);
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
  App.getGardensSecret();
};

App.getGardensSecret = function(){
  this.ajaxRequest(`${this.apiUrl}/gardens`, 'get', null, this.loopThroughGardensSecret.bind(this));
};

App.loopThroughGardensSecret = function(data){
  console.log(this);
  console.log(data);
  $.each(data.gardens, (index, garden) => {
    App.createMarkerForGardenSecret(garden);
    console.log(garden.name);
  });
};

App.createMarkerForGardenSecret = function(garden) {
  const latlng = new google.maps.LatLng(garden.lat, garden.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: App.map,
    icon: '/images/icon.png'
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
    marker.setIcon('../images/blue_flower.ico');
    marker.setVisible(true);
  });
  this.getWeatherInfo(garden);
  this.addInfoWindowForGarden(garden, marker);
};

App.addGarden = function(coords) {
  console.log('Add a garden was clicked');
  this.$modalcontent.html(`
    <h2>Add a garden</h2>
    <form method='post' action='/gardens'>
      <div class='form-group'>
        <input class='form-control' type='text' name='garden[name]' placeholder='Garden Name'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='text' name='garden[description]' placeholder='Description'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='text' name='garden[image]' placeholder='Image'>
      </div>
      <div class='form-group'>
        <input class='form-control' type='text' name='garden[lat]' placeholder='Garden latitude' value="${coords.lat()}">
      </div>
      <div class='form-group'>
        <input class='form-control' type='text' name='garden[lng]' placeholder='Garden Longitude' value="${coords.lng()}">
      </div>
      <input class='btn btn-primary' type='submit' value='Add Garden'>
    </form>
  `);
  this.$modal.modal('show');
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
      this.$modalcontent.html('<ul>');
      $.each(data.gardens, (index, garden) => {
        if (userId === garden.user) {
          console.log(garden);
          this.$modalcontent.append(`
            <li>${garden.name}</li>
            <input data-identifier="${garden._id}" class='btn btn-primary editGarden' type='submit' value='Edit Garden'>
            <form method='delete' action='/gardens/${garden._id}'><input class='btn btn-primary deleteGarden' type='submit' value='Delete Garden'></form>
          `);
          this.$modalcontent.append('</ul>');
          this.$modal.modal('show');
        }
      });
    });
  }
};

App.editGarden = function(e) {
  if (e) e.preventDefault();
  console.log('edit garden was clicked');
  this.ajaxRequest(`${this.apiUrl}/gardens/${e.target.getAttribute('data-identifier')}`, 'get', null, (data) => {
    App.$modalcontent.html(`
      <h2>Edit garden</h2>
      <form method='post' action='/gardens/${data.garden._id}'>
        <input type="hidden" name="_method" value="put">
        <div class='form-group'>
          <input class='form-control' type='text' name='garden[name]' value='${data.garden.name}'>
        </div>
        <div class='form-group'>
          <input class='form-control' type='text' name='garden[description]' value='${data.garden.description}'>
        </div>
        <div class='form-group'>
          <input class='form-control' type='text' name='garden[image]' value='${data.garden.image}>'
        </div>
        <div class='form-group'>
          <input class='form-control' type='text' name='garden[lat]' value='${data.garden.lat}>'
        </div>
        <div class='form-group'>
          <input class='form-control' type='text' name='garden[lng]' value='${data.garden.lng}'>
        </div>
        <input class='btn btn-primary' type='submit' value='Edit Garden'>
      </form>
    `);
  });
};

App.handleForm = function(e){
  e.preventDefault();

  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return App.ajaxRequest(url, method, data, data => {
    if (data.token) App.setToken(data.token);
    App.loggedInState();
    App.$modal.modal('hide');
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
      $('.navbar-right').append(`
        <li class='nav-item loggedIn helloUser'>
          <a class='nav-link' href='#'>Hello ${data.user.firstName}</a>
        </li>`);
    });
  }
};

App.removeToken = function(){
  return window.localStorage.clear();
};


$(App.init.bind(App));
