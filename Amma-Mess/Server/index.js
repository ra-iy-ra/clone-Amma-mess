const express = require('express');
const mongoose = require('mongoose')

const cors = require('cors')


const app = express()

app.use(express.json()) 

app.use(cors())


mongoose.connect('mongodb://localhost:27017/employee')
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


const clusterRoutes = require('./routes/Clusters');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/Menus'); 



app.use('/api', menuRoutes);
app.use('/api', clusterRoutes);
app.use('/api/auth',authRoutes);



app.listen(3001, () => {
    console.log("server is running")
})