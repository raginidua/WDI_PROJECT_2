const mongoose = require('mongoose');
const config   = require('../config/config');

mongoose.connect(config.db);

const User   = require('../models/user');
const Garden = require('../models/garden');

User.collection.drop();
Garden.collection.drop();

const user1 = new User({
  firstName: 'Angelina',
  lastName: 'Jolie',
  email: 'angelinajolie@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
});

user1.save((err, user) => {
  if (err) return console.log('Something went wrong saving user');
  console.log(`${user.firstName} was saved.`);

  const garden1 = new Garden({
    name: 'Japanese Roof Garden, SOAS',
    description: 'A serene space dedicated to forgiveness.  A period of repose amongst the artfully placed rocks, pebbles, and combed sand will help you find your inner harmony. Look out for the Kanji character on the granite water basin which represents the gardens dedication to forgiveness',
    image: 'tbd',
    lat: '51.5223533',
    lng: '-0.1314477',
    user: user
  });

  garden1.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden2 = new Garden({
    name: 'Postmans Park',
    description: 'A short walk from St Pauls Cathedral lies Postmans Park, so called as it was once popular with workers from the nearby Old General Post Office.  The garden contains one of Londons most touching monuments: George Frederic Watts Memorial to Heroic Self-Sacrifice. Within the quiet park there just over 50 ceramic plaques, each commemorating an ordinary person who lost their life trying to save others. Many of the descriptions are truly heartbreaking, and you can easily spend an entire lunchbreak contemplating their selflessness. ',
    image: '../images/postmanspark.jpg',
    lat: '51.516847',
    lng: '-0.097665',
    user: user
  });

  garden2.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden3 = new Garden({
    name: 'The Phoenix Garden',
    description: 'The award winning Phoenix Garden is a community garden entirely managed by local volunteers.  Tucked behind Charing Cross Road, this is a super spot for a leafy lunchtime break. Look out for frogs and sparrows, which are thriving thanks to an enthusiastic conservation initiative.',
    image: '../images/phoenixgarden.jpg',
    lat: '51.514457',
    lng: '-0.128477',
    user: user
  });

  garden3.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });
});

const user2 = new User({
  firstName: 'Brad',
  lastName: 'Pitt',
  email: 'bradpitt@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
});

user2.save((err, user) => {
  if (err) return console.log('Something went wrong saving user');
  console.log(`${user.firstName} was saved.`);

  const garden4 = new Garden({
    name: 'Coutts Skyline Garden',
    description: 'High above the rooftops of the Strand, the Coutts skyline garden was created by executive chef Peter Fiori and overlooks St. Martins on the Fields, Nelsons Column and Zimbabwe House.  The garden lies on each side of the narrow walkway around the roof of the building, and is split into four areas - the south-facing fruit garden, Vine Lane, a tribute to the late Richard Vine who designed and installed the garden, a kitchen garden and a cottage garden',
    image: '../images/coutts.jpg',
    lat: '51.5084185',
    lng: '-0.1256423',
    user: user
  });

  garden4.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden5 = new Garden({
    name: 'King Henrys Walk Garden',
    description: 'Once a derelict site, King Henrys Walk Garden has been transformed by a group of dedicated volunteers into a beautiful organic garden where residents can grow their own fruit, vegetables and flowers.  The garden is run on sustainable principles, and all planting has been planned to encourage biodiversity and attract beneficial insects.  The garden even has a small area of woodland, most unusual in this part of Islington.',
    image: '../images/kinghenryswalkgarden.jpg',
    lat: '51.547929',
    lng: '-0.082186',
    user: user
  });

  garden5.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden6 = new Garden({
    name: 'Rosmead Gardens',
    description: 'Rosmead Gardens is part of Ladbroke Estate, which also includes Arundel Gardens and St Johns Gardens.  This was the garden featured in the film Notting Hill!',
    image: '../images/rosmeadgardens.jpg',
    lat: '51.512544',
    lng: '-0.209352',
    user: user
  });

  garden6.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });
});

const user3 = new User({
  firstName: 'Ragini',
  lastName: 'Dua',
  email: 'raginidua@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
});

user3.save((err, user) => {
  if (err) return console.log('Something went wrong saving user');
  console.log(`${user.firstName} was saved.`);

  const garden7 = new Garden({
    name: 'Bina Gardens East',
    description: 'An award-winning garden in Kensington, nicknamed the Secret Garden, is tucked away between Rosary Gardens and Bina Gardens. Originally laid out in the 1880s as a formal garden, it has many unusual mature gardens, summer planting and contemporary sculptures.',
    image: '../images/binagardenseast.jpg',
    lat: '51.491911',
    lng: '-0.183681',
    user: user
  });

  garden7.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden8 = new Garden({
    name: 'Garden Barge Square',
    description: 'Based in the Tower Bridge Moorings, Garden Barge Square is Londons only floating garden.  It consists of a series of gardens created on the decks of many of the barges to create an inside out floating garden.',
    image: '../images/gardenbargesquare.jpg',
    lat: '51.502074',
    lng: '-0.070390',
    user: user
  });

  garden8.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden9 = new Garden({
    name: 'Rosmead Gardens',
    description: 'Rosmead Gardens is part of Ladbroke Estate, which also includes Arundel Gardens and St Johns Gardens.  This was the garden featured in the film Notting Hill!',
    image: '../images/rosmeadgardens.jpg',
    lat: '51.512544',
    lng: '-0.209352',
    user: user
  });

  garden9.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden10 = new Garden({
    name: 'MaRococo',
    description: 'A small courtyard behind Rococo Chocolates planted by Chantal Coady, the shops founder, the MaRococo garden features a Moroccan tile mosaic and is filled with fragrant herbs and flowers all used in the shop, including kaffir lime, rose, lavendar, mint and geranium.',
    image: '../images/marococo.jpg',
    lat: '51.499374',
    lng: '-0.156392',
    user: user
  });

  garden10.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden11 = new Garden({
    name: 'Whitgift School Gardens',
    description: 'An incredible site in South Croydon, a complex of gardens around an independent boys school, includes manicured lawns, a japanese garden and a newly constructed Boarding House Garden.  Exotic birds freely roam the grounds.',
    image: '../images/whitgiftschool.jpg',
    lat: '51.359852',
    lng: '-0.102553',
    user: user
  });

  garden11.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden12 = new Garden({
    name: 'St. Dunstans Garden in the East',
    description: 'Few gardens are more dramatic than this, a medieval church near Cannon Street which was reduced to an empty shell from bombing in the Second World War. Today the ruin is covered in climbing plants and is an ideal place to escape.',
    image: '../images/stdunstansintheeast.jpg',
    lat: '51.509636',
    lng: '-0.082533',
    user: user
  });

  garden12.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden13 = new Garden({
    name: 'Inns of Court, High Holborn',
    description: 'Hidden within the citys inner temple, one of Londons four inns of court, the Inner Temple Garden is a tranquil three acre garden with stunning herbaecous borders and sweeping lawns. It is usually open to the public from 12.30pm to 3pm each weekday',
    image: '../images/innsofcourt.jpg',
    lat: '51.511592',
    lng: '-0.109678',
    user: user
  });

  garden13.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden14 = new Garden({
    name: 'Inns of Court, High Holborn',
    description: 'Hidden within the citys inner temple, one of Londons four inns of court, the Inner Temple Garden is a tranquil three acre garden with stunning herbaecous borders and sweeping lawns. It is usually open to the public from 12.30pm to 3pm each weekday',
    image: '../images/innsofcourt.jpg',
    lat: '51.511592',
    lng: '-0.109678',
    user: user
  });

  garden14.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden15 = new Garden({
    name: 'Kyoto Gardens, Holland Park',
    description: 'Donated by the Chamber of Commerce of Kyoto in 1991, Holland Parks Japanese Garden is one of the most impressive in London with a pond, waterfall and Japanese maple trees.',
    image: '../images/kyotogardens.jpg',
    lat: '51.511592',
    lng: '-0.109678',
    user: user
  });

  garden15.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden16 = new Garden({
    name: 'Fenton House Gardens',
    description: 'Fenton Gardens, near busy Hampstead Heath, is a National Trust owned merchants home dating back to the 17th century. Here you will find a charming walled garden with lawns, an orchard and a vegetable garden.',
    image: '../images/fentonhouse.jpg',
    lat: '51.558730',
    lng: '-0.179592',
    user: user
  });

  garden16.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden17 = new Garden({
    name: 'Fenton House Gardens',
    description: 'Fenton Gardens, near busy Hampstead Heath, is a National Trust owned merchants home dating back to the 17th century. Here you will find a charming walled garden with lawns, an orchard and a vegetable garden.',
    image: '../images/fentonhouse.jpg',
    lat: '51.558730',
    lng: '-0.179592',
    user: user
  });

  garden17.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden18 = new Garden({
    name: 'St. Georges Gardens',
    description: 'St Georges Gardens, a former church graveyard where the first case of body snatching was recorded in 1777, is today a peaceful haven in Bloomsbury filled with ivy covered tombs and imposing statues.',
    image: '../images/stgeorgesgardens.jpg',
    lat: '51.525959',
    lng: '-0.120982',
    user: user
  });

  garden18.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden19 = new Garden({
    name: 'Duncan Terrace Gardens',
    description: 'Not far from Upper Street in Islington is Duncan Terrace Garden, a charming linear garden which follows the route of the historic New River, a waterway built in the 1600s to bring clean water to London. The park has a beautiful installation called "The Spontaneous City in the Tree of Heaven", a jumbled collection of bird boxes inspired by local architecture.',
    image: '../images/duncanterracegardens.jpg',
    lat: '51.532465',
    lng: '-0.103823',
    user: user
  });

  garden19.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden20 = new Garden({
    name: 'Pleasure Gardens',
    description: 'The Vauxhall Pleasure Gardens are on the site of the historic Royal Vauxhall Gardens.  The Garden was opened in 1661 as a pleasure garden for the entertainment of guests, combining music, illuminated fountains, fireworks and light refreshment. The garden combined genteel areas for the entertainment of guests with dark walks where couples could enjoy each others company in privacy.',
    image: '../images/vauxhallpleasuregardens.jpg',
    lat: '51.487549',
    lng: '-0.121175',
    user: user
  });

  garden20.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden21 = new Garden({
    name: 'Pergola and Hill Gardens',
    description: 'Most people know Hampstead Heath, but few people have heard of nearby Pergola And Hill Gardens which overlook the West Heath area. The garden dates back to the Edwardian era and offers splendid views over the capital.',
    image: '../images/pergolahillgardens.jpg',
    lat: '51.565238',
    lng: '-0.183675',
    user: user
  });

  garden21.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden22 = new Garden({
    name: 'Red Cross Garden',
    description: 'The Red Cross Garden is a historic and award winning park which was set up to bring greenery to overcrowded city people.  Today is continues to offer exactly what it was designed for, to bring "an open air sitting room for the tired inhabitants of Southwark."',
    image: '../images/redcrossgarden.jpg',
    lat: '51.503163',
    lng: '-0.094545',
    user: user
  });

  garden22.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden23 = new Garden({
    name: 'Mount Street Gardens',
    description: 'Hidden behind houses and large mansion blocks, the garden was created in the 19th century on the grounds of a former burial site, and today the design is largely unchanged.  The park is filled with benches donated in memory of people who loved sitting here.',
    image: '../images/mountstreetgardens.jpg',
    lat: '51.509138',
    lng: '-0.150694',
    user: user
  });

  garden23.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden24 = new Garden({
    name: 'Barbican Conservatory',
    description: 'Set in the middle of Barbican Centre, the Barbican conservatory is filled with 2,000 species of exotic plants and trees, not to mention birds and fish and is a delightful way to spend a few hours in the city.',
    image: '../images/barbicanconservatory.jpg',
    lat: '51.520016',
    lng: '-0.093151',
    user: user
  });

  garden24.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden25 = new Garden({
    name: 'Victoria Embankment Gardens',
    description: 'History buffs will love Victoria Embankment Gardens near Charring Cross.  The main draw is the beautiful York Water Gate which was built in 1626 as an entrance to the Thames for the Duke of Buckingham, but now stands some 100m from the water.',
    image: '../images/victoriaembankmentgardens.jpg',
    lat: '51.508015',
    lng: '-0.122379',
    user: user
  });

  garden25.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden26 = new Garden({
    name: 'William Morris Red House',
    description: 'Tucked away in the suburb of BexleyHeath is William Morris Red House, a beautiful home with a small but perfectly formed garden designed to clothe the house.  In 1904 the critic Hermann Muthesius called the property the "first house to be conceieved and built as a unified whole, inside and out".',
    image: '../images/williammorrisredhouse.jpg',
    lat: '51.455457',
    lng: '0.130350',
    user: user
  });

  garden26.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden27 = new Garden({
    name: 'Eltham Palace Gardens',
    description: 'Eltham Palaces has a beautiful 19 acre garden, a perfect spot to grab a picnic in the summer, especially if you can nab a spot near the moat.',
    image: '../images/elthampalacegardens.jpg',
    lat: '51.447222',
    lng: '0.048088',
    user: user
  });

  garden27.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

});
