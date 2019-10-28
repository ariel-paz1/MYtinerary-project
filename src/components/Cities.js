import React from 'react'

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://usuario1:4uYhFEP8O5px2LMu@mlabcluster-wfri4.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

class Ciudades extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Ciudades</h1>
      </React.Fragment>
    );
  }
}
export default Ciudades