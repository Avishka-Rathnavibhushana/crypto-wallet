import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { useGlobalState } from "../context";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Web3 from "web3";
import * as Bip39 from "bip39";
import {Wallet, utils, BigNumber} from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { InfuraProvider } from "@ethersproject/providers";

// Import Bip39 to convert a phrase to a seed:

// Import the Keypair class from Solana's web3.js library:

const Recover: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [mnemonic, setMnemonicWords] = useState<string>("");

  const { account, setAccount, setMnemonic } = useGlobalState();

  // *Step 6*: implement a function that recovers an account based on a mnemonic phrase
  const handleImport = async (values: any) => {

    setLoading(true);
    const inputMnemonic = values.phrase.trim().toLowerCase();
    setMnemonic(inputMnemonic);
    console.log(inputMnemonic);
    // (a) review the import guidance on lines 9 and 11
    // (b) convert the mnemonic to seed bytes
    // Documentation Reference: https://github.com/bitcoinjs/bip39
    const seed = Bip39.mnemonicToSeedSync(inputMnemonic).slice(0, 32).toString('utf8');
    console.log(seed);
    // (c) use the seed to import the account (i.e. keypair)
    // Documentation Reference:
    //   https://solana-labs.github.io/solana-web3.js/classes/Keypair.html
    //   https://solana-labs.github.io/solana-web3.js/classes/Keypair.html#fromSeed
    // var web3 = new Web3('https://rinkeby.infura.io/v3/7ee79ae6d89a4df88ba9f65942c4b4ca')
    // const wallet = web3.eth.accounts.wallet.create(1 ,seed);
    // console.log("asf")
    // console.log(wallet)
    // const importedAccount =  web3.eth.accounts.create(seed);
    // console.log("Ds")
    // console.log(importedAccount);
    // setAccount(importedAccount);

    const wallet = Wallet.fromMnemonic(inputMnemonic, `m/44'/60'/0'/0/0`);
    console.log(wallet);
    var provider = new InfuraProvider("homestead", "7ee79ae6d89a4df88ba9f65942c4b4ca");
    const newAccount = wallet.connect(provider);
    console.log(newAccount);

    setAccount(newAccount);

    // (d) You can now delete the console.log statement since the function is implemented!
  };

  const createWallet = async (values: any) => {
    console.log("Generate mnemonic");
    const generatedMnemonic = Bip39.generateMnemonic();
    console.log(generatedMnemonic);
    setMnemonicWords(generatedMnemonic);
    console.log(mnemonic);
    console.log("Create wallet");
    if (!utils.isValidMnemonic(generatedMnemonic)) {
     console.log("Mnemonic invalid");
    } else {
      console.log("Mnemonic valid");
      var wallet = Wallet.fromMnemonic(generatedMnemonic);
      console.log("Wallet created");
      console.log(wallet);
      console.log(wallet.privateKey);
      console.log(wallet.provider);
      console.log(wallet.publicKey);
      console.log(wallet.address);
    }
  };

  const restoreWallet = async (values: any) => {
    console.log("generated mnemonic");
    console.log(mnemonic);
    console.log("retrieve wallets");
    var mnemonicWallet = Wallet.fromMnemonic(mnemonic);
    console.log("retrieve mnemonic wallets");
    console.log(mnemonicWallet);
    console.log(mnemonicWallet.privateKey);
    console.log(mnemonicWallet.provider);
    console.log(mnemonicWallet.publicKey);
    console.log(mnemonicWallet.address);
    var wallet = new Wallet(mnemonicWallet.privateKey);
    console.log("retrieve wallet");
    console.log(wallet);
    console.log(wallet.privateKey);
    console.log(wallet.provider);
    console.log(wallet.publicKey);
    console.log(wallet.address);
  };

  const restoreWallet2 = async (values: any) => {
    console.log("generated mnemonic");
    console.log(mnemonic);
    console.log("retrieve wallets");
    var mnemonicWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
    console.log("retrieve mnemonic wallets");
    console.log(mnemonicWallet);
    console.log(mnemonicWallet.privateKey);
    console.log(mnemonicWallet.provider);
    console.log(mnemonicWallet.publicKey);
    console.log(mnemonicWallet.address);

    var wallet = new Wallet(mnemonicWallet.privateKey);
    console.log("retrieve wallet");
    console.log(wallet);
    console.log(wallet.privateKey);
    console.log(wallet.provider);
    console.log(wallet.publicKey);
    console.log(wallet.address);
  };

  const restoreWalletHDNode = async (values: any) => {
    console.log("generated mnemonic");
    console.log(mnemonic);
    console.log("retrieve wallets");
    const hdNode = utils.HDNode.fromMnemonic(mnemonic);
    var mnemonicWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
    console.log("retrieve mnemonic wallets");
    console.log(mnemonicWallet);
    console.log(mnemonicWallet.privateKey);
    console.log(mnemonicWallet.provider);
    console.log(mnemonicWallet.publicKey);
    console.log(mnemonicWallet.address);
    var wallet = new Wallet(mnemonicWallet.privateKey);
    console.log("retrieve wallet");
    console.log(wallet);
    console.log(wallet.privateKey);
    console.log(wallet.provider);
    console.log(wallet.publicKey);
    console.log(wallet.address);
  };

  const getBalance = async (values: any) => {
    var mnemonicWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
    var provider = new InfuraProvider("rinkeby", "7ee79ae6d89a4df88ba9f65942c4b4ca");
    mnemonicWallet = mnemonicWallet.connect(provider);
    var balcnce = await mnemonicWallet.getBalance();
    console.log("generated mnemonic balance");
    console.log(balcnce);
    const balance = BigNumber.from(balcnce);
    console.log(utils.formatEther(balance));
   
  };

  const getBalanceMain = async (values: any) => {
    var mnemonicWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
    var provider = new InfuraProvider("homestead", "7ee79ae6d89a4df88ba9f65942c4b4ca");
    mnemonicWallet = mnemonicWallet.connect(provider);
    var balcnce = await mnemonicWallet.getBalance();
    console.log("generated mnemonic balance");
    console.log(balcnce);
    const balance = BigNumber.from(balcnce);
    console.log(utils.formatEther(balance));
   
  };

  const send = async (values: any) => {
    var mnemonicWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
    var provider = new InfuraProvider("rinkeby", "7ee79ae6d89a4df88ba9f65942c4b4ca");
    mnemonicWallet = mnemonicWallet.connect(provider);
    var balcnce = await mnemonicWallet.getBalance();
    console.log("generated mnemonic balance");
    console.log(balcnce);
    var balance = BigNumber.from(balcnce);
    console.log(utils.formatEther(balance));
    var tx = {
  to: "0xC8b1a4B84d9578EA521c15C2d40982b09D1a0684",
  value: utils.parseEther("0.02")
    }
    await mnemonicWallet.signTransaction(tx);
    await mnemonicWallet.sendTransaction(tx);
    balcnce = await mnemonicWallet.getBalance();
    console.log("generated mnemonic balance");
    console.log(balcnce);
    balance = BigNumber.from(balcnce);
    console.log(utils.formatEther(balance));
   
  };
  
  useEffect(() => {
    if (account) {
      router.push("/wallet");
    }
  }, [account, router]);

  return (
    <>
      <h1 className={"title"}>Import Wallet</h1>

      <p>Enter your secret recovery phrase here to restore your wallet.</p>
      <Button onClick={createWallet} >create wallet</Button>
      <Button onClick={restoreWallet} >restore wallet</Button>
      <Button onClick={restoreWallet2} >restore wallet2</Button>
      <Button onClick={restoreWalletHDNode} >restore Wallet HDNode</Button>
      <Button onClick={getBalance} >get balance</Button>
      <Button onClick={getBalanceMain} >get balance main</Button>
       <Button onClick={send} >send ether</Button>
      <StyledForm
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        onFinish={handleImport}
      >
        <div style={{ overflow: "hidden" }}>
          <Form.Item
            name="phrase"
            label="Secret Recovery Phrase"
            rules={[
              {
                required: true,
                message: "Please enter your recovery phrase",
              },
              {
                validator(_, value) {
                  if (value.trim().split(" ").length === 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Recovery phrase must be 12 words long")
                  );
                },
              },
            ]}
          >
            <Input
              placeholder="Paste secret recovery phrase from clipboard"
              style={{ minWidth: "500px" }}
            />
          </Form.Item>
        </div>

        {!loading && (
          <Form.Item shouldUpdate className="submit">
            {() => (
              <Button
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
              >
                Import
              </Button>
            )}
          </Form.Item>
        )}

        {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
      </StyledForm>
    </>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Recover;
