const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const MongoDb_URL="mongodb://127.0.0.1:27017/wanderlust";


main().then(()=>{
    console.log("Connection successful");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MongoDb_URL);
}


const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6aad7a32f158eff108d0ef21"}))
    await Listing.insertMany(initData.data);
    console.log("Data was iniialized");
};

initDB();