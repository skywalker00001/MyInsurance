# 区块链项目之--MyInsurance智能合约实现保险
先放github源码地址[github项目地址](https://github.com/skywalker00001/MyInsurance)

## 一、选题背景与依据
对于期末project要使用智能合约解决现实问题，想来想去，基于智能合约的可在无第三方的情况下实现可信交易的核心特点，除了众所周知的货币，投票和拍卖等功能，我想到的是用区块链的智能合约实现保险系统。

在这个保险系统中，保险公司可以制作投保规则（投保人投多少钱、什么情况下赔多少钱、投保期限）。而投保人在接受了保险公司的提议后可参与投保，并将保险金上交给智能合约；与此同时保险公司也要把最大索赔近金上交智能合约。如果投保期限过了而投保人没有出现意外，则投保金与索赔金一起转入保险公司。如果在期间内投保人出了意外则保险人收取相应的索赔金。这样，用智能系统就保证了当投保人出了问题，保险公司不会耍赖（无需通过法院打官司来解决）。当然，投保人也可以选择提前终止合约，退出保险，不过他只能拿回一小部分钱而已。对于如何鉴定投保人是否满足索赔标准，我的设想当然是最好由智能合约智能判断，这样更会减少第三方判定的不公正。不过，经过考虑，最终决定用一个指定账户提供认证功能。

## 二、使用说明
### 1.clone
git clone代码到本地。
### 2.打开geth
geth开启私链，`personal.newAccount("");`新创两个用户。接着再`personal.unlockAccount(eth.accounts[0],"");`解锁用户。
### 3.部署智能合约
复制MyInsurance.sol到Remix IDE上，编译并部署。我的智能合约代码如下：
```c
pragma solidity ^0.4.22;

contract MyInsurance {
  address public assurerCompany; // 公司
  //uint256 public market;
  struct Insurance {
    string name; //合约名称
    address policyHolder; //投保人
    address notary; //公证人
    uint256 startTime; //开始时间
    uint256 timeLimit; //以秒作单位，持续时长
    uint256 insuranceMoney; //保险费
    uint256 insuranceProceed; //赔款金额
    bool valid; //有效否
    uint256 copies; //保险份数，一旦为0就无法再卖出了
  }
  Insurance[] insurances; //此公司发布的所有保险类型
  mapping(address => Insurance[]) public holders; //个人投过这家公司的所有保险集合
  //uint256 index;
  function MyInsurance() public {
    assurerCompany = msg.sender;
  }
  function generateInsurance(string name_, address notary_, uint256 timeLimit_, 
    uint256 insuranceMoney_, uint256 insuranceProceed_, uint256 copies_) public payable{
    require(msg.sender == assurerCompany,
      "Only assurerCompany can generate insurances."
    );
    require(msg.value == SafeMath.mul(insuranceProceed_, copies_),
      "You should give out right insurance money into contract first."
    );
    insurances.push(Insurance({
      name: name_,
      policyHolder: 0,
      notary: notary_,
      startTime: 0,
      timeLimit: timeLimit_,
      insuranceMoney: insuranceMoney_,
      insuranceProceed: insuranceProceed_,
      valid: false,
      copies: copies_
    }));
    //this.balance.transfer(msg.value);
  }
  function getAssurerCompany() public view returns(address assurerCompany_) {
    return assurerCompany;
  }
  function gentInsurancesNumber() public view returns(uint256 insurancesNumber_) {
    return insurances.length;
  }
  function gentOneInsurance(uint256 index) public view returns(string name_, address notary_,
   uint256 timeLimit_, uint256 insuranceMoney_, uint256 insuranceProceed_, uint256 copies_) {
    return (insurances[index - 1].name, insurances[index - 1].notary, insurances[index - 1].timeLimit,
      insurances[index - 1].insuranceMoney, insurances[index - 1].insuranceProceed, insurances[index - 1].copies);
  }
  function insure(uint256 index) public payable {
    require(msg.value == insurances[index - 1].insuranceMoney,
      "Your money should be equal than insurace money.");
    require(insurances[index - 1].copies != 0,
      "This contract has been sold out");
    holders[msg.sender].push(Insurance({
      name: insurances[index - 1].name,
      policyHolder: msg.sender,
      notary: insurances[index - 1].notary,
      startTime: now,
      timeLimit: insurances[index - 1].timeLimit,
      insuranceMoney: insurances[index - 1].insuranceMoney,
      insuranceProceed: insurances[index - 1].insuranceProceed,
      valid: true,
      copies: 1
    }));
    insurances[index - 1].copies = SafeMath.sub(insurances[index - 1].copies, 1);
    //this.balance.transfer(msg.value);
  }
  function getHolderInsurancesNumber(address holder) public view returns(uint256 myInsurancesNumber_) {
    return holders[holder].length;
  }
  function getHolderOneInsurance(address holder, uint256 index) public view returns(string name_, address notary_, uint256 startTime,
   uint256 timeLimit_, uint256 insuranceMoney_, uint256 insuranceProceed_) {
    require(holders[holder][index - 1].valid == true,
      "This contract has been invalid.");
    require(SafeMath.add(holders[holder][index - 1].startTime, 
        holders[holder][index - 1].timeLimit) >= now,
      "This contract has met the time limit.");
    return (holders[holder][index - 1].name, holders[holder][index - 1].notary, holders[holder][index - 1].startTime,
      holders[holder][index - 1].timeLimit, holders[holder][index - 1].insuranceMoney, holders[holder][index - 1].insuranceProceed);
  }
  function meetInsuranceCondition(address holder, uint256 index) public {
    require(msg.sender == holders[holder][index - 1].notary,
      "You are not the notary of this contract");
    require(holders[holder][index - 1].valid == true,
      "This contract has been invalid.");
    require(SafeMath.add(holders[holder][index - 1].startTime, 
        holders[holder][index - 1].timeLimit) >= now,
      "This contract has met the time limit.");
    holder.transfer(holders[holder][index - 1].insuranceProceed);
    assurerCompany.transfer(holders[holder][index - 1].insuranceMoney);
    holders[holder][index - 1].copies = 0;
    holders[holder][index - 1].valid = false;
  }
  function getInsuranceLastTime(address holder, uint256 index) public view returns(uint256 lastTime){
    require(SafeMath.add(holders[holder][index - 1].startTime, 
        holders[holder][index - 1].timeLimit) >= now,
      "This contract has met the time limit.");
    require(holders[msg.sender][index - 1].valid == true,
      "This contract has been invalid.");
    return (SafeMath.sub(SafeMath.add(holders[holder][index - 1].startTime, 
        holders[holder][index - 1].timeLimit), now)); 
  }
  function getInsuranceMoneyIntoCompany(address holder, uint256 index) public {
    require(
      msg.sender == assurerCompany,
      "Only assurerCompany can get the insurance money."
    );
    require(holders[holder][index - 1].valid == true,
      "This contract has been invalid.");
    require(
      SafeMath.add(holders[holder][index - 1].startTime, 
        holders[holder][index - 1].timeLimit) <= now,
      "Limit time has not been met yet. Please wait for some time.");
    assurerCompany.transfer(SafeMath.add(holders[holder][index - 1].insuranceMoney, holders[holder][index - 1].insuranceProceed));
    holders[holder][index - 1].copies = 0;
    holders[holder][index - 1].valid = false;
  }
  function getBalance() public view returns (uint256 balance_) {
    return this.balance;
  }
}


library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) { // 安全乘法
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) { // 安全除法
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  /**
  * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) { // 安全减法
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) { // 安全加法
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}
```
### 4.复制abi和address
首先在compile模块找到detials，点击其中的abi复制到home.js的相应位置。
![](C:\Users\55208\Desktop\42.png)![](C:\Users\55208\Desktop\41.png);
接着到run模块找到刚刚部署的智能合约的地址，复制下来粘贴到指定位置。
![](C:\Users\55208\Desktop\43.png)![](C:\Users\55208\Desktop\44.png)
最后，运行app.js就可以了。
![](C:\Users\55208\Desktop\45.png)

## 三、测试
打开网页，进入signin界面。输入用户名和它的地址（用户名其实就是createaccount的时候你输入的密码。。。）
![](C:\Users\55208\Desktop\30.png)
如果输入的用户名有错，那么返回页面如下：
![](C:\Users\55208\Desktop\31.png)
输入正确的用户名，进入home界面。左上角可以看到账号余额。由于123456这个账号是合约的部署者，因此它的余额为1000。普通人的余额是100。
![](C:\Users\55208\Desktop\10.png)
只有合约的部署者（即保险公司）才可以发布保险
![](C:\Users\55208\Desktop\11.png)
部署成功，由于proceed索赔金是100，因此保险公司余额变为900
![](C:\Users\55208\Desktop\12.png)
任何人都可以查看保险的总数目。
![](C:\Users\55208\Desktop\13.png)
由编号查看某个具体的保险
![](C:\Users\55208\Desktop\14.png)
![](C:\Users\55208\Desktop\15.png)

我们现在需要切换一个用户。切换到普通用户111，进行投保。投保的编号是第0号。
![](C:\Users\55208\Desktop\16.png)
如果时间没结束之前，第三方认证机构可以认证保险达到索赔标。那么money（投保金）会转给公司，proceed(索赔金)转给用户。
![](C:\Users\55208\Desktop\17.png)
现在111的账号余额为100-10+100=190。保险公司为910
![](C:\Users\55208\Desktop\18.png)
123456（保险公司）余额为1000-100
![](C:\Users\55208\Desktop\20.png)
重新做一次刚才的操作。如果时间结束还没有触发“达成”时间，那么时间结束后保险公司可以点击“到期”将保险金和索赔金一起钱收入囊中。
![](C:\Users\55208\Desktop\21.png)