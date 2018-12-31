let web3 = new Web3('http://localhost:8545');
let username = '';
serverAdd = "http://localhost:3000/home?email="+username;

let user = {
    'hbx@666':"0x97993a1cac6103941512884b052bd9b3e6dd955a",
    'client@666':"0x430b291f60e91b6cb5730bae8225330f594d7dfe"
};

$.post(serverAdd, {'name': username}, function (data) {
    console.log("haha");
    console.log(data);
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

username = getUrlParam('email');




let abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "src",
                "type": "address"
            },
            {
                "name": "des",
                "type": "address"
            },
            {
                "name": "n",
                "type": "uint256"
            }
        ],
        "name": "buyHouses",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "getEnergy",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "getLoss",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "getProfit",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "energyUsed",
                "type": "uint256"
            },
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "repair",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "src",
                "type": "address"
            },
            {
                "name": "des",
                "type": "address"
            },
            {
                "name": "n",
                "type": "uint256"
            }
        ],
        "name": "sellHouses",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "currAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "energies",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "lastupdateEnergy",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "lastupdateLoss",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "lastupdateProfit",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "LossforLive",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "LossforRent",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "numForLive",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "numForRent",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "profit",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "state",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
let address = "0xd3671222a9df024f8d0e12c07aa2f0fd7cebd46d";
let houseContract = new web3.eth.Contract(abi, address);

function myupdate() {
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
        $('#NumforRent').text(result);
    });

    houseContract.methods.numForLive(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#NumforLive').text(result);
    });

    houseContract.methods.state(user[username]).call({from: user[username]}).then(function (result) {
        console.log(result);
        $('#status').text(result);
    });

    web3.eth.getBalance(user['hbx@666'])
        .then(function (result) {
            $('#mycoin').text(result);

        });

    houseContract.methods.getEnergy(user[username]).call({from:user[username]}).then(function (result) {
        console.log(result);
        $("#tenergy").text(result);

    })

    houseContract.methods.getProfit(user[username]).call({from:user[username]}).then(function (result) {
        console.log(result);
        $("#tprofit").text(result);

    })

    houseContract.methods.getLoss(user[username]).call({from:user[username]}).then(function (result) {
        console.log(result);
        $("#thouse").text(result);

    })

}



$("#cmpname").text("HI, " + username);

$("#update").click(function () {
    myupdate()

});

$("#buy").click(function () {
    profit = parseInt($("#tprofit").text());
    if (profit < 20000) {
        alert("you have no money left");
    }
    else {
        NumforRent = $("#NumforRent").text();
        NumforRent ++;
        profit -= 20000;
        $("#NumforRent").text(NumforRent);
        $("#tprofit").text(profit);

    }


});

$("#sell").click(function () {
    NumforRent = parseInt($("#NumforRent").text());
    profit = parseInt($("#tprofit").text());
    if (NumforRent <= 0) {
        alert("you have no house for sell")
    }
    else {
        NumforRent--;
        $("#NumforRent").text(NumforRent);
        profit += 20000;
        $("#tprofit").text(profit);

    }

});

