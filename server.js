const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'dates'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('logHistory').find().sort({currentDay: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addNewEntry', (request, response) => {
    db.collection('logHistory').insertOne({currentDay: request.body.currentDay,
        vehicleUsed: request.body.vehicleUsed, odoStart: request.body.odoStart, odoEnd: request.body.odoEnd, driver: request.body.driver})
    .then(result => {
        console.log('Entry Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/editEntry', async (request, response) => {
    try {
        const entryId = await request.body.itemFromJS
        await db.collection('logHistory').findOneAndUpdate({_id: entryId},{ 
            $set: {
            first: request.body.first, 
            second: request.body.second, 
            third: request.body.third,
            fourth: request.body.fourth, 
            fifth: request.body.fifth
            }
    },
{
        upsert: false
     })
    console.log('Updated Entry')
    return response.json('Updated It')
     response.redirect('/')
} catch(err) {
    console.log(err)
}
})

app.delete('/deleteEntry', (request, response) => {
    db.collection('logHistory').deleteOne({odoStart: request.body.begOdo, odoEnd: request.body.endOdo})
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})