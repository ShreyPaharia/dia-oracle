import { parseUnits } from 'ethers/lib/utils';
import hre, {ethers} from 'hardhat'

async function deployBags() {
  const deployers = await hre.ethers.getSigners()
  const deployer = deployers[0]

  const oracleAddress =  process.env.DIA_ORACLE_ADDRESS;
  if(oracleAddress==undefined) {
    console.log("variables not defined")
    return;
  }

  const adapterFactory = await hre.ethers.getContractFactory("DiaToChainlinkAdapter", deployer);
  const bags = await adapterFactory.deploy(oracleAddress, "BTC Oracle", "BTC/USD");
  // console.log({bags})

  await bags.deployed();

  console.log("BAGS address:", bags.address)
}

deployBags().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
