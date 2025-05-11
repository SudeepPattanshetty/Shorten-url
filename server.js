const express = require("express")
const app = express();
const PORT = 8001;
const urlRoute = require('./router/urlRouter')
const staticRoute = require('./router/staticRoute')
const userRoute = require('./router/userRoute');
const URL = require('./models/urlSchema');
const path = require('path')
const { connectToMongoDB } = require("./connect");
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
// const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => { console.log('MongoDB Connected') })

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'));
    
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(checkForAuthentication);

app.use("/url", restrictTo(['NORMAL', 'ADMIN']), urlRoute);
app.use("/", staticRoute);
app.use('/user', userRoute);

app.get('/:shortId', async(req, res) => {
    const shortId= req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, 
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send('URL not found');
    }

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT} `);
})