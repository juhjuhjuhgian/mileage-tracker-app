const express = require('express')
const app = express()
// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const MileageEntry = require('./models/mileage')
const PORT = process.env.PORT || PORT
require('dotenv').config({path: '/.env'})


// let db,
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'dates'

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true}, 
    () => {console.log('Connected to DB!')})

// app.get('/', async (request, response)=>{
//     db.collection('logHistory').find().sort({currentDay: 1}).toArray()
//     .then(data => {
//         response.render('index.ejs', { info: data })
//     })
//     .catch(error => console.error(error))
// })

app.get('/', async (request, response) => {
    try {
        MileageEntry.find({}, (err, entries) => {
            response.render('index.ejs' , {mileageEntries: entries})
        })
    } catch (err) {
        if (err) return response.status(500).send(err);
    }
})

// app.post('/addNewEntry', async (request, response) => {
//     db.collection('logHistory').insertOne({currentDay: request.body.currentDay,
//         vehicleUsed: request.body.vehicleUsed, odoStart: request.body.odoStart, odoEnd: request.body.odoEnd, driver: request.body.driver})
//     .then(result => {
//         console.log('Entry Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

app.post('/', async (request, response) => {
    const newEntry = new MileageEntry(
        {
            currentDay: request.body.currentDay,
            vehicleUsed: request.body.vehicleUsed,
            odoStart: request.body.odoStart,
            odoEnd: request.body.odoEnd,
            driver: request.body.driver,

        });
    try {
        await newEntry.save();
        console.log(newEntry)
        response.redirect('/');
    } catch (err) {
        if (err) return response.status(500).send(err);
        response.redirect('/');
    }
});

// app.put('/editEntry', async (request, response) => {
//     try {
//         const entryId = await request.body.itemFromJS
//         await db.collection('logHistory').findOneAndUpdate({_id: entryId},{ 
//             $set: {
//             first: request.body.first, 
//             second: request.body.second, 
//             third: request.body.third,
//             fourth: request.body.fourth, 
//             fifth: request.body.fifth
//             }
//     },
// {
//         upsert: false
//      })
//     console.log('Updated Entry')
//    return response.json('Updated It')
//     response.redirect('/')
// } catch(err) {
//     console.log(err)
// }
// })

//NEW UPDATE METHOD BYPASSING MAIN.JS FILE
app
    .route("/edit/:id")
    .get((request, response) => {
        const id = request.params.id;
        MileageEntry.find({}, (err, entries) => {
            response.render("edit.ejs", { 
                mileageEntries: entries, 
                idOfEntry: id });
        });
    })
    .post((request, response) => {
        const id = request.params.id;
        MileageEntry.findByIdAndUpdate(
            id,
            {
                currentDay: request.body.currentDay,
                vehicleUsed: request.body.vehicleUsed,
                odoStart: request.body.odoStart,
                odoEnd: request.body.odoEnd,
                driver: request.body.driver
            },
            err => {
                if (err) return response.status(500).send(err);
                response.redirect("/");
            });
    });

// app.delete('/deleteEntry', (request, response) => {
//     db.collection('logHistory').deleteOne({odoStart: request.body.begOdo, odoEnd: request.body.endOdo})
//     .then(result => {
//         console.log('Entry Deleted')
//         response.json('Entry Deleted')
//     })
//     .catch(error => console.error(error))

// })

//NEW DELETE METHOD
app
    .route("/delete/:id")
    .get((req, res) => {
        const id = req.params.id;
        MileageEntry.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})