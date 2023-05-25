const dbConnect= require('./mongodb')

const updateData =async ()=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        { name:'m 51'  },
   { $set:{name:'m 78'}}
    )
    console.log(result)
}
updateData()