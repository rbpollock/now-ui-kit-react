"use client"
import { Magic } from "magic-sdk";
import { CosmosExtension } from "@magic-ext/cosmos";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const { Web3 } = require("web3")

const MagicContext = createContext({
  magic: null,
  web3: null,
})

const rpcUrl = 'https://rpc.sentry-01.theta-testnet.polypore.xyz';


export const useMagic = () => useContext(MagicContext)

const MagicProvider = ({ children }) => {
  const [magic, setMagic] = useState(null)
  const [web3, setWeb3] = useState(null)

  useEffect(() => {
      const magic = new Magic(process.env.MAGIC_SDK_KEY || "pk_live_9B62F2A7D6362AFE", {
        deferPreload: true,
        extensions: {
            cosmos: new CosmosExtension({ rpcUrl }),
          },
      })

      setMagic(magic)
      setWeb3(new Web3((magic).rpcProvider))
  }, [])

  const value = useMemo(() => {
    return {
      magic,
      web3,
    }
  }, [magic, web3])

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
}

export default MagicProvider