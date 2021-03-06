const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')

//settings
app.set('port', process.env.PORT || 8080);

//middleware
app.use(express.json())
app.use(cors())

//routes
const recordRoutes = require('./routes/RecordRoutes')
app.use('/records', recordRoutes)
const authRoutes = require('./routes/AuthRoutes')
app.use('/auth', authRoutes)
const categoryRoutes = require('./routes/CategoryRoutes')
app.use('/categories', categoryRoutes)

//server
db.sequelize.sync().then(() => {
    app.listen(app.get('port'), ()=>{
        console.log('Server running on port: '+ app.get('port'))
    })
})