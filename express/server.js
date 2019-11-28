'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello Dave!</h1>');
  res.end();
});

/*
 * getDIT
 * Call UPS transit time app and return ground days
 * from FOBLoc to DestLoc
 */
// router.get("/getDIT/:from/:dest", (req, res, next) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/html'
//   });
//   res.write('<h1>getDIT</h1>');
//   res.end();
//       var Axios = require('axios');
//       var parser = require('xml2json');
//       console.log('received params')
//       console.log(req.params.from)
//       console.log(req.params.dest)

//       function getDIT(fromData, destData) {
//         console.log('params')
//         console.log(fromData)
//         console.log(destData)
//         var fromData = JSON.parse(fromData)
//         var destData = JSON.parse(destData)
//         // var fobs = [
//         //     { fromZip: '06610', fromCity: 'Bridgeport', fromState: 'CT' },
//         //     { fromZip: '29340', fromCity: 'Gaffney', fromState: 'SC' },
//         //     { fromZip: '17339', fromCity: 'Lewisberry', fromState: 'PA' },
//         //     { fromZip: '93725', fromCity: 'Fresno', fromState: 'CA' },
//         // ];


//         var creds = {
//           userId: 'JETLINE2009',
//           password: 'X81JETW34',
//           accesskey: '4C8118C688C76410',
//         };
//         var fromData = {
//             zip: fromZip,
//             city: 'Bridgeport',
//             state: 'CT',
//             pickupDate: '20191126',
//         };
//         var destData = {
//             zip: '56572',
//             city: 'Pelican Rapids',
//             state: 'MN',
//             residentialIndicator: true,
//         };

//         var request = '';
//         request += "<?xml version='1.0' encoding='utf-8'?>";
//         request += "<AccessRequest xml:lang='en-US'>";
//         request +=
//           '<AccessLicenseNumber>' +
//           creds.accesskey +
//           '</AccessLicenseNumber>';
//         request += '<UserId>' + creds.userId + '</UserId>';
//         request += '<Password>' + creds.password + '</Password>';
//         request += '</AccessRequest>';
//         request += "<?xml version='1.0' encoding='utf-8'?>";
//         request += "<TimeInTransitRequest xml:lang='en-US'>";
//         request += '<Request>';
//         request += '<TransactionReference>';
//         request += '<CustomerContext />';
//         request += '<XpciVersion>1.0002</XpciVersion>';
//         request += '</TransactionReference>';
//         request += '<RequestAction>TimeInTransit</RequestAction>';
//         request += '</Request>';

//         request += '<TransitFrom>';
//         request += '<AddressArtifactFormat>';
//         request +=
//           '<PoliticalDivision1>' + fromData.state + '</PoliticalDivision1>';
//         request += '<CountryCode>US</CountryCode>';
//         request +=
//           '<PostcodePrimaryLow>' + fromData.zip + '</PostcodePrimaryLow>';
//         request += '</AddressArtifactFormat>';
//         request += '</TransitFrom>';
//         request += '<TransitTo>';
//         request += '<AddressArtifactFormat>';
//         // request += "<PoliticalDivision1>"+destData.state+"</PoliticalDivision1>";
//         request +=
//           '<PoliticalDivision2>' + destData.city + '</PoliticalDivision2>';
//         request += '<CountryCode>US</CountryCode>';
//         request +=
//           '<PostcodePrimaryLow>' + destData.zip + '</PostcodePrimaryLow>';
//         request +=
//           '<ResidentialAddressIndicator>' +
//           destData.residentialIndicator +
//           '</ResidentialAddressIndicator>';
//         request += '</AddressArtifactFormat>';
//         request += '</TransitTo>';
//         request += '<ShipmentWeight>';
//         request += '<UnitOfMeasurement>';
//         request += '<Code>LBS</Code>';
//         request += '</UnitOfMeasurement>';
//         /* TODO need to determine best method to return estimated shipment weight */
//         request += '<Weight>10</Weight>';
//         request += '</ShipmentWeight>';
//         request += '<InvoiceLineTotal>';
//         request += '<CurrencyCode>USD</CurrencyCode>';
//         request += '<MonetaryValue>50</MonetaryValue>';
//         request += '</InvoiceLineTotal>';
//         request += '<PickupDate>' + fromData.pickupDate + '</PickupDate>';
//         request += '<DocumentsOnlyIndicator />';
//         request += '</TimeInTransitRequest>';
//         console.log(request)
//         const url = 'https://onlinetools.ups.com/ups.app/xml/TimeInTransit';

//         return Axios({
//           method: 'post',
//           url: url,
//           dataType: 'xml',
//           data: request,
//         }).then(response => {
//           if (response) {
//             var json = parser.toJson(response.data);
//           }
//           return JSON.parse(json);
//         });
//       }











router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
