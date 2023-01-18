module.exports = {
    getObject: function(){
        const express = require('express');
        const app = express();

        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        app.listen(8080, function(){
            console.log('Server Executed! Listening on 8080');
        });

        return app;
    }
}