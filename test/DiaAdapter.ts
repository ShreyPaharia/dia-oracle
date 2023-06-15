import { ethers } from "hardhat";
import { expect } from "chai";
import { DIAOracleV2, DiaToChainlinkAdapter } from "../typechain-types"; 
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { mainnetConstants } from "./constants";

describe("DiaToChainlinkAdapter", function () {
  let adapter: DiaToChainlinkAdapter;
  let diaOracle: DIAOracleV2;
  let diaOracle2: DIAOracleV2;
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async function () {
    [deployer, user1] = await ethers.getSigners();
    const diaToChainlinkAdapterFactory = await ethers.getContractFactory("DiaToChainlinkAdapter");
    const diaOracleV2Factory = await ethers.getContractFactory("DIAOracleV2");

    diaOracle = await diaOracleV2Factory.deploy();
    diaOracle2 = await diaOracleV2Factory.deploy();

    adapter = await diaToChainlinkAdapterFactory.deploy(diaOracle.address,"BTC Oracle","BTC/USD");
    await adapter.deployed();
  });

  it("should return the correct address of the DIA oracle", async function () {
    const diaOracleAddress = await adapter.diaOracleAddress();
    expect(diaOracleAddress).to.equal(diaOracle.address);
  });

  it("should update the DIA oracle address by the owner", async function () {
    await expect(adapter.connect(user1).setDiaOracleAddress(diaOracle2.address)).to.be.revertedWith("Ownable: caller is not the owner");
    await adapter.setDiaOracleAddress(diaOracle2.address); // Update DIA oracle address
    const diaOracleAddress = await adapter.diaOracleAddress();
    expect(diaOracleAddress).to.equal(diaOracle2.address);
  });

  it("should return the correct pairKey", async function () {
    const pairKey = await adapter.pairKey();
    expect(pairKey).to.equal("BTC/USD");
  });

  it("should update the pairKey by the owner", async function () {
    await expect(adapter.connect(user1).setPairKey("ETH/USD")).to.be.revertedWith("Ownable: caller is not the owner");
    await adapter.setPairKey("ETH/USD"); // Update pairKey
    const pairKey = await adapter.pairKey();
    expect(pairKey).to.equal("ETH/USD");
  });

  it("should return the correct decimals", async function () {
    const decimals = await adapter.decimals();
    expect(decimals).to.equal(8);
  });

  it("should update the decimals by the owner", async function () {
    await expect(adapter.connect(user1).setDecimals(18)).to.be.revertedWith("Ownable: caller is not the owner");
    await adapter.connect(deployer).setDecimals(18); // Update decimals to 18
    const decimals = await adapter.decimals();
    expect(decimals).to.equal(18);
  });

  it("should return the correct description", async function () {
    const description = await adapter.description();
    expect(description).to.equal("BTC Oracle");
  });

  it("should update the description by the owner", async function () {
    await expect(adapter.connect(user1).setDescription("New description")).to.be.revertedWith("Ownable: caller is not the owner");
    await adapter.setDescription("New description"); // Update description
    const description = await adapter.description();
    expect(description).to.equal("New description");
  });

  it("should return the latest round data from the DIA oracle", async function () {

    const value = ethers.BigNumber.from(1234567890);
    const timestamp = ethers.BigNumber.from(123456);
    await diaOracle.setValue("BTC/USD",value, timestamp);

    const blockNumber = await ethers.provider.getBlockNumber();

    const updatedRoundData = await adapter.latestRoundData();
    expect(updatedRoundData.roundId_).to.equal(blockNumber); // roundId
    expect(updatedRoundData.answer).to.equal(value); // value
    expect(updatedRoundData.startedAt).to.equal(timestamp); // startedAt
    expect(updatedRoundData.updatedAt).to.equal(timestamp); // updatedAt
    expect(updatedRoundData.answeredInRound).to.equal(blockNumber); // answeredInRound
  });

  it("should revert when calling getRoundData", async function () {
    await expect(adapter.getRoundData(1)).to.be.revertedWithCustomError(adapter,"NotImplemented");
  });

  it("should return the correct version", async function () {
    const version = await adapter.version();
    expect(version).to.equal(0);
  });

  it("should return the correct version", async function () {
    await expect(adapter.connect(user1).setVersion(8)).to.be.revertedWith("Ownable: caller is not the owner");
    await adapter.setVersion(8);
    const newVersion = await adapter.version()
    expect(newVersion).to.equal(8);
  });

});
