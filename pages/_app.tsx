import React, { useState } from "react";
import { Cluster, Keypair } from "@solana/web3.js";
import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContext } from "../context";
import Layout from '../components/Layout';
import { Wallet } from "ethers";

function MyApp({ Component, pageProps }: AppProps) {
  const [network, setNetwork] = useState<String | undefined>("homestead");
  const [account, setAccount] = useState<Wallet | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  return (
    <GlobalContext.Provider value={{ network, setNetwork, account, setAccount, mnemonic, setMnemonic, balance, setBalance }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext.Provider>
  )
}
export default MyApp
