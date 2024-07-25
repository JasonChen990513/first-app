const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("VotingSystemModule", (m) => {

  const lock = m.contract("VotingSystem");

  return { lock };
});
