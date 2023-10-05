import { fetchAccountData, getCurrentProvider } from "./script2.js";

var claim_token_container = document.querySelector(".connect_wallet_cont");
var claim_token_btn = document.querySelector("#claim_gr_btn");
var close_claim_container_btn = document.getElementById("close_wallet_options");
var loader = document.querySelector(".center");
var loader_msg = document.querySelector(".loader_message");
var refer_btn = document.querySelector(".refer_wrapper");




export function openLoader(loader_message) {
    loader.style.display = "flex";
    loader_msg.textContent = loader_message;
}

export function closeLoader() {
    loader.style.display = "none";
    loader_msg.textContent = "";
}

async function showReferLink() {
    let msg = "An Error Occured."
    // check if wallet is connected first
    if (localStorage.getItem('account')) {
        msg = `REFERRAL LINK = ${window.location.href}?referrer=${localStorage.getItem('account')}`;
        console.log("MSG GENERATED")
    }else{
        // let provider = new Web3(window.ethereum)
        // await fetchAccountData(provider);
        // msg = `Your Referral Link is ${window.location.href}?referrer=${localStorage.getItem('account')}`;
        // console.log("MSG GENERATED")
        // location.reload()
        msg = "Please Connect Your Wallet To Generate A Referral Link."
    }
    window.alert(msg);
}




claim_token_btn.addEventListener("click", () => {
    claim_token_container.style.top = "0";
})

close_claim_container_btn.addEventListener("click", ()=> {
    claim_token_container.style.top = "-1000000000000px";
})

refer_btn.addEventListener("click", async () => {await showReferLink()});
