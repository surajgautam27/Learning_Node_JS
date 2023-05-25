const dbConnect=require('./mongodb')

const insert =async ()=>{
    const db = await dbConnect()
const result = await db.insertOne({
    name:'m 51',
    brand:'samsung',
    price:200,
    caregory:'mobile'
})
console.log(result)
}
insert()