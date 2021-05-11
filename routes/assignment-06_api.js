// TODO: 返回值，返回时间不统一
var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dbName = 'shop2';
const url = "mongodb+srv://VBGvjoZ1xZhvfN37:tZmWKWWHSjMw6FWD@cluster0.bhrzt.mongodb.net/" + dbName + "?retryWrites=true&w=majority";

const CO_USERS = 'users';
const CO_ITEMS = 'goods';
const CO_ORDERS = 'orders';

// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

/* GET api main */
router.get('/', function(req, res, next) {
    res.send('this is api');
});

/** POST **/

/**
 * Add User
 */
router.post('/post/user', function(req, res, next) {
    insertDoc(CO_USERS, JSON.parse(req.body.data));
    res.send(req.body.data);
});


/**
 * Add Item
 */
router.post('/post/item', function(req, res, next) {
    insertDoc(CO_ITEMS, JSON.parse(req.body.data));
    res.send(req.body.data);
});

/**
 * Add Order
 */
router.post('/post/order', function(req, res, next) {
    insertDoc(CO_ORDERS, JSON.parse(req.body.data));
    res.send(req.body.data);
});

/** GET **/

/**
 * Select User
 */
router.get('/get/users', function(req, res, next) {
    selectAll(CO_USERS).then(data => { res.send(data); });
});

router.get('/get/user/:id/aa', function(req, res, next) {
    res.send(req.params.id);
});

/**
 * Select Item
 */
router.get('/get/items', function(req, res, next) {
    selectAll(CO_ITEMS).then(data => { res.send(data); });
});

/**
 * Select Order
 */
router.get('/get/orders', function(req, res, next) {
    selectAll(CO_ORDERS).then(data => { res.send(data); });
});

/**
 * Search User
 */

/**
 * Search Item
 */

/**
 * Search Order
 */

/** PUT **/

/**
 * Update User
 */
router.put('/put/user', function(req, res, next) {
    res.send(updateOne(CO_USERS, req.body.data));
});

/**
 * Update Item
 */
router.put('/put/item', function(req, res, next) {
    res.send(updateOne(CO_ITEMS, req.body.data));
});

/**
 * Update Order Address
 */
router.put('/put/order/address', function(req, res, next) {
    res.send(updateOne(CO_ORDERS, req.body.data));
});


/** DELETE **/

/**
 * Delete User
 */
router.delete('/delete/user', function(req, res, next) {
    res.send(deleteOne(CO_USERS, JSON.parse(req.body.data).where.id));
});

/**
 * Delete Item
 */
router.delete('/delete/item', function(req, res, next) {
    res.send(deleteOne(CO_ITEMS, JSON.parse(req.body.data).where.id));
});

/**
 * Delete Order
 */
router.delete('/delete/order', function(req, res, next) {
    res.send(deleteOne(CO_ORDERS, JSON.parse(req.body.data).where.id));
});

/**
 * Insert One Document
 * @param co, Collection
 * @param data, Document
 * @returns {info}
 */
function insertDoc(co, data){
    let re = null;
    MongoClient.connect(url, (err, con)=>{
        let db = con.db(dbName);
        db.collection(co).insertOne(data, function(err, info){
            con.close();
            re = info;
        });
    });
    return re;
}


/**
 * Select All Document of Co
 */
function selectAll(co) {
    return new Promise(resolve => {
        MongoClient.connect(url, { useUnifiedTopology: true },(err, con)=>{
            let db = con.db(dbName);
            db.collection(co).find({}).toArray((err, data)=>{
                con.close();
                resolve(data);
            });
        });
    });
}

/**
 * Update One Document of Collection
 */
/**
 * Update One Document of Collection
 * @param co
 * @param data, Json String
 * @returns {string}
 */
function updateOne(co, data){
    data = JSON.parse(data)
    let where = { _id: ObjectId(data.where.id) }
    let doc = {$set: data.doc};
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, con)=>{
        let db = con.db(dbName);
        db.collection(co).updateOne(where, doc, ()=>{
            con.close();
            console.log('== update one document');
        });
    });

    return '== Update ' + JSON.stringify(where) + ' Info: ' + JSON.stringify(doc) + ' ==';
}

/**
 * Delete One Document of Co by Id
 */
function deleteOne(co, id){
    let where = { _id: ObjectId(id) }
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, con)=>{
        let db = con.db(dbName);
        db.collection(co).deleteOne(where, ()=>{
            con.close();
            console.log('== deleted one document');
        });
    });

    return '== Delete One Document Which Id is ' + JSON.stringify(where) + ' ==';
}

module.exports = router;
