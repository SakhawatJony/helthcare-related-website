const express = require('express')
const { MongoClient } = require('mongodb');
const  cors = require('cors');
 require('dotenv').config()
const app = express()
const port = process.env.PORT|| 5000;

// midleware
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hfebj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run (){
    try{
       await client.connect();
       const database = client.db('online_Package');
       const packageCollection = database.collection('packages');
       const orderCollection = database.collection('orders');


// Get packages api 
app.get('/packages',async(req,res)=>{
    const cursor = packageCollection.find({});
    const packages = await cursor.toArray();
    res.send(packages);

})
   // POST API
   app.post('/packages', async (req, res) => {
    const package = req.body;
    console.log('hit the post api', package);

    const result = await packageCollection.insertOne(package);
    console.log(result);
    res.json(result)
});

   // Add Orders API
   app.post('/orders', async (req, res) => {
    const order = req.body;
    const result = await orderCollection.insertOne(order);
    res.json(result);
})  
// Get packages api 
app.get('/orders',async(req,res)=>{
  const cursor = orderCollection.find({});
  const orders = await cursor.toArray();
  res.send(orders);

})


        // DELETE API
        app.delete('/orders/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await servicesCollection.deleteOne(query);
          res.json(result);
      })

   

    }
finally{
    // await client.close();
}
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('my-travel-agency-server-running')
})

app.listen(port, () => {
  console.log('SERVER RUNNING AT MONGO DB',port)
})