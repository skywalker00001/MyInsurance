pragma solidity ^0.4.18;

contract housekeeper {
    mapping (address => uint256) public energies;
    mapping (address => uint256) public LossforRent;
    mapping (address => uint256) public LossforLive;
    mapping (address => uint256) public profit; // calculate gain
    mapping (address => uint256) public lastupdateLoss; //used for time
    mapping (address => uint256) public lastupdateEnergy; //used for energy
    mapping (address => uint256) public lastupdateProfit; //used for profit
    mapping (address => uint256) public numForRent;
    mapping (address => uint256) public numForLive;
    mapping (address => bool) public state;
    address public currAddress;
    uint256 lifeperhouse = 1000;
    uint256 pricePerHouse = 20000;
    
    function housekeeper() public {
        currAddress = msg.sender;
        lastupdateLoss[currAddress] = now;
        lastupdateProfit[currAddress] = now;
        lastupdateEnergy[currAddress] = now;
        numForRent[currAddress] = 1;
        numForLive[currAddress] = 1; // intiate two houses
        state[currAddress] = true;
        energies[currAddress] = 10;
        profit[currAddress] = 0;
    }
    
    function getLoss(address adr) public {
        require(state[adr]);
        uint256 time = SafeMath.sub(now, lastupdateLoss[adr]);
        LossforLive[adr] = SafeMath.mul(1, time);
        LossforRent[adr] = SafeMath.mul(3, time);
        if (LossforRent[adr] > lifeperhouse) {
            numForRent[adr] = SafeMath.sub(numForRent[adr], SafeMath.mod(LossforRent[adr], lifeperhouse));
            LossforRent[adr] = 0;
        }
        if (LossforLive[adr] > lifeperhouse) {
            numForLive[adr] = SafeMath.sub(numForLive[adr], SafeMath.mod(LossforLive[adr], lifeperhouse));
            LossforLive[adr] = 0;
        }
        if (LossforLive[adr] == 0 && LossforRent[adr] == 0) {
            state[adr] = false;
        }
        lastupdateLoss[adr] = now;
        
    }
    
    function repair(uint256 energyUsed, address adr) public {
        uint256 availE = getEnergy(adr);
        require(state[adr]);
        require(availE > energyUsed);
        energies[adr] = SafeMath.sub(energies[adr], energyUsed);
        LossforRent[adr] = SafeMath.add(LossforRent[adr], SafeMath.div(energyUsed, numForRent[adr]));
        LossforLive[adr] = SafeMath.add(LossforLive[adr], SafeMath.div(energyUsed, numForLive[adr]));
        lastupdateLoss[adr] = now;
        lastupdateEnergy[adr] = now;
        
    }
    
    function getEnergy(address adr) public returns (uint256){
        require(state[adr]);
        if (energies[adr] <= 0) {
            state[adr] = false;
            return 0;
        }
        uint256 time = now - lastupdateEnergy[adr];
        if (numForLive[adr] <= 0) {
            energies[adr] = SafeMath.sub(energies[adr], SafeMath.mul(time, 2)); // no house for live, lose energy
            if (energies[adr] <= 0) {
                state[adr] = false;
                return 0;
            }
        }
        else {
            energies[adr] = SafeMath.add(energies[adr], SafeMath.mul(time, 2));
        }
        lastupdateEnergy[adr] = now;
        return energies[adr];
    }
    
    function getProfit(address adr) public returns (uint256) {
        require(state[adr]);
        uint256 time = SafeMath.sub(now, lastupdateProfit[adr]);
        uint256 gain = SafeMath.mul(numForRent[adr], time);
        lastupdateProfit[adr] = now;
        profit[adr] = profit[adr] + gain;
        return gain;
    }
    
    function sellHouses(address src, address des, uint256 n) public returns (bool) {
        require(state[src]);
        require(state[des]);
        require(numForRent[src] > 0);
        require(numForRent[src] > n);
        require(getProfit(des) > SafeMath.mul(n, pricePerHouse));
        numForRent[src] = SafeMath.sub(numForRent[src], n);
        profit[src] = SafeMath.add(profit[src], SafeMath.mul(n, pricePerHouse));
        numForRent[des] = SafeMath.add(numForRent[des], n);
        profit[des] = SafeMath.sub(profit[des], SafeMath.mul(n, pricePerHouse));
        lastupdateProfit[src] = now;
        lastupdateProfit[des] = now;
        return true;
    }
    
    function buyHouses(address src, address des, uint256 n) public returns (bool) {
        require(state[src]);
        require(state[des]);
        require(numForRent[des] > 0);
        require(numForRent[des] > n);
        require(getProfit(src) > SafeMath.mul(n, pricePerHouse));
        numForRent[src] = SafeMath.add(numForRent[src], n);
        profit[src] = SafeMath.sub(profit[src], SafeMath.mul(n, pricePerHouse));
        numForRent[des] = SafeMath.sub(numForRent[des], n);
        profit[des] = SafeMath.add(profit[des], SafeMath.mul(n, pricePerHouse));
        lastupdateProfit[src] = now;
        lastupdateProfit[des] = now;
        return true;
    }
    
}


/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {
    /**
    * @dev Multiplies two numbers, reverts on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
    * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
    * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
    * reverts when dividing by zero.
    */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}
