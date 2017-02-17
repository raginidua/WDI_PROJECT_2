module.exports = {
  fetch: weatherFetch
};

const rp = require('request-promise');

function weatherFetch(req,res){
  const options = {
    uri: `http://api.openweathermap.org/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.lng}&mode=JSON&&units=metric&APPID=a7960494b38d3fe6fb56a4880fc25bc8`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
  .then(function (data) {
    res.status(200).json({ data })
  })
  .catch(function (err) {
    console.log('Error', err);
  });
}
