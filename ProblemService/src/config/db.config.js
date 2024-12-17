const mongoose = require('mongoose')
const { ATLAS_DB_URL, NODE_ENV } = require('./server.config')


async function connectToDb(){
 try {

  if(NODE_ENV=='development'){
   
   await mongoose.connect(ATLAS_DB_URL)
   console.log("Connected to database")
  }
  
 } catch (error) { 
  console.log(`Error in connecting to databse`);
  console.log(error)

  
 }
}

module.exports = connectToDb;