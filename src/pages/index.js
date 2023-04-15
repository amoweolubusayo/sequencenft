import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { SequenceIndexerClient } from "@0xsequence/indexer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const indexer = new SequenceIndexerClient(
  "https://polygon-indexer.sequence.app"
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [nftBalances, setNftBalances] = useState([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // try any contract and account address you'd like :)
    const contractAddress = "0xdBf2138593aeC61d55d86E80b8ed86D7b9ba51F5";
    const accountAddress = address;

    // query Sequence Indexer for all nft balances of the account on Polygon
    async function getNftBalances() {
      const balances = await indexer.getTokenBalances({
        contractAddress: contractAddress,
        accountAddress: accountAddress,
        includeMetadata: true,
      });
      console.log("balance is ", balances);
      setNftBalances(balances.balances);
    }
    getNftBalances();
  }, []);

  return (
    <>
      <div className="flex items-center justify-end mr-4">
        <ConnectButton label="Connect Wallet" className="bg-olive-500" />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My NFTs</h1>
        <ul className="bg-white rounded-md shadow-md w-96 p-4">
          {nftBalances.map((balance, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src={balance.tokenMetadata.image}
                  className="w-full h-full"
                  alt="NFT logo"
                  width={220}
                  height={220}
                />
                <span className="font-medium text-sm text-black">
                  {balance.tokenMetadata.name}
                </span>
                <span className="text-sm text-gray-500">
                  {balance.tokenMetadata.symbol}
                </span>
              </div>
              <span className="text-gray-700">{balance.tokenBalance}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
