const dbConnect= require('./mongodb')

const deleteData =async ()=>{
let data = await dbConnect()
let result = await data.deleteOne(
    {name:'m 78'}
)
console.log(result)
if(result.acknowledged){
    console.log("data deleted")
}
}
deleteData()