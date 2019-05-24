const mongoose = require('mongoose');

// Don't forget to set "MONGODB_URI" in ~/server/.env
//const uri = process.env.MONGODB_URI || `mongodb+srv://jonriquer:Mclarenf1!@cluster0-cetbg.mongodb.net/test?retryWrites=true`;
let uri = `mongodb+srv://jonriquer:mclarenf1@cluster0-cetbg.mongodb.net/FinalProject?retryWrites=true`
console.log(uri,124524545234534)
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });