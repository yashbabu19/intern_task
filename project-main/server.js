require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');
const path=require("path")

mongoose.connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log("MongoDB Connection Failed"));

const port = process.env.PORT || 3001
app.get('/', (req,res)=>{
        res.sendFile(path.join(__dirname,'/index.html'))
    })
    app.get('/otpverify.html',function(req,res) {
        res.sendFile(path.join(__dirname,'otpverify.html'));
      });
      app.get('/loggedIn.html',function(req,res) {
        res.sendFile(path.join(__dirname,'loggedIn.html'));
      });

      
app.listen(port, () => {
    console.log(`App running on port ${port}!`)
})