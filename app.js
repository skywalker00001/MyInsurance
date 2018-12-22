let express = require('express');
let bodyParser = require('body-parser');
//let Web3 = require('web3');

let app = express();
let user = {
    'hbx@666':"0x97993a1cac6103941512884b052bd9b3e6dd955a",
    'client@666':"0x430b291f60e91b6cb5730bae8225330f594d7dfe"
};


app.use(express.static('pages'));
app.use(bodyParser.urlencoded({extended: false}));


app.route('/signin')
    .get(function (req, res) {
        res.sendfile('pages/signin/signin.html');
    })

    .post(function (req, res) {

        if (req.body.email in user) {
            //res.send("Welcome");
            res.redirect('/home?' + 'email=' + req.body.email);
        }
        else {
            res.send("accounts not exist");
        }

    });

app.route('/home')
    .get(function (req, res)  {
        // console.log(req.query);
        // email = req.query.email;
        res.sendfile('pages/home/home.html');

    })
    .post(function (req, res) {

    });

app.listen(3000, function () {
    console.log('Example listen on port 3000');

});