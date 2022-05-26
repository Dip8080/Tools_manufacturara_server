const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middlewere
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('ass 12 server is running')
})

app.listen(port,()=>{
    console.log('ass12 server is listening in cmd ')
})