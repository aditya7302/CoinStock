const express = require('express');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();

app.use("*",cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName: "coinstockDB",
})
.then(c=>console.log('database connected'))
.catch((e)=>console.log(e));

// const cryptoSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     icon: { type: String, required: true },
//     name: { type: String, required: true },
//     symbol: { type: String, required: true },
//     rank: { type: Number, required: true },
//     price: { type: Number, required: true },
//     priceBtc: { type: Number, required: true },
//     volume: { type: Number, required: true },
//     marketCap: { type: Number, required: true },
//     availableSupply: { type: Number, required: true },
//     totalSupply: { type: Number, required: true },
//     priceChange1h: { type: Number, required: true },
//     priceChange1d: { type: Number, required: true },
//     priceChange1w: { type: Number, required: true },
//     websiteUrl: { type: String, required: true },
//     twitterUrl: { type: String, required: true },
//     contractAddress: { type: String },
//     decimals: { type: Number },
//     exp: { type: [String] },
//   });
  
//   const Crypto = mongoose.model('Crypto', cryptoSchema);

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    watchlist: [String]
});



const User = mongoose.model("Users",userSchema);


const limit = 100;
const url = 'https://api.coinstats.app/public/v1/coins?skip=0';
const NEWS_URL = `https://api.coinstats.app/public/v1/news/latest?skip=0&limit=100`;

const isAuthenticated = (req,res, next) => {
    const {token} = req.cookies;
    if(token){
        next();
    }
    else{
        res.send("404");
    }
}



// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
//   });

  app.get('/api/coins',async (req,res)=>{
    const currency = req.query.currency;
    const response = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=${currency}`);
    const data = await response.json();
    const coinData = data.coins;
    res.json(coinData);
});

app.post('/api/coins',async (req,res)=>{
    const search = req.body;
    try{
    if(search.coin===''){
        const response = await fetch(url+`&limit=${limit}&currency=${search.currency.toUpperCase()}`);
        const data = await response.json();
        const dataArray = data.coins;
        res.json(dataArray);
    }
    else{
        const coinSearchId = search.coin.replace(/\s/g, "").toLowerCase();
        const response = await fetch(url+`&limit=${limit}&currency=${search.currency.toUpperCase()}`);
        const data = await response.json();
        const coinArray = data.coins;
        const filteredCoin = coinArray.filter((coin)=>{
            const coinId = coin.id.replace(/[\s-]/g, "").toLowerCase();
            return coinId.includes(coinSearchId);
        })
        res.json(filteredCoin);
    }
}catch(error){
    console.log(error);
}
});

app.get('/api/news', async(req,res) => {
    const response = await fetch(NEWS_URL);
    const data = await response.json();
    const newsArray = data.news;
    res.json(newsArray);
});

app.post('/api/watchlist', isAuthenticated, async(req,res)=>{
    const {token} = req.cookies;
    const data = req.body;
    const decoded = jwt.verify(token,"laksfdjlsakdjgskadg");
    const userId = decoded._id;
    const user = await User.findById(userId);
    user.watchlist = data.map(item => item.id);
    try{
        await user.save();
        res.json('200');
    }catch(err){
        res.send('505');
    }
});

app.get('/api/watchlist' , isAuthenticated , async(req,res) =>{
    res.send("200");
})

app.post('/api/signup', async(req,res)=>{
    const data = req.body;

    const alreadyRegistered = await User.findOne({email: data.email});
    if(alreadyRegistered){
        res.send('404');
    }
    else{
    const user = await User.create({
        firstname:data.firstName,
        lastname:data.lastName,
        email:data.email,
        password:data.password
    })
    res.send("200");
}

}
);

app.post('/api/login' ,async(req,res)=>{
    const data = req.body;
    const userEmail = data.email;
    const userPassword = data.password;
    const {token} = req.cookies;
    let user = await User.findOne({email :userEmail});
    if(token){
        res.send('404');
    }
    else if(!user){
        res.send('303');
    }
    else{
    const isMatch = user.password === userPassword;
    if(isMatch){
        const token = jwt.sign({_id:user._id},"laksfdjlsakdjgskadg");
        res.cookie("token",token);
    }
    res.send(isMatch ? '200' : '505');
}
});

app.get('/api/usercoins' , async(req,res)=>{
    try{
    const {token}= req.cookies;
    const decoded = jwt.verify(token,"laksfdjlsakdjgskadg");
    const userId = decoded._id;
    const user = await User.findById(userId);
    const data = user.watchlist;
    const coinDataPromises  = data.map(async (id) =>  {
        const response = await fetch(`https://api.coinstats.app/public/v1/coins/${id}?currency=USD`);
        const coin = await response.json();
        return coin.coin;
    });
    const coinData = await Promise.all(coinDataPromises);
    res.json(coinData);
}catch(error){
    console.error("Error fetching coin data:", error);
}
});



app.listen(8000,()=>{
    console.log("server is running on port 8000");
});

