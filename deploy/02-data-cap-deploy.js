require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;

    const dataCapToken = await deploy("DataCapToken", {
        from: wallet.address,
        args: [],
        log: true,
    });

    // const timeLock = await deploy("TimeLock", {
    //     from: wallet.address,
    //     args: [1, [], [], wallet.address],
    //     log: true,
    // });

    console.log('Data cap token deployed at ');
    console.log(dataCapToken.address);
}