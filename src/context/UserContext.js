"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useMagic } from "./MagicProvider"
import { Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';

// Create a context for user data.
const UserContext = createContext({
  user: null,
  fetchUser: async () => {},
})

// Custom hook for accessing user context data.
export const useUser = () => useContext(UserContext)

// Provider component that wraps parts of the app that need user context.
export const UserProvider = ({ children }) => {
  // Use the web3 context.
  const { magic } = useMagic()

  // Initialize user state to hold user's account information.
  const [address, setAddress] = useState(null)
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [publicAddress, setPublicAddress] = useState('');
  const [userMetadata, setUserMetadata] = useState({});
  const [balance, setBalance] = useState('0');
  const [sendAmount, setSendAmount] = useState(0);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [sendingTransaction, setSendingTransaction] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [sendTokensTxHash, setSendTokensTxHash] = useState('');

  useEffect(() => {
    if (magic)
      magic.user.isLoggedIn().then(async magicIsLoggedIn => {
        setIsLoggedIn(magicIsLoggedIn);
        if (magicIsLoggedIn) {
          const metadata = await magic.user.getMetadata();
          fetchBalance(metadata.publicAddress);
          setPublicAddress(metadata.publicAddress);
          setUserMetadata(metadata);
        }
    });
  }, [isLoggedIn]);

  const fetchBalance = async publicAddress => {
    try {
      const client = await magic.getCosmosClient();
      const balances = await client.getAllBalances(publicAddress);
      console.log('Balances', balances);
      setBalance((balances[0]?.amount || 0) / 1000000);
    } catch (error) {
      console.error('Error fetching balance: ', error);
    }
  };

  const handlerSendTransaction = async () => {
    setSendingTransaction(true);
    const metadata = await magic.user.getMetadata();

    const message = [
      {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: metadata.publicAddress,
          toAddress: destinationAddress,
          amount: [
            {
              amount: String(sendAmount),
              denom: 'atom',
            },
          ],
        },
      },
    ];
    const fee = {
      amount: [{ denom: 'uatom', amount: '500' }],
      gas: '200000',
    };

    const res = await magic.cosmos.signAndBroadcast(message, fee);
    console.log('Res', res);
    setSendingTransaction(false);

    setTxHash(`https://explorer.theta-testnet.polypore.xyz/transactions/${res.transactionHash}`);
    const client = await magic.getCosmosClient();
    const transaction = await client.getTx(res.transactionHash);
    console.log('Transaction', transaction);
    const decodedTransaction = Tx.decode(transaction.tx);
    console.log('Decoded messages:', decodedTransaction.body.messages);
    const sendMessage = MsgSend.decode(decodedTransaction.body.messages[0].value);
    console.log('Sent message:', sendMessage);
    console.log('Gas fee:', decodedTransaction.authInfo.fee.amount);
    console.log('Gas limit:', decodedTransaction.authInfo.fee.gasLimit.toString(10));
  };

  const handleSignOnly = async () => {
    const metadata = await magic.user.getMetadata();

    const message = [
      {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: metadata.publicAddress,
          toAddress: destinationAddress,
          amount: [
            {
              amount: String(sendAmount),
              denom: 'atom',
            },
          ],
        },
      },
    ];
    const fee = {
      amount: [{ denom: 'uatom', amount: '500' }],
      gas: '200000',
    };

    const result = await magic.cosmos.sign(message, fee);

    setTxHash('Check Your Result in Console!');

    console.log('Signed transaction', result);
  };

  const login = async () => {
    await magic.auth.loginWithEmailOTP({ email });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user: address ? { address: publicAddress } : null,
        fetchUser: userMetadata,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}