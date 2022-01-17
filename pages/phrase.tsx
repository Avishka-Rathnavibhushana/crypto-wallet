import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, Alert, Popconfirm } from "antd";
import PhraseBox from "../components/PhraseBox";
import { useGlobalState } from "../context";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import * as Bip39 from "bip39";
import { Wallet, utils, ethers } from "ethers";

const Phrase: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { setAccount, mnemonic, setMnemonic } = useGlobalState();

  const router = useRouter();

  useEffect(() => {
    // *Step 2*: implement a function that generates a mnemonic when the page renders, and uses it to create a wallet (i.e. account)
    const generatedMnemonic = Bip39.generateMnemonic();

    // This line saves the mnemonic phrase to context state so we can display it for the wallet user to copy
    setMnemonic(generatedMnemonic);

    // convert the mnemonic to seed bytes and make sure it's 32-bytes (Hint: console log the seed to see how many bytes you have vs how many you need)
    const seed = Bip39.mnemonicToSeedSync(generatedMnemonic).slice(0, 32).toString('utf8');  //slice 64 byte seed from 0-32 to get first 32 bytes
    console.log(seed);

    // use the mnemonic words to generate a new account (i.e. a new keypair)
    const wallet = Wallet.fromMnemonic(generatedMnemonic, `m/44'/60'/0'/0/0`);

    // connect provider to wallet
    var provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/80c6b8d33d8624b5b3456022/eth/mainnet");
    const newAccount =  wallet.connect(provider);
    
    // This line sets the account to context state so it can be used by the app
     setAccount(newAccount);
  }, []);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    router.push("/wallet");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const warning =
    "Keep this phrase secret and safe. This is the only way for you to access your digital assets. Moreover, anyone can access your assets with it! Think of it as the password to your online bank account.";

  return (
    <>
      <h1 className={"title"}>Secret Recovery Phrase</h1>

      <p>
        This recovery phrase is generated with your private keys and can be used
        to recover your account.
      </p>

      <Alert message={warning} type="warning" />

      <p>
        Once you have stored this phrase somewhere safe, click finish to go to
        your wallet.
      </p>

      <PhraseBox mnemonic={mnemonic}></PhraseBox>

      {!loading && (
        <Popconfirm
          title="Did you copy the phrase?"
          visible={visible}
          onConfirm={handleOk}
          okButtonProps={{ loading: loading }}
          onCancel={handleCancel}
          cancelText={"No"}
          okText={"Yes"}
        >
          <Button type="primary" onClick={showPopconfirm}>
            Finish
          </Button>
        </Popconfirm>
      )}

      {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
    </>
  );
};

export default Phrase;
