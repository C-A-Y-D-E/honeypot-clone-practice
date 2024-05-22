import Image from "next/image";
import { Advent_Pro, Bebas_Neue } from "next/font/google";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const inter = Advent_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const bebase = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const address = router.query.address;
  const fetchHoneyPot = async (address) => {
    const resp = await axios.get(
      `https://api.honeypot.is/v1/GetPairs?address=${address}&chainID=56`
    );
    const data = resp.data;
    let pairAddress = data[0]?.Pair?.Address;
    if (!pairAddress) {
      setError(
        "OOPS! No pairs found for this address. Trying to simulate liquidity"
      );
      return;
    }
    const resph = await axios.get(
      `
      https://api.honeypot.is/v2/IsHoneypot?address=${address}&pair=${pairAddress}&chainID=56`
    );

    setData(resph.data);
    setError(null);
  };
  useEffect(() => {
    if (address) {
      setInput(address);
      fetchHoneyPot(address);
    }
  }, [address]);
  return (
    <main className={` ${inter.className}`}>
      <Header />
      <div className="container mx-auto px-6 py-16">
        <div className="text-3xl lg:text-6xl font-bold text-center">
          BSC <span className="text-[#F1B825]">HONEYPOT</span> DETECTOR
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="flex gap-2 items-center text-lg lg:text-2xl font-bold">
            SWITCH TO <img src="/eth.png" className="w-4" />{" "}
            <span className="underline">ETHEREUM</span>
            <img src="/base.svg" className="w-4" />{" "}
            <span className="underline">BASE</span>
          </div>
        </div>
        <div className="text-center font-bold text-2xl lg:text-5xl mt-6">
          TOKEN ADDRESS
        </div>
        <div className="max-w-[900px] mx-auto mt-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-16 font-bold text-2xl py-2 px-6 border-4 focus-visible:outline-none  border-[#F1B825] w-full bg-transparent"
          />
          <button
            onClick={() => fetchHoneyPot(input)}
            className="py-4 px-6 bg-[#F1B825] text-center font-semibold mt-6 text-black w-full text-2xl"
          >
            CHECK FOR HONEYPOT
          </button>
        </div>

        {data && (
          <div id="hp_info_box" className="max-w-[900px] mx-auto mt-7">
            <div>
              <div class="block overflow-hidden rounded-md md:grid md:grid-cols-[160px_auto] lg:grid-cols-[199px_auto]">
                <div
                  id="titlePanel"
                  class="flex items-center justify-center bg-[#01662B]"
                >
                  <h3
                    id="titlePanel-heading"
                    class={`py-2 pr-3 pt-3 ${
                      bebase.className
                    }  text-3xl font-normal leading-none ${
                      !data.honeypotResult.isHoneypot
                        ? `text-[#71E88C]`
                        : `text-[#FFC9C9]`
                    } md:-rotate-180 md:transform md:text-9xl md:[writing-mode:vertical-lr] lg:text-10xl xl:text-[175px]`}
                  >
                    {!data.honeypotResult.isHoneypot ? "PASSED" : "FAILED"}
                  </h3>
                </div>
                <div class="bg-[#594A29] px-5 py-5 md:px-8 md:py-8 lg:px-11 lg:py-10">
                  <div class="mb-8 flex items-center justify-between">
                    <div>
                      <h3
                        class={`${bebase.className}  text-3xl text-[#A8FFBC] md:text-4xl mb-8 lg:text-[40px]`}
                      >
                        <div id="tname">{data.token.name}</div>
                        <span
                          id="tsymbol"
                          class="block text-xl text-white md:mt-2 md:text-4xl lg:mt-2 lg:text-[30px]"
                        >
                          ({data.token.symbol})
                        </span>
                      </h3>
                      <div class="mb-8">
                        <h2
                          id="summary-heading"
                          class={`${bebase.className}  text-4xl uppercase leading-none text-[#A8FFBC] lg:text-5xl xl:text-[45px]`}
                        >
                          Low risk of honeypot
                        </h2>
                        <p
                          id="summary-subheading"
                          class={`${bebase.className}  leading-1  text-xl uppercase text-[#FFC9C9]`}
                        >
                          This can always change! Do your own due diligence.
                        </p>
                      </div>
                    </div>

                    <div class="space-y-2 mb-auto">
                      <a
                        href={`https://t.me/HoneypotIsBot?start=${data.token.address}_ref=website`}
                        target="_blank"
                        class="border-1 text-md flex h-10 min-w-[150px] items-center justify-center rounded-md border border-gray px-4 py-2 font-adventPro font-bold uppercase tracking-widest text-white
        transition hover:border-secondary hover:bg-secondary md:text-lg plausible-event-name=scantg"
                      >
                        <img
                          src="assets/img/telegram2.png"
                          alt=""
                          class="mr-2 h-5"
                        />
                        SCAN ON TG
                      </a>
                      <a
                        href={`https://bscscan.com/address/${data.token.address}`}
                        target="_blank"
                        class="border-1 text-md flex h-10 min-w-[150px] items-center justify-center rounded-md border border-gray px-4 py-2 font-adventPro font-bold uppercase tracking-widest
     text-white transition hover:border-secondary hover:bg-secondary md:text-lg plausible-event-name=bscscan"
                      >
                        <img
                          src="assets/img/scan.png"
                          alt=""
                          class="mr-2 h-5"
                        />
                        BSCSCAN
                      </a>
                      <span class="isolate inline-flex rounded-md shadow-sm">
                        <a
                          href={`https://apespace.io/bsc/${data.token.address}?utm_source=honeypot.is&amp;utm_medium=honeypot.is&amp;utm_campaign=honeypot.is`}
                          target="_blank"
                          class="relative inline-flex items-center rounded-l-md border border-gray  px-2 py-2 text-sm font-medium text-gray-500 hover:border-[#6a5c3f] hover:bg-secondary focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 plausible-event-name=chart plausible-event-to=apespace"
                        >
                          <span class="sr-only">Apespace</span>
                          <img
                            src="/apespace.svg"
                            alt="Apespace"
                            class="mr-0 h-6 w-6"
                          />
                        </a>
                        <a
                          href={`https://dexview.com/bsc/${data.token.address}?utm_source=honeypot.is&amp;utm_medium=honeypot.is&amp;utm_campaign=honeypot.is`}
                          target="_blank"
                          class="relative -ml-px inline-flex items-center border border-gray  px-2 py-2 text-sm font-medium text-gray-500 hover:border-[#6a5c3f] hover:bg-secondary focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 plausible-event-name=chart plausible-event-to=dexview"
                        >
                          <span class="sr-only">Dexview</span>
                          <img
                            src="/dexview.svg"
                            alt="Dexview"
                            class="mr-0 h-6 w-6"
                          />
                        </a>
                        <a
                          href={`https://dextools.io/app/en/bnb/pair-explorer/${data.pairAddress}?utm_source=honeypot.is&amp;utm_medium=honeypot.is&amp;utm_campaign=honeypot.is`}
                          target="_blank"
                          class="relative -ml-px inline-flex items-center border border-gray  px-2 py-2 text-sm font-medium text-gray-500 hover:border-[#6a5c3f] hover:bg-secondary focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 plausible-event-name=chart plausible-event-to=dextools"
                        >
                          <span class="sr-only">Dextools</span>
                          <img
                            src="/dextools-logo.png"
                            alt="Dextools"
                            class="mr-0 h-6 w-6"
                          />
                        </a>
                        <a
                          href={`https://dexscreener.com/bsc/${data.pairAddress}?utm_source=honeypot.is&amp;utm_medium=honeypot.is&amp;utm_campaign=honeypot.is`}
                          target="_blank"
                          class="relative -ml-px inline-flex items-center rounded-r-md border border-gray  px-2 py-2 text-sm font-medium text-gray-500 hover:border-[#6a5c3f] hover:bg-secondary focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 plausible-event-name=chart plausible-event-to=dexscreener"
                        >
                          <span class="sr-only">Dexscreener</span>
                          <svg
                            class="mr-0 h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="#fff"
                            fill-rule="evenodd"
                            viewBox="0 0 252 300"
                            focusable="false"
                          >
                            <path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886l12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 003.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 003.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197"></path>
                            <path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 015.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 015.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                  </div>

                  <div class="mb-8 truncate">
                    <h2
                      class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                    >
                      Address
                    </h2>
                    <p
                      class={`leading-1 max-w-xl truncate ${bebase.className}  text-2xl uppercase text-white`}
                    >
                      {data.token.address}
                    </p>
                  </div>

                  <h2
                    class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                  >
                    Simulation Results
                  </h2>
                  <ul>
                    <div class="grid grid-cols-[1fr_1fr] gap-0 md:grid-cols-[1fr_1fr_1.5fr]">
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Buy Tax
                        </h4>
                        <p
                          class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                        >
                          {data.simulationResult.buyTax.toFixed(2)}%
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className} e text-xl uppercase text-[#A8FFBC]`}
                        >
                          Buy Gas
                        </h4>
                        <p
                          class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                        >
                          {data.simulationResult.buyGas}
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Buy Limit
                        </h4>
                        <p
                          class={`${bebase.className}  text-xl uppercase leading-none text-white`}
                        >
                          NONE DETECTED
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Sell Tax
                        </h4>
                        <p
                          class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                        >
                          {data.simulationResult.sellTax.toFixed(2)}%
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Sell Gas
                        </h4>
                        <p
                          class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                        >
                          {data.simulationResult.sellGas}
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Sell Limit
                        </h4>
                        <p
                          class={`${bebase.className}  text-xl uppercase leading-none text-white`}
                        >
                          NONE DETECTED
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Transfer Tax
                        </h4>
                        <p
                          class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                        >
                          {data.simulationResult.transferTax}%
                        </p>
                      </li>
                      <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                        <h4
                          id="results-panel-vc"
                          class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                        >
                          Source Code
                        </h4>
                        <p
                          class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                        ></p>
                        <div
                          id="verified-contracts-d"
                          class="inline-block align-middle flex flex-shrink-0"
                        >
                          <svg
                            class="h-6 w-6 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span
                            class={`${bebase.className}  text-xl m-auto mt-[3px] ml-1 mr-0 uppercase leading-none text-white`}
                          >
                            OPEN SOURCE
                          </span>
                        </div>
                        <p></p>
                      </li>
                    </div>
                  </ul>

                  <div class="mt-8 truncate">
                    <h2
                      class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                    >
                      Recent Holder Analysis{" "}
                      <span
                        class="ml-2 text-white underline"
                        id="whats_this"
                        aria-expanded="false"
                      >
                        What's this?
                      </span>
                    </h2>
                    <ul>
                      <div class="grid grid-cols-[1fr_1fr] gap-0 md:grid-cols-[1fr_1fr_1.5fr]">
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Holders Analysed
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                          >
                            {data.token.totalHolders}
                          </p>
                        </li>
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Can Sell
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white"`}
                          >
                            {data.holderAnalysis.successful}
                          </p>
                        </li>
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Can't sell
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                          >
                            {data.holderAnalysis.failed}
                          </p>
                        </li>
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Siphoned
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                          >
                            {data.holderAnalysis.siphoned}
                          </p>
                        </li>
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Average Tax
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                          >
                            {data.holderAnalysis.averageTax.toFixed(2)}%
                          </p>
                        </li>
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Highest Tax
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                          >
                            {data.holderAnalysis.highestTax.toFixed(2)}%
                          </p>
                        </li>
                        <li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
                          <h4
                            class={`${bebase.className}  text-xl uppercase text-[#A8FFBC]`}
                          >
                            Average Gas
                          </h4>
                          <p
                            class={`${bebase.className}  text-2xl uppercase leading-none text-white`}
                          >
                            {data.holderAnalysis.averageGas.toFixed(0)}
                          </p>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-[#FEFCE8] text-[#A16207] text-2xl font-bold py-2 px-6 rounded-md mt-8">
            {error}
          </div>
        )}

        <div className="text-center mt-6 text-xl font-bold">
          Detect Honeypot on the BSC chain. Honeypot detector simulates a buy
          and a sell transaction to determine if the token is a honeypot or not.
          To prevent getting tricked, honeypot detector performs a lot of extra
          checks to minimize false results. Crypto's most advanced honeypot
          detection. Detect honeypots with the highest accuracy.
        </div>
        <div className="text-center mt-4 text-red-300 text-xl font-bold">
          This is not a foolproof method. Just because it's not a honeypot now,
          does not mean it won't change!
        </div>

        <div className="h-1 my-6 bg-[#F1B825] w-full" />
        <div className="text-center font-bold text-4xl my-6">TRUSTED BY</div>
        <div className="max-w-[1000px] w-full flex justify-center  flex-wrap mx-auto ">
          <a href="https://apespace.io/" target="_blank">
            <img
              src="/apespace-logo.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://dexview.com/" target="_blank">
            <img
              src="/dexview.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://dextools.io/" target="_blank">
            <img
              src="/dextools.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://tokensniffer.com/" target="_blank">
            <img
              src="/tokensniffer.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
        </div>
        <div className="max-w-[1000px] w-full flex justify-center  flex-wrap mx-auto mt-6">
          <a href="https://t.me/StarWallet_Bot" target="_blank">
            <img
              src="/starwallet.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://t.me/ProficyPriceBot" target="_blank">
            <img
              src="/proficy.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://cryptach.org/" target="_blank">
            <img
              src="/cryptach.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://cryptach.org/" target="_blank">
            <img
              src="/lotus.svg"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
        </div>
        <div className="max-w-[1000px] w-full flex justify-center  flex-wrap mx-auto mt-6">
          <a href="https://bscheck.eu/" target="_blank">
            <img
              src="/bsccheck.webp"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://cakebot.io/" target="_blank">
            <img
              src="/cakebot.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://app.signai.tech/" target="_blank">
            <img
              src="/signai.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://t.me/chainscoutbots" target="_blank">
            <img
              src="/chainscout.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>

          <a href="https://t.me/ttfbotbot" target="_blank">
            <img
              src="/ttf.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://scan.garudalabs.io/" target="_blank">
            <img
              src="/delay.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
        </div>
        <div className="max-w-[1000px] w-full flex justify-center  flex-wrap mx-auto mt-6">
          <a href="https://goodcrypto.app/x" target="_blank">
            <img
              src="/goodcrypto.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://notifai.trade/" target="_blank">
            <img
              src="/notifai.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://t.me/safeanalyzerbot" target="_blank">
            <img
              src="/safeanalyzer.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://alphagardeners.xyz/" target="_blank">
            <img
              src="/ag.jpg"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
          <a href="https://pocketuniverse.app/" target="_blank">
            <img
              src="/l.png"
              className="inline h-12 mr-2 w-auto plausible-event-name=trustedby"
            />
          </a>
        </div>
        <div className="flex justify-between mt-16 flex-wrap">
          <div className="text-center">
            <div className="text-2xl font-bold">Contact</div>
            <div className="h-1 bg-white w-26 mt-3 " />
            <div className="text-xl leading-10 mt-1 font-bold text-[#F1B825]">
              TG : @ishoneypot <br /> Email : honeypotis@pm.me
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Supported Chains</div>
            <div className="h-1 bg-white w-26 mt-3 " />
            <div className="text-xl leading-10 mt-1 font-bold text-[#F1B825]">
              <span className="underline">Ethereum</span>
              <br /> <span className="underline">Binance Smart Chain</span>
              <br />
              <span className="underline"> Base</span>
            </div>
          </div>
        </div>
        <div className="h-1 my-6 bg-[#F1B825] w-full" />
        <div className="flex justify-between flex-wrap gap-6 items-center font-bold text-xl">
          <div>Copyright 2024 Honeypot.is All rights reserved.</div>
          <div>
            Design Gifted with love by{" "}
            <span className="text-[#F1B825]">Husty Designs</span>
          </div>
        </div>
      </div>
    </main>
  );
}
