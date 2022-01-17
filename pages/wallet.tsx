import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, Tooltip, Drawer, Typography } from "antd";
import { useGlobalState } from "../context";
import { useRouter } from "next/router";
import TransactionLayout from "../components/TransactionLayout";
import { refreshBalance } from "../utils";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Dashboard,
} from "../styles/StyledComponents.styles";



const { Paragraph } = Typography;

const Wallet: NextPage = () => {
  const { network, account, balance, setBalance } = useGlobalState();
  const [visible, setVisible] = useState<boolean>(false);
  const [airdropLoading, setAirdropLoading] = useState<boolean>(false);

  const [avaMnemonic, setavaMnemonic] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push("/");
      return;
    }
    refreshBalance(network, account)
      .then((updatedBalance) => {
        setBalance(updatedBalance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [account, router, network]);


  const showModal = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const refresh = () => {
    refreshBalance(network, account)
      .then((updatedBalance) => {
        setBalance(updatedBalance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;


  return (
    <>
      {account && (
        <Dashboard>
          <h1>Dashboard</h1>
          <Button onClick={refresh}> Refresh</Button>
          <Paragraph
            copyable={{ text: JSON.parse(JSON.stringify(account)).address, tooltips: `Copy` }}
          >
            {`Account: ${displayAddress(JSON.parse(JSON.stringify(account)).address)}`}
          </Paragraph>

          <p>
            Connected to{" "}
            {network &&
              (network === "homestead"
                ? network.charAt(0).toUpperCase() + network.slice(1, 7)
                : network === "rinkeby"? network.charAt(0).toUpperCase() + network.slice(1): "Fuji")}
          </p>
          {airdropLoading ? (
            <h2>
              <LoadingOutlined spin />
            </h2>
          ) : (
            <h2>
              {balance} <span>{network === "testnet"?"AVAX":"ETH"}</span>
            </h2>
          )}

          <Button type="primary" onClick={showModal}>
            Send <ArrowRightOutlined />
          </Button>

          <Drawer
            title="Send Funds"
            placement="bottom"
            onClose={handleClose}
            visible={visible}
            height={"55vh"}
          >
            <TransactionLayout />
          </Drawer>
        </Dashboard>
      )}
    </>
  );
};

export default Wallet;
