let web3 = new Web3('http://localhost:8545');
let username = '';
serverAdd = "http://localhost:3000/home?email="+username;

let user = {
    '123456':"0x88bd7f11fa82549437a73c4e7ebb61868f8557ed",
    '111':"0x09804ee139a8f8858cdade5456ffc53f5aede31f"
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
				"name": "name_",
				"type": "string"
			},
			{
				"name": "notary_",
				"type": "address"
			},
			{
				"name": "timeLimit_",
				"type": "uint256"
			},
			{
				"name": "insuranceMoney_",
				"type": "uint256"
			},
			{
				"name": "insuranceProceed_",
				"type": "uint256"
			},
			{
				"name": "copies_",
				"type": "uint256"
			}
		],
		"name": "generateInsurance",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "holder",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getInsuranceMoneyIntoCompany",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "insure",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "holder",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "meetInsuranceCondition",
		"outputs": [],
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
		"name": "assurerCompany",
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
		"inputs": [],
		"name": "gentInsurancesNumber",
		"outputs": [
			{
				"name": "insurancesNumber_",
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "gentOneInsurance",
		"outputs": [
			{
				"name": "name_",
				"type": "string"
			},
			{
				"name": "notary_",
				"type": "address"
			},
			{
				"name": "timeLimit_",
				"type": "uint256"
			},
			{
				"name": "insuranceMoney_",
				"type": "uint256"
			},
			{
				"name": "insuranceProceed_",
				"type": "uint256"
			},
			{
				"name": "copies_",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAssurerCompany",
		"outputs": [
			{
				"name": "assurerCompany_",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "balance_",
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
				"name": "holder",
				"type": "address"
			}
		],
		"name": "getHolderInsurancesNumber",
		"outputs": [
			{
				"name": "myInsurancesNumber_",
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
				"name": "holder",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getHolderOneInsurance",
		"outputs": [
			{
				"name": "name_",
				"type": "string"
			},
			{
				"name": "notary_",
				"type": "address"
			},
			{
				"name": "startTime",
				"type": "uint256"
			},
			{
				"name": "timeLimit_",
				"type": "uint256"
			},
			{
				"name": "insuranceMoney_",
				"type": "uint256"
			},
			{
				"name": "insuranceProceed_",
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
				"name": "holder",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getInsuranceLastTime",
		"outputs": [
			{
				"name": "lastTime",
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
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "holders",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "policyHolder",
				"type": "address"
			},
			{
				"name": "notary",
				"type": "address"
			},
			{
				"name": "startTime",
				"type": "uint256"
			},
			{
				"name": "timeLimit",
				"type": "uint256"
			},
			{
				"name": "insuranceMoney",
				"type": "uint256"
			},
			{
				"name": "insuranceProceed",
				"type": "uint256"
			},
			{
				"name": "valid",
				"type": "bool"
			},
			{
				"name": "copies",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
let address = "0xb5fb3736f3d93ee8412bb908db76f0487970e072";
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



$("#cmpname").text("HI, 123456. Your balance is: 1000" );

$("#update").click(function () {
    myupdate()

});

$("#look").click(function () {
    if ($("#xxx").text() != "") 
        $("#xxx").text("");
    else {

        houseContract.methods.assurerCompany().call({from:user[username]}).then(function (result) {
            console.log(result);
            $("#xxx").text(result);
    
        })
    }



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

