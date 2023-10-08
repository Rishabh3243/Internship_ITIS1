const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/newDB", {
  useNewUrlParser: true ,  
  useUnifiedTopology: true 
});

const DBSchema = new mongoose.Schema ({
  name: String,
  anything: String
});

const DaB = mongoose.model("Working",DBSchema);

const db = new DaB({name: "user", anything: "Some text"});

db.save()
  .then(() => console.log("Data saved successfully!"))
  .catch((err) => console.log("Error saving data: ", err));
