# Hyperledger-Fabric-Asset-Transfer-Node.js-Api
# 🔗 Asset Transfer API with Node.js

**The Asset Transfer Basic Application** features a Node.js backend (using the Fabric SDK) and an optional React.js frontend. This project demonstrates key asset operations on a blockchain — including **creating**, **reading**, **updating**, **transferring**, and **deleting** assets.

The smart contract (`chaincode`) supports the following functions:

- `CreateAsset`
- `ReadAsset`
- `UpdateAsset`
- `DeleteAsset`
- `TransferAsset`

This sample highlights how to interact with a Hyperledger Fabric network through transaction invocation and wallet-based identity management in a simplified development environment.

---
## 🧰 Getting Started

### 📥 Clone Fabric Samples

First, clone the official Hyperledger Fabric samples repository:

```bash
git clone https://github.com/hyperledger/fabric-samples.git
cd fabric-samples
