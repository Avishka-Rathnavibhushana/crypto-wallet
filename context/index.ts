import React, { createContext, useContext } from "react";
import { Keypair, Cluster } from "@solana/web3.js";
import { Wallet } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { InfuraProvider } from "@ethersproject/providers";

export type GlobalContextType = {
  network: String | undefined;
  setNetwork: React.Dispatch<React.SetStateAction<String | undefined>>;
  account: Wallet | null;
  setAccount: React.Dispatch<React.SetStateAction<Wallet | null>>;
  mnemonic: string | null;
  setMnemonic: React.Dispatch<React.SetStateAction<string | null>>;
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  network: "homestead",
  setNetwork: () => null,
  account: null,
  setAccount: () => null,
  mnemonic: null,
  setMnemonic: () => null,
  balance: null,
  setBalance: () => null,
});

export const useGlobalState = () => useContext(GlobalContext);
