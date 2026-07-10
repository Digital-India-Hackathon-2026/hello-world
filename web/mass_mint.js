const { ethers } = require("ethers");
require('dotenv').config({ path: './web/.env.local' });

const ABI = [
  "function registerParcel(address owner, string surveyNumber, string district, string geo, uint256 area, bytes32 documentHash) external returns (uint256)"
];

async function main() {
  console.log("Connecting to Sepolia...");
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_CHAIN_RPC);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "46144e47a091d50ca98c4f9bd2d645eae7c6abbe4c770722c4623f03dd9d1e83", provider);
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, wallet);

  const MOCK_PARCELS = [
    { survey: "BLR-URB-901", district: "Bengaluru Urban", geo: "12.9716,77.5946", area: 1200 },
    { survey: "MUM-SUB-402", district: "Mumbai Suburban", geo: "19.0760,72.8777", area: 850 },
    { survey: "DEL-SOU-211", district: "South Delhi", geo: "28.5355,77.2410", area: 2400 },
    { survey: "HYD-CEN-333", district: "Hyderabad", geo: "17.3850,78.4867", area: 1500 },
    { survey: "PUN-WES-105", district: "Pune", geo: "18.5204,73.8567", area: 3000 }
  ];

  console.log(`Minting 5 parcels to your wallet (${wallet.address})...`);
  console.log("This will take about 1-2 minutes on Sepolia.");

  for (const p of MOCK_PARCELS) {
    console.log(`\nMinting ${p.district} (${p.survey})...`);
    try {
      const tx = await contract.registerParcel(
        wallet.address,
        p.survey,
        p.district,
        p.geo,
        p.area,
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
      const receipt = await tx.wait();
      console.log(`✅ Transaction Confirmed: ${receipt.hash}`);
    } catch (e) {
      console.error("Failed to mint:", e.message);
    }
  }

  console.log("\nFinished minting on Sepolia!");
  
  // Call the sync API to pull the events from the blockchain into Supabase
  try {
    const res = await fetch("https://bhu-suraksha.vercel.app/api/sync", { method: "POST" });
    const text = await res.text();
    console.log("\nDatabase Sync Response:", text);
  } catch(e) {
    console.log("Could not trigger sync automatically. Just visit /api/sync on your Vercel app!");
  }
}

main().catch(console.error);
