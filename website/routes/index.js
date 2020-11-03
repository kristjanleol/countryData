var express = require('express');
var router = express.Router();
const https = require('https');
/* GET home page. */

router.get('/', function (req,res){
  res.render("index", {
    title: "",
    countryName: '',
    topLevelDomain: '',
    callingCodes: '',
    capital: '',
    region: '',
    subregion: '',
    population: '',
    timezones: '',
    languages: '',
    currenciesCode: '',
    currenciesName: '',
    currenciesSymbol: '',
    flag: ''
  })
});

router.get('/result', function(req, res1){
  let name = req.query.country;

  let request_call = new Promise((resolve, reject) => {
    https.get('https://restcountries.eu/rest/v2/name/'+ name +'?fullText=true ', (res) => {
      let data = '';
      // called when a data chunk is received.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // called when the complete response is received.
      res.on('end', () => {
       // console.log(JSON.parse(data));
        resolve(JSON.parse(data));
      });

    }).on("error", (err) => {
      console.log("Error: ", err.message);
      reject(err.message);
    });
  });

  request_call.then((response) => {
    let countryData = response[0];
    console.log(response);
    console.log(response[0].name);
    console.log(response[0].topLevelDomain[0]);
    console.log(countryData.name);
    res1.render("index", {
      title: "Country data",
      countryName: countryData.name,
      topLevelDomain: countryData.topLevelDomain[0],
      callingCodes: countryData.callingCodes[0],
      capital: countryData.capital,
      region: countryData.region,
      subregion: countryData.subregion,
      population: countryData.population,
      timezones: countryData.timezones[0],
      languages: countryData.languages[0].name,
      currenciesCode: countryData.currencies[0].code,
      currenciesName: countryData.currencies[0].name,
      currenciesSymbol: countryData.currencies[0].symbol,
      flag: countryData.flag
    })
  });

});

module.exports = router;
