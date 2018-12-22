let web3 = new Web3('http://localhost:8545');
let username = '';
let user = {
    'hbx@666':"0x97993a1cac6103941512884b052bd9b3e6dd955a",
    'client@666':"0x430b291f60e91b6cb5730bae8225330f594d7dfe"
};

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

username = getUrlParam('email');

let abi = [{ "constant": false, "inputs": [ { "name": "src", "type": "address" }, { "name": "des", "type": "address" }, { "name": "n", "type": "uint256" } ], "name": "buyHouses", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "adr", "type": "address" } ], "name": "getEnergy", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "adr", "type": "address" } ], "name": "getLoss", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "adr", "type": "address" } ], "name": "getProfit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "energyUsed", "type": "uint256" }, { "name": "adr", "type": "address" } ], "name": "repair", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "src", "type": "address" }, { "name": "des", "type": "address" }, { "name": "n", "type": "uint256" } ], "name": "sellHouses", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "currAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "energies", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lastupdateEnergy", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lastupdateLoss", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lastupdateProfit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "LossforLive", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "LossforRent", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "numForLive", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "numForRent", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "profit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "state", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
let address = "0x036121c0bb62df9aa0bea4ebf19fa7a8f93ee346";
let houseContract = new web3.eth.Contract(abi, address);

$("#cmpname").text("HI, " + username);

$("#update").click(function () {
    houseContract.methods.lastupdateProfit(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#prftUpdate').text(result);
    });

    houseContract.methods.lastupdateEnergy(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#eUpdate').text(result);
    });
    houseContract.methods.numForRent(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#rentN').text(result);
    });

    houseContract.methods.numForLive(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#rentL').text(result);
    });

    houseContract.methods.state(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#status').text(result);
    });

    web3.eth.getBalance(user['hbx@666'])
        .then(function (result) {
            $('#mycoin').text(result);

        });
});

$("#buy").click(function () {
    $.get('http://localhost:3000/home', {command: "buy"})
        .done(function (data) {
            console.log(data);

        });

});

$("#sell").click(function () {
    $.get('http://localhost:3000/home', {command: "sell"})
        .done(function (data) {
            console.log(data);

        });
});

