let express = require('express');
let bodyParser = require('body-parser');
//let Web3 = require('web3');

let app = express();
let user = {
    'hbx@666':"0x97993a1cac6103941512884b052bd9b3e6dd955a",
    'client@666':"0x430b291f60e91b6cb5730bae8225330f594d7dfe"
};

// /*----------------------eth--------------------------*/
// let web3 = new Web3('http://localhost:8545');
// //web3.eth.getAccounts(console.log);
// web3.eth.getBalance(user['hbx@666'])
//     .then(console.log);
// let abi = [{ "constant": false, "inputs": [ { "name": "src", "type": "address" }, { "name": "des", "type": "address" }, { "name": "n", "type": "uint256" } ], "name": "buyHouses", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "adr", "type": "address" } ], "name": "getEnergy", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "adr", "type": "address" } ], "name": "getLoss", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "adr", "type": "address" } ], "name": "getProfit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "energyUsed", "type": "uint256" }, { "name": "adr", "type": "address" } ], "name": "repair", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "src", "type": "address" }, { "name": "des", "type": "address" }, { "name": "n", "type": "uint256" } ], "name": "sellHouses", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "currAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "energies", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lastupdateEnergy", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lastupdateLoss", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lastupdateProfit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "LossforLive", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "LossforRent", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "numForLive", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "numForRent", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "profit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "state", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
// let address = "0x036121c0bb62df9aa0bea4ebf19fa7a8f93ee346";
// let houseContract = new web3.eth.Contract(abi, address);
// // houseContract.methods.currAddress().call({from: user['hbx@666']}).then(function (result) {
// //     console.log(result);
// // });
//
//
// var info = {
//     "lastupdateProfit":0,
//     "lastupdateLoss":0,
//     "lastupdateEnergy":0,
//     "NumforRent":0,
//     "NumforLive":0,
//     "status":false
// };
//
// // houseContract.methods.numForLive(user['hbx@666']).call({from: user['hbx@666']}).then(function (result) {
// //     console.log(result);
// // });
//
// function getLastupdateProfit(userAdd){
//     houseContract.methods.lastupdateProfit(userAdd).call({from: userAdd}).then(function (result) {
//         info['lastupdateProfit'] = result;
//         console.log(Date.now() + ':upro '  + info['lastupdateProfit']);
//         return result + ": 1";
//         //console.log(info);
//     }).then(function (result) {
//         console.log(result);
//
//     });
//
// }
//
// function getLastupdateLoss(userAdd){
//     houseContract.methods.lastupdateLoss(userAdd).call({from: userAdd}).then(function (result) {
//         info['lastupdateLoss'] = result;
//         console.log(Date.now() + ':ulos ' + info['lastupdateLoss']);
//     });
//
// }
//
// function getLastupdateEnergy(userAdd) {
//     houseContract.methods.lastupdateEnergy(userAdd).call({from: userAdd}).then(function (result) {
//         info['lastupdateEnergy'] = result;
//         console.log(Date.now(), ':ue: ' + info['lastupdateEnergy']);
//     });
//
// }
//
// function getNumforRent(userAdd) {
//     houseContract.methods.numForRent(userAdd).call({from: userAdd}).then(function (result) {
//         info['NumforRent'] = result;
//         console.log(Date.now(), ':nr: ' + info['NumforRent']);
//     });
//
// }
//
// function getNumforLive(userAdd) {
//     houseContract.methods.numForLive(userAdd).call({from: userAdd}).then(function (result) {
//         info['NumforLive'] = result;
//         console.log(Date.now(), ': nL: ' + info["NumforLive"]);
//     });
//
// }
//
// function getUsrStatus(userAdd){
//     houseContract.methods.state(userAdd).call({from: userAdd}).then(function (result) {
//         info['status'] = result;
//         console.log(Date.now(), ": us: "+ info["status"]);
//     });
// }
// /*----------------------------------------------------*/


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
        console.log(req.query);
        email = req.query.email;

        if('command' in req.query){
            let command = req.query.command;
            switch (command) {
                case 'update':
                    console.log('update');
                    // let promise = new Promise(function(){
                    //         getLastupdateProfit(user['hbx@666']);
                    //         // getLastupdateLoss(user['hbx@666']);
                    //         // getLastupdateEnergy(user['hbx@666']);
                    //         // getNumforRent(user['hbx@666']);
                    //         // getNumforLive(user['hbx@666']);
                    //         // getUsrStatus(user['hbx@666']);
                    //
                    // }).then(function () {
                    //     console.log('haha');
                    //     console.log(info);
                    // }).catch(function () {
                    //     console.log('fail')
                    //
                    // });
                    break;
                case 'sell':
                    console.log('sell');
                    break;
                case 'buy':
                    console.log('buy');
                    break;
                default:
                    console.log('??');
            }
        }
        else {

            res.sendfile('pages/home/home.html');
        }

    })
    .post(function (req, res) {
        console.log('post');

    });

app.listen(3000, function () {
    console.log('Example listen on port 3000');

});