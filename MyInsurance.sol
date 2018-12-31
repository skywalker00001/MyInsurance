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