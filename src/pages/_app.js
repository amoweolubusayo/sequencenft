import "@/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic'

const RainbowKitWrapper = dynamic(() => import('./RainbowKitProvider'), {
  ssr: false
})

export default function App({ Component, pageProps }) {
  return (
      <RainbowKitWrapper>
        <Component {...pageProps} />
      </RainbowKitWrapper>
  );
}
