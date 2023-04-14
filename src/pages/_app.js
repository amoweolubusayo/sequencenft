import "@/styles/globals.css";
// import { SequenceConnector } from "@0xsequence/wagmi-connector";
import { sequenceWallet, MyWalletOptions } from "@0xsequence/rainbowkit-plugin";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      sequenceWallet({
        chains,
        connect: {
          app: "Demo-app",
          networkId: 137,
        },
      }),
      ...otherRainbowKitWallets,
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
// const connectors = [
//   new SequenceConnector({
//     chains,
//     options: {
//       connect: {
//         app: "Demo-app",
//         networkId: 137,
//       },
//     },
//   }),
//   ...otherConnectors,
// ];

// const wagmiClient = createClient({
//   autoConnect: false,
//   connectors,
//   provider,
// });
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode={true}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
