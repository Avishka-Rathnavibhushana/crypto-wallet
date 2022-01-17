# crypto-wallet

This is a cryptocurrency wallet to view and do transactions with etheruim network

## How to run

1. unzip the file

2. First run "npm install" to install all the dependancies

3. Then run "npm run dev" to start the user interface server
   Then the server will be run on the link "http://localhost:3000"

## How to use - special notes

1. can change network from the drop down list in the top right corner
   click on each to chnage network
   It will automatically refreshes the balance

2. Press "Refresh" each time a transaction happens (showing balance will not chnage automatically on transaction completion)

## How to send transaction

1.  open tranaction sending ticket

2.  add public key of the sender in "pay to the order of text box"

3.  add amount in second box
    Cannot type floting point numbers
    configered the text box as 1000 = 1 ETH (or 1 AVAX) according to the network

    if want to send 0.5 ETH to public key "0x94feF970B30DE637CDb3ab16309B0BC8622834A6"

         "pay order .." = 0x94feF970B30DE637CDb3ab16309B0BC8622834A6
         "amount" = 500

    if want to send 5 AVAX to public key "0x94feF970B30DE637CDb3ab16309B0BC8622834A6"

         "pay order .." = 0x94feF970B30DE637CDb3ab16309B0BC8622834A6
         "amount" = 5000

4.  Press "Refresh" after the transaction to check latest balance
