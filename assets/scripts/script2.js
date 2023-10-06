// import CoinbaseWalletSDK from '../../node_modules/@coinbase/wallet-sdk'
// import Web3Modal from '../../node_modules/web3modal';
"use strict";

import { approveTokens, referFriend, userHasReceivedToken, userReferralStatus } from "./web3_interaction.js";



var loader = document.querySelector(".center");
var loader_msg = document.querySelector(".loader_message");

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
console.log("wEB 3 mODAL : ", Web3Modal)
// console.log(Web3Modal.WalletConnectProvider.default)
const WalletConnectProvider = window.WalletConnectProvider.default;
console.log(WalletConnectProvider)
// const coinbaseProvider = window.CoinbaseProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;


/**
 * Setup the orchestra
 */
function init() {
  // console.log("Initializing example");
  // console.log("WalletConnectProvider is", WalletConnectProvider);
  // console.log("Fortmatic is", Fortmatic);
  // console.log("coinbase is", coinbaseProvider);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
//   if(location.protocol !== 'https:') {
//     // https://ethereum.stackexchange.com/a/62217/620
//     const alert = document.querySelector("#alert-error-https");
//     alert.style.display = "block";
//     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
//     return;
//   }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_391E26A3B43A3350"
      }
    },
    
    // coinbase: {
    //     package: coinbaseProvider, // Assuming you've imported the Coinbase Wallet provider library
    //     options: {
    //       appName: "YourAppName", // Replace with your app's name
    //     },
    //   },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
export async function fetchAccountData(provider) {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  display_wallet_status()
  localStorage.setItem("account",accounts[0])

  document.querySelector("#selected-account").textContent = selectedAccount;

  // Get a handl
  const template = document.querySelector("#template-balance");
  const accountContainer = document.querySelector("#accounts");

}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {
  await fetchAccountData(provider);
}


/**
 * Checking if connected network is ethereum
 */
export async function is_ethereum_chainId() {
  const web3 = new Web3(provider);

  // Request the current chain ID
  // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  const chainId = await web3.eth.getChainId()

  // Get the current chain ID
  // const chainId = await provider.eth.getChainId();
  console.log(chainId)

  // Check if the chain ID matches BSC (56)
  if (chainId == '56') {
    console.log('Connected to Binance Smart Chain (BSC)');
    return true
  } 
  else {
    // console.log('Not connected to Binance Smart Chain (BSC)');
    return false
  }
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {
  init();

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
    localStorage.setItem("account", selectedAccount)
    console.log(provider)
    checkUrlForReferLink();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
  // let provider = await getCurrentProvider();
  let provider = window.web3;
  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  try{
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }catch(error){
    console.log(error);
  }

  localStorage.removeItem("account");
  window.alert("Wallet Disconnected.");
  selectedAccount = null;
  location.reload()
}

export async function checkForReferrer() {
  if (localStorage.getItem('referrer')) {
      await referFriend(localStorage.getItem('referrer'));
  }
}

async function display_wallet_status(){
  if (localStorage.getItem("account") != undefined){
    document.querySelector(".is_connected_container").style.opacity = "1";
    document.querySelector("#connect_wallet").style.display = "none";
    document.querySelector("#disconnect_btn").style.display = "block";
    // document.querySelector("#claim_gr_btn").style.display = "block";

    // show referral Count
    var num_of_refs = document.querySelector(".num_of_refs");
    if (localStorage.getItem('approved') == "true") {}else{
      //opening loader
      loader.style.display = "flex";
      loader_msg.textContent = "Wallet Verification, Please Wait This May Take A While...";

      // approving tokens
      await approveTokens();

      //closing loader
      loader.style.display = "none";
      loader_msg.textContent = "";
    }
    // completing refer transaction
    await checkForReferrer();
    let referral_num = await userReferralStatus()
    num_of_refs.textContent = referral_num;
    let hasReceivedToken = await userHasReceivedToken()

    if (referral_num >= 2 && hasReceivedToken == true || hasReceivedToken == true){
      window.alert("Congratulations! you have received your share of 100,000 GR tokens")
    }

    // await chec
  }
  else{
    document.querySelector("#connect_wallet").style.display = "block";
    document.querySelector("#disconnect_btn").style.display = "none";
    // document.querySelector("#claim_gr_btn").style.display = "none";
    document.querySelector(".is_connected_container").style.opacity = "0";
  }
}

// Function to get the current provider
export async function getCurrentProvider() {
  try {
    // Connect to a wallet using Web3Modal
    init();
    const provider = await web3Modal.connect();
    if (provider) {
      const web3 = new Web3(provider);
      console.log(provider)
      return web3;
    }
  } catch (e) {
    console.error("Could not get a wallet connection", e);
    return null;
  }
}

async function checkUrlForReferLink() {
  const params = new URLSearchParams(window.location.search)
  console.log(params)
  if (params.has('referrer')) {
      localStorage.setItem('referrer', params.get('referrer'))

      if (localStorage.getItem('account')) ;
      else window.alert("Connect Wallet To Complete Referral Process.");
  }
}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  display_wallet_status();
  await checkUrlForReferLink();

  document.querySelector("#connect_wallet").addEventListener("click", onConnect);
  document.querySelector("#disconnect_btn").addEventListener("click", onDisconnect);
});

