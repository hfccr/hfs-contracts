require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments;

    // const dataGovernanceToken = await get("DataGovernanceToken")
    const notaryGovernanceToken = await get("NotaryGovernanceToken");
    // const timeLock = await get("TimeLock")

    const notaryGovernorContract = await deploy("NotaryGovernor", {
        from: wallet.address,
        args: [notaryGovernanceToken.address],
        log: true,
    });
    console.log('Notary Governor Contract deployed at ', notaryGovernorContract.address);
}