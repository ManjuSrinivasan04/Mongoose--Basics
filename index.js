let express =require('express');
let app=express();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let Doc=require('./Docs.model');
let User=require('./User.model');
const port=3000;

//connecting mongo and checking it whether connected or not

mongoose.connect("mongodb://localhost:27017/myDocs-mongoose",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

//adding users[api for USER]

app.post('/addUser',(req,res)=>{
    console.log("Adding new User");
    let userObj = {
        "_id":new mongoose.Types.ObjectId(),
        "name":req.body.name        //[data from any interface] //naming is coming from frontend
    }
    let newUser=new User(userObj);
    newUser.save((err,user)=>{
        if(err)
           res.status(400).send("There is an error while adding new user");
        else
           res.status(200).json(user);
    });
});


//api for DOCS

app.post('/addDocs',(req,res)=>{
    console.log("Adding new Doc");
    let docObj = {
        "_id":new mongoose.Types.ObjectId(),
        "title":req.body.title,
        "description":req.body.description,
        "user":"5f51fbda256c0e0fd809c0b3"
    }
    let newDoc=new Doc(docObj);
    newDoc.save((err,doc)=>{
        if(err)
           res.status(400).send("There is an error while adding new user");
        else
           res.status(200).json(doc);
    });
})

//getting all docs added in mongodb

app.get('/docs',(req,res)=>{
    console.log("Getting all docs");
    Doc.find({}).populate("user").exec((err,docs)=>{
        if(err)
           res.status(400).send("There is an error while adding new user");
        else
           res.status(200).json(docs);
    });
});

//editing docs

app.put('/docs/:id',(req,res)=>{
    console.log("Editing all docs");
    let docObj = {
        
        "title":req.body.title,
        "description":req.body.description,
        
    }
    Doc.findByIdAndUpdate(req.params.id,docObj,{new:true}).exec((err,doc)=>{
        if(err)
           res.status(400).send("There is an error while adding new user");
        else
           res.status(200).json(doc);
    });
});


//deleting api

app.delete('/docs/:id',(req,res)=>{
    console.log("deleting all docs");
    Doc.findByIdAndDelete(req.params.id).exec((err,doc)=>{
        if(err)
           res.status(400).send("There is an error while adding new user");
        else
           res.status(200).json(doc);
    });
});

//default api
app.get('/',(req,res)=>{
    res.send("Home Page");
});

app.listen(port,()=>{
    console.log("App is running on port ",port);
})