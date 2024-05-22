import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Honeypot Detector for BSC/Ethereum | Honeypot Scanner</title>
        <meta
          property="og:title"
          content="Honeypot Detector for BSC and Ethereum"
        ></meta>
        <meta
          property="og:description"
          content="Scan a token to check it's honeypot status, fees, gas usage and more. Crypto's most advanced honeypot detection."
        ></meta>
        <meta
          name="twitter:title"
          content="Honeypot Detector for BSC and Ethereum"
        ></meta>
        <meta
          name="twitter:description"
          content="Scan a token to check it's honeypot status, fees, gas usage and more. Crypto's most advanced honeypot detection."
        ></meta>
        <meta
          name="twitter:image"
          content="https://honeypot.is/assets/img/av2.png"
        ></meta>
        <meta property="og:url" content="https://honeypot.is"></meta>
        <meta
          property="og:image"
          content="https://honeypot.is/assets/img/av2.png"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
