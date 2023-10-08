const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/newDB", {
  useNewUrlParser: true ,  
  useUnifiedTopology: true 
}).then(()=>console.log("Connected"));

const DBSchema = new mongoose.Schema ({
  name: {
    type:String,
    required:true},
  anything: String,
  date:{
    type:Date,
    default:Date.now
  }
});

const DaB = mongoose.model("Working",DBSchema);

const createDocument= async () =>{
  try{
    const db1 = new DaB({name: "user56", anything: "text"});
    const db2 = new DaB({name: "user57", anything: "text 4"});
    const db3 = new DaB({name: "user58", anything: "text 5"});
    const g = await DaB.insertMany([db1,db2,db3]);
    console.log(g);
  }catch(err){
    console.log(err);
  }
}
//createDocument();
const readdata = async() =>{
try{
  const result=await DaB.find().sort("name:1");
  console.log(result);
}catch(err){
  console.log(err);
}
}
readdata();

const updateQuery = async(_id) => {
  try{
    const u = await DaB.updateOne({_id},{
      $set:{
        name:"mukesh"
      }
    })
    console.log(u);
  }catch(err){
    console.log(err)
  }
}

updateQuery("647acd9a6f1fefeb76019fa5");
readdata();
