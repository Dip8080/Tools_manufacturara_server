const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middlewere
app.use(cors());
app.use(express.json());

// mongodb connection string


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmqj6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// run function for crud operation

async function run(){
    await client.connect();
    const toolsCollection = client.db('ToolsCollection').collection('Tools');
    const ordersCollection = client.db('ordersCollection').collection('orders');
    const userCollection = client.db('userCollection').collection('user')
    
    try{
    app.get('/tools',async(req,res)=>{
        const query = {};
        const cursor = toolsCollection.find(query);
        const tools = await cursor.toArray();
        res.send(tools);
    })
    app.get('/tools/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const tool= await toolsCollection.findOne(query);
        res.send(tool)
    })
    app.get('/orders', async(req,res)=>{
        const orderMail = req.query.clintEmail;
        const query = {clintEmail : orderMail};
        const order = await ordersCollection.find(query).toArray();
        res.send(order)
    })
    app.post('/orders',async(req,res)=>{
        const orders = req.body;
        const result = await ordersCollection.insertOne(orders);
        res.send(result);
    })
    app.put('/user/:email', async(req,res)=>{
        const email = req.params.email;
        const filter = {userEmail : email};
        const user = req.body;
        const option = {upsert : true};
        const updateDoc ={
            $set: user,
        }
        const result = await userCollection.updateOne(filter,updateDoc,option);
        res.send(result)
    })
    app.get('/user', async(req,res)=>{
        const users = await userCollection.find().toArray();
        res.send(users);
    })

  
    }

   finally{

    }
}
run().catch(console.dir);

// ............................................

app.get('/',(req,res)=>{
    res.send('ass 12 server is running')
})

app.listen(port,()=>{
    console.log('ass12 server is listening in cmd ')
})