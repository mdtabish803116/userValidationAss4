const express = require('express');
const app = express();

app.use(express.json());

const users = []

function checkRegister(req , res , next){
      const body = req.body;

      if((body.first_name !== "" && !body.first_name) || (!body.last_name && body.last_name !== "") || (!body.email && body.email !== "") || (!body.pincode && body.pincode !== "")|| (!body.age && body.age !== "")|| (!body.gender && body.gender !== "")){
          return res.status(401).send("Please Provide correct keywords")
      }

      next()
}

function handleRegister(req , res){

    const body = req.body;
     
    if(body.first_name === ""){
        return res.status(401).send({error : "Required firstName"})
    }
    if(body.last_name === ""){
        return res.status(401).send({error : "Required lastName"})
    }
    if(body.email === "" || !(body.email.includes("@")) || !(body.email.includes(".com"))){
        return res.status(401).send({error : "Invalid email"})
    }
    if(body.pincode === "" || body.pincode.length > 20){
        return res.status(401).send({error : "Invalid pincode"})
    }
    if(body.age === "" || body.age < 1 || body.age > 100){
        return res.status(401).send({error : "Invalid age"})
    }
    if(body.gender === ""){
        return res.status(401).send({error : "Require gender"})
    }

    let user = {
          id : users.length + 1,
          first_name : body.first_name,
          last_name : body.last_name,
          email : body.email,
          pincode : body.pincode,
          age : body.age,
          gender : body.gender  
    }

    users.push(user);

     res.status(201).send({success : "user succesfully registered"})
}

app.post("/register" , checkRegister , handleRegister)


app.listen(3006 , ()=> {
      console.log('listening on http://localhost:3006')
})