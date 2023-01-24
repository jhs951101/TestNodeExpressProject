const path = require('path');

const expressController = require(path.join(__dirname, 'controller', 'ExpressController.js'));
const dbController = require(path.join(__dirname, 'controller', 'MysqlController.js'));

const exp = expressController.getObject();

exp.get('/get', function(req, res){
    var result = {};
    result['success'] = false;

    const username = req.query.username;
    const password = req.query.password;

    if(username && password){
        result['name'] = '심지훈';
        result['age'] = 25;
        result['success'] = true;
    }

    res.json(result);
});

exp.post('/postjson', function(req, res){
    var result = {};
    result['success'] = false;

    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        result['name'] = '심지훈';
        result['age'] = 25;
        result['success'] = true;
    }

    res.json(result);
});

exp.get('/db', async function(req, res){
    var result = {};
    result['success'] = false;

    var resultset = await dbController.executeQuery('SELECT * FROM test_user LIMIT 1');

    if(resultset['success']){
        result['username'] = resultset['results'][0]['username'];
        result['name'] = resultset['results'][0]['name'];
        result['success'] = true;
    }

    res.json(result);
});