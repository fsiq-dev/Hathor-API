const node_environment = process.env.NODE_ENV || 'development'

if (node_environment === 'development') {
  require('dotenv').config();
}

const db = require('./db/config');

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });



const { admin } = require('./src/models/index');
const cryptograph = require('./src/utils/cryptograph.utils');
const { json } = require('express');


const criaADM = async () => {
 
  await admin.create({
    email: 'felipe.adm@teste.com',
    name: "felipe",
    image: {
      initialName: "defaultUser.png",
      name: "defaultUser.png",
      type: "image/png"
    },
    password: cryptograph.createHash('123123')
  });
}


criaADM();
