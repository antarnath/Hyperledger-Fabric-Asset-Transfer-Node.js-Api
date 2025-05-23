# Hyperledger-Fabric-Asset-Transfer-Node.js-Api
# 🔗 Asset Transfer API with Node.js

**The Asset Transfer Basic Application** features a Node.js backend (using the Fabric SDK). This project demonstrates key asset operations on a blockchain — including **creating**, **reading**, **updating**, **transferring**, and **deleting** assets.

The smart contract (`chaincode`) supports the following functions:

- `CreateAsset`
- `ReadAsset`
- `UpdateAsset`
- `DeleteAsset`
- `TransferAsset`

This sample highlights how to interact with a Hyperledger Fabric network through transaction invocation and wallet-based identity management in a simplified development environment.

---
## 🧰 Getting Started

First, clone the official Hyperledger Fabric samples repository:

```bash
git clone https://github.com/hyperledger/fabric-samples.git
```
Navigate to the test network directory within your local clone of the fabric-samples repository:
```bash
cd fabric-samples/test-network
```
Started the test network and created the channel with Certificate Authorities using:
```
./network.sh up createChannel -ca
```
Deployed the chaincode using:
```
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
```
## 🚀 Run The Server Using Node.js SDK
First add this fabric-api folder to the fabric-sample direcotry then go to the fabric-api folder:
```bash
cd fabric-sample/fabric-api
```
Install Node.js Dependencies
```
npm install
```
Enroll Admin
```
node enrollAdmin.js
```
Register User
```
node registerUser.js
```
Start the API Server
```
node server.js
```
## 📡 API Endpoints

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/assets`        | Get all assets          |
| GET    | `/assets/:id`    | Read asset by ID        |
| POST   | `/assets`        | Create a new asset      |
| PUT    | `/assets/:id`    | Update an asset         |
| DELETE | `/assets/:id`    | Delete an asset         |

---

### 🧪 Example: Create Asset (POST /assets)

```json
{
  "ID": "asset101",
  "Color": "blue",
  "Size": "15",
  "Owner": "Alice",
  "AppraisedValue": "700"
}
```
