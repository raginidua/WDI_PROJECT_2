#Bloom

**An app which allows users to find and share the location of secret gardens and hidden green spaces in London**

**See it here: [Bloom](https://nameless-wave-41114.herokuapp.com/).**

![image](http://i.imgur.com/ut5Wlu0.png)

##Overview

This application was created as my second project for the Web Development Immersive course at General Assembly in London. 

The brief for the project was to use the Google Maps API as well as an external API.  I wanted to clarify my understanding of the relationships between different models in the back-end, and therefore chose a project where the Users were responsible for adding data into the database. 

When working in the city, I enjoyed finding quiet green places to sit in during lunch breaks, of which there were several.  London has many secrets, and I have always thought there was a certain charm to secret gardens. I wanted to do something simple and thematic, so I could also have fun with the design and styling. 

##How to use the app

**Login / Register**

![image](http://i.imgur.com/bGU2gne.png)

When the User visits the website, there is an option to Register and Login.  This step is built on JWT authentication.  Once the user has logged in or registered, they are assigned a unique session token which allows them to make the API requests necessary for the application to work.

**Enter the Website**

![image](http://i.imgur.com/0JC4Z0j.png?1)

**Click on Gardens in the Nav Bar to see all the gardens which have been added by Users.  To add a new garden the logged in User just needs to double click on the location of the garden on the map**

![image](http://i.imgur.com/0BTDBC6.png?1)

I created two separate models, one for users and one for gardens.  I used a reference model whereby the gardens model included a field for users.  I used payload to pass the user ID as part of the jwt token so that the current user could be identified when a new garden was being created and in order to see the gardens of the current, logged in user. 

**Click on a Garden to find more information, the weather forecast and an image**

![image](http://i.imgur.com/BdkqaET.png?1)

I used an external weather API in order to get the weather forecast.

**Click Secret View for a fun game where you have to find the gardens by scrolling on the page**

![image](http://i.imgur.com/jQsziS2.png?1)

I did this by using google.maps.event.addListener, and listening for a mouseover, at which point the marker would change from a small transparent object to the rose. 

**Click My Gardens to Edit or Delete your Contributions**

![image](http://i.imgur.com/gFTaNrV.png?1)

##Planning

To be completed

##Technology Used

<li> HTML5 </li>
<li> SCSS </li>
<li> jQuery </li>
<li> Node.js </li>
<li> Express.js </li>
<li> Gulp </li>
<li> Bower </li>
<li> GoogleMaps API </li>
<li> Open Weather API </li>
