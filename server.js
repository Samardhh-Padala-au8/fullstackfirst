const express=require('express')
const path=require('path')
const port = process.env.PORT||5600
const app=express();
const mongodb = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017"
const cors = require('cors');
app.use(cors())
app.use(express.static(path.join(__dirname,"build")));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"))
});
app.get('/news',(req,res) =>{
    mongodb.connect(url,function(err,connection){
        if(err){
          res.status(501).send('Error in connection')
        }else{
          const dbo = connection.db('attainu')
          var query={}
          if(req.query.name){
              query={name:req.query.name}
          }
          dbo.collection('breakingbad').find(query).toArray((err,data) => {
            if(err){
              res.status(402).send('Error While Fetching')
            }else{
              res.send(data)
            }
          })
          
        }
      })
});
app.listen(port,(err)=>{
    if(err)throw err;
    console.log(`Server is running on port ${port}`)
})
