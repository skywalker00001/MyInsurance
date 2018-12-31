let express = require('express');
let bodyParser = require('body-parser');
// let jade = require('jade');
//let Web3 = require('web3');

let app = express();
let user = {
    '123456':"0x88bd7f11fa82549437a73c4e7ebb61868f8557ed",
    '111':"0x09804ee139a8f8858cdade5456ffc53f5aede31f"
};



app.use(express.static('pages'));
app.use(bodyParser.urlencoded({extended: false}));


app.route('/signin')
    .get(function (req, res) {
        res.sendfile('pages/signin/signin.html');
    })

    .post(function (req, res) {

        if (req.body.Username in user) {
            //res.send("Welcome");
            res.redirect('/home?' + 'username=' + req.body.username);
        }
        else {
            res.send("Wrong username or address!");
        }
    });

app.route('/home')
    .get(function (req, res)  {
        // console.log(req.query);
        // username = req.query.username;
        res.sendfile('pages/home/home.html');

    })
    .post(function (req, res) {

    });

app.listen(3000, function () {
    console.log('Example listen on port 3000');

});