(base) vikas@Vikas:~/dev/mongocasts/sla$ cat *.js
const mongoose = require('mongoose');
const SLA = require('./sla');

const data = {
    "application_name": "Application 1",
    "sla_name": "SLA 1",
    "sla_duration": "quarterly",
    "sla": {
        "expected": 99,
        "minimum": 98,
        "maximum": 100
    },
    "year": "current",
    "description": "Description of SLA 1",
    "data": [
        99,
        98,
        99,
        98,
        99,
        98,
        99,
        98,
        99,
        98,
        99,
        98
    ]
};

const saveData = (a, s, done) => {
    data["application_name"] = a;
    data["sla_name"] = s;
    data["description"] = "Description for " + s;
    o = new SLA(data);
    console.log("Trying to save");
    console.log(o);
    o.save(function(err) {
        console.log("Inside");
        if(err) {
             console.log(err);
             return;
        }
        done();
  });
}

mongoose.connect('mongodb://localhost/dashboard');
mongoose.connection
    .once('open', () => {
        console.log("Connected");
        saveData("Application 1", "SLA 1", 
            () => {saveData("Application 1", "SLA 2", 
            () => {saveData("Application 1", "SLA 3", 
            () => {saveData("Application 2", "SLA 1", 
            () => {saveData("Application 2", "SLA 2", 
            () => {saveData("Application 2", "SLA 3", 
            () => {saveData("Application 3", "SLA 1", 
            () => {saveData("Application 3", "SLA 2", 
            () => {saveData("Application 3", "SLA 3",  
            () => {console.log("Saved")})})})})})})})})});
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlaSchema = new Schema({
    application_name: String,
    sla_name: String,
    sla_duration: String,
    sla: Object,
    year: String,
    description: String,
    data: Array
  });
  
const SLA = mongoose.model('sla', SlaSchema);

module.exports = SLA;




(base) vikas@Vikas:~/dev/mongocasts/sla$ cat package.json
{
  "name": "sla",
  "version": "1.0.0",
  "description": "",
  "main": "sla.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mongoose": "^5.7.8"
  }
}
(base) vikas@Vikas:~/dev/mongocasts/sla$ 
