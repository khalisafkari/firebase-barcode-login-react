const app = require('express')();
const cors = require('cors');
const body = require('body-parser');
const helmet = require('helmet');
const qr_router = require('./qr/auth');

//midleware
app.disable('x-powered-by');
app.use(cors());
app.use(body.json());
app.use(helmet({
    noSniff:true,
}))

//routing
app.use('/qr',qr_router);

app.listen(3000);