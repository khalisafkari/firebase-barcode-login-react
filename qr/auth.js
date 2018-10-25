const app = require('express').Router();
const admin = require('firebase-admin');
const uuid = require('uuid/v4');
const qrcode = require('qrcode');

const serve = admin.initializeApp({
    credential:admin.credential.cert(require('./service.json')),
    databaseURL:'',
})

const db = serve.database();

app.get('/',(req,res)=>{
    qrcode.toDataURL(uuid(),(err,url)=>{
        if(err) throw err;
        res.send(`<img src='${url}'>`)
    })
})

app.all('/valid/:uuid',(req,res)=>{
    const uid = req.params.uuid;
    const query = req.query.email;
    db.ref('qr').child(uid).set({
        id:uid,
        status:true,
        email:query
    }).then(resp=>{
        res.send({
            data:'success'
        })
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = app;