const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String,
});
const saveInDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");

  const Product = new mongoose.model("products", productSchema);
  let data = new Product({
    name: "m6566888",
    price: 100,
    brand: "maxxx",
    category: "mobile",
  });
  let result = await data.save();
  console.log(result);
};
//saveInDB();

const updateInDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
  const Product = mongoose.model("products", productSchema);
  let data = await Product.updateOne(
    { name: "m6566888" },
    { $set: { price: 777 } }
  );
  console.log(data);
};
//updateInDB();
const deleteInDB = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
    const Product = mongoose.model("products", productSchema);
    let data = await Product.deleteOne({name:'surajjj'})
    console.log(data)
}
//deleteInDB()

const findInDB= async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
    const Product = mongoose.model("products", productSchema);
let data =await Product.find();
console.log(data)
}
findInDB()