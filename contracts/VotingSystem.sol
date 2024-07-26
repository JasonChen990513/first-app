// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

//register account to vote
//decide who are nominated
//voting
//calculate the result
//send the winner message

/// @title Voting System
/// @author Jason
/// @notice This contract allows users to register, nominate, and vote for candidates.
/// @dev This contract includes stages for registration, nomination, and voting, with functions to manage these stages and determine the winner.

contract VotingSystem {
    address[] registerAcc; //who can vote
    address[] nominatedAcc; //who are nominated
    address[] voteCountAcc; // use to store the account vote to who
    uint256[] accGetVote; // acount get how many vote
    uint public numberofVote; // total amoung of vote
    uint public highestVote;
    address[] winer;
    address public owner; //who can control the stage of the voting system
    bool public registerStage = true;
    bool public nominateStage;
    bool public voteStage;
    bool public locked; // declear the lock of critical section code
    event systemInfo(string); // to send the message
    event showAddress(string, address[]);
    event showWiner(address[]); // send the winner address to front end

    /// @notice Returns the list of registered accounts.
    /// @return An array of registered addresses.
    /// @dev Returns the data inside the registerAcc.
    function getRegisterAcc() external view returns (address[] memory) {
        return registerAcc;
    }

    /// @notice Returns the list of nominated accounts.
    /// @return An array of nominated addresses.
    function getNominatedAcc() external view returns (address[] memory) {
        return nominatedAcc;
    }

    /// @notice Returns the votes each nominated account has received.
    /// @return An array of vote counts.
    function getAccGetVote() external view returns (uint[] memory) {
        return accGetVote;
    }

    /// @notice Returns the accounts each registered account has voted for.
    /// @return An array of addresses.
    function getVoteCountAcc() external view returns (address[] memory) {
        return voteCountAcc;
    }

    /// @notice Returns the list of winners.
    /// @return An array of winner addresses.
    function getWiner() external view returns (address[] memory) {
        return winer;
    }

    /// @notice Initializes the contract and sets the owner.
    constructor() {
        owner = msg.sender;
    }

    /// @dev Restricts access to only the owner.
    modifier onlyOwner() {
        require(owner == msg.sender, 'you are not owner');
        _;
    }

    /// @dev Prevents reentrancy attacks by using a locked state.
    modifier noReentrancy() {
        require(!locked, 'Error: Reentrant call');
        locked = true;
        _;
        locked = false;
    }

    /// @notice Registers the sender for voting.
    /* @dev
     *    The function uses the `noReentrancy` modifier to prevent reentrancy attacks.
     *    This function checks if the caller is already registered and ensures it's called during the registration stage.
     */
    function register() public noReentrancy {
        require(registerStage == true, 'now is not the register stage');
        //check the account inside register array, if not then register
        require(
            !isRegistered(msg.sender),
            'this account already inside the register array'
        );
        registerAcc.push(msg.sender);
    }

    /// @notice Transitions to the nomination stage.
    /// @dev Can only be called by the owner.
    function toNominateStage() public onlyOwner {
        registerStage = false;
        nominateStage = true;
        emit systemInfo('toNominateStage');
    }

    /// @notice Nominates an account.
    /* @dev
     *    The function uses the `noReentrancy` modifier to prevent reentrancy attacks.
     *    The nominated address must be registered and not already nominated.
     */
    /// @param newNominateAcc The address to be nominated.
    function nominate(address newNominateAcc) public noReentrancy {
        require(nominateStage == true, 'now is not the nominate stage');
        //check the user is inside the register account
        require(
            isRegistered(newNominateAcc),
            'this account is not inside the register array'
        );
        require(
            !isNominated(newNominateAcc),
            'this account is inside the nominated array'
        );
        nominatedAcc.push(newNominateAcc);
    }

    /// @notice Transitions to the voting stage.
    /// @dev Can only be called by the owner. Initializes the voteCountAcc array.
    function toVoteStage() public onlyOwner {
        nominateStage = false;
        voteStage = true;
        //init value to voteCountAcc array
        for (uint i = 0; i < registerAcc.length; i++) {
            voteCountAcc.push(address(0));
        }
        emit systemInfo('toVoteStage');
    }

    /// @notice Votes for a nominated account.
    /** @dev
     *    The function uses the `noReentrancy` modifier to prevent reentrancy attacks.
     *    Voters cannot vote for themselves and can only vote once.
     */
    /// @param AcctoVote The address of the account to vote for.
    function vote(address AcctoVote) public noReentrancy {
        require(voteStage == true, 'now is not the vote stage');
        //require(AcctoVote != msg.sender, "you cannot vote yourself");
        //check the account is nominate account
        require(
            isNominated(AcctoVote),
            'this account is not inside the nominated array'
        );
        uint accIndex = checkRegisterAccIndex(msg.sender);
        //check the address alredy voted or not
        require(voteCountAcc[accIndex] == address(0), 'you already voted');
        voteCountAcc[accIndex] = AcctoVote;
        //vote successful
        numberofVote++;
        if (numberofVote == registerAcc.length) {
            calculateResult();
        }
    }

    /// @notice Calculates the result of the voting and determines the winners.
    /** @dev
     *    This function iterates through all votes, counts them, and identifies the highest voted accounts.
     *    It handles cases where multiple accounts receive the same highest number of votes. It will store winers to winer array.
     */
    function calculateResult() public {
        //calculate all the nominate account get how many vote
        for (uint i = 0; i < nominatedAcc.length; i++) {
            accGetVote.push(0);
        }

        for (uint j = 0; j < registerAcc.length; j++) {
            for (uint i = 0; i < nominatedAcc.length; i++) {
                if (nominatedAcc[i] == voteCountAcc[j]) {
                    accGetVote[i] += 1;
                }
            }
        }

        //check the winer
        //check the highest vote
        for (uint i = 0; i < accGetVote.length; i++) {
            if (accGetVote[i] > highestVote) {
                highestVote = accGetVote[i];
            }
        }

        // check the highest vote is one or more
        uint highestAmount;
        for (uint i = 0; i < accGetVote.length; i++) {
            if (accGetVote[i] == highestVote) {
                highestAmount++;
            }
        }

        //put the address who get the highest to winer list(can be one or more)
        for (uint i = 0; i < accGetVote.length; i++) {
            if (accGetVote[i] == highestVote) {
                winer.push(nominatedAcc[i]);
            }
        }
        emit showWiner(winer);
    }

    /// @notice Resets the contract to its initial state.
    /// @dev Can only be called by the owner.
    function reset() public onlyOwner {
        //require(voteStage == true, "now is not the final stage");
        delete registerAcc;
        delete nominatedAcc;
        delete voteCountAcc;
        delete accGetVote;
        delete winer;
        registerStage = true;
        nominateStage = false;
        voteStage = false;
        numberofVote = 0;
    }

    /// @notice Checks if a user is registered.
    /// @param user The address to check.
    /// @return True if the user is registered, otherwise false.
    function isRegistered(address user) private view returns (bool) {
        for (uint i = 0; i < registerAcc.length; i++) {
            if (registerAcc[i] == user) {
                return true;
            }
        }
        return false;
    }

    /// @notice Checks if a user is nominated.
    /// @param user The address to check.
    /// @return True if the user is nominated, otherwise false.
    function isNominated(address user) private view returns (bool) {
        for (uint i = 0; i < nominatedAcc.length; i++) {
            if (nominatedAcc[i] == user) {
                return true;
            }
        }
        return false;
    }

    /// @notice Gets the index of a registered address.
    /// @param user The address to check.
    /// @return index is the index of the user in the registerAcc array.
    function checkRegisterAccIndex(
        address user
    ) private view returns (uint256 index) {
        for (uint i = 0; i < registerAcc.length; i++) {
            if (registerAcc[i] == user) {
                return i;
            }
        }
    }
}
