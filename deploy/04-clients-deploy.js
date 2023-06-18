require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments;
    const dataCapToken = await get("DataCapToken")
    const notaryGovernorContract = await get("NotaryGovernor");

    const clients = await deploy("Clients", {
        from: wallet.address,
        args: [dataCapToken.address],
        log: true,
    });

    //Transfer Ownership to TimeLock.sol
    //Comment this out after deploying the first time
    console.log("Transferring Clients Owner to Notary Governor")
    // const dealDaoClientContract = await ethers.getContractAt("DaoDealClient", daoDealClient.address)
    // const transferOwnerTx = await dealDaoClientContract.transferOwnership(timeLock.address);
    // await transferOwnerTx.wait();

    const clientsContract = await ethers.getContractAt("Clients", clients.address)
    const transferOwnerTx = await clientsContract.transferOwnership(notaryGovernorContract.address);
    await transferOwnerTx.wait();

    console.log("Clients Ownership transferred");
}