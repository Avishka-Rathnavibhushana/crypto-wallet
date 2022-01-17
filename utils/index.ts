import { message } from "antd";
import { Wallet,BigNumber, utils } from "ethers";

// *Step 3*: implement a function that gets an account's balance
const refreshBalance = async (network: String | undefined, account: Wallet | null) => {
  // This line ensures the function returns before running if no account has been set
  if (!account) return 0;

  try {
    //get balance from the accout in bignumber
    var balance = await account.getBalance();
    balance = BigNumber.from(balance);
    //convert balance to a string
    const balanceString = Number(utils.formatEther(balance));
    console.log("balance:" + balanceString.toString());

    return balanceString;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    message.error(`Balance refresh failed: ${errorMessage}`);
    return 0;
  }
};

export { refreshBalance };
