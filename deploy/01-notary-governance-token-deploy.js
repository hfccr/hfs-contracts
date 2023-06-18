require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;

    // const dataGovernanceToken = await deploy("DataGovernanceToken", {
    //     from: wallet.address,
    //     args: [],
    //     log: true,
    // });

    const notaryGovernanceToken = await deploy("NotaryGovernanceToken", {
        from: wallet.address,
        args: [],
        log: true,
    });

    //Define function to delegate to deployer wallet
    const delegate = async (
        notaryGovernanceTokenAddress,
        delegatedAccount
    ) => {
        const notaryGovernanceToken = await ethers.getContractAt(
            "NotaryGovernanceToken",
            notaryGovernanceTokenAddress
        );
        delegateTx = await notaryGovernanceToken.delegate(delegatedAccount);
        await delegateTx.wait();
        console.log(
            `Checkpoints ${await notaryGovernanceToken.numCheckpoints(delegatedAccount)}`
        );
    }

    //Call delegate function below
    await delegate(notaryGovernanceToken.address, wallet.address);
    console.log("Delegated to deployer wallet!")
}