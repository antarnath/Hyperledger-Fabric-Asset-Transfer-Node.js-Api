const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, '../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function getContract() {
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const identity = await wallet.get('appUser');
    if (!identity) {
        throw new Error('appUser identity not found in wallet');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('basic');

    return { gateway, contract };
}

// 🔍 GET all assets
app.get('/assets', async (req, res) => {
    try {
        const { gateway, contract } = await getContract();
        const result = await contract.evaluateTransaction('GetAllAssets');
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➕ POST create asset
app.post('/assets', async (req, res) => {
    const { ID, Color, Size, Owner, AppraisedValue } = req.body;
    try {
        const { gateway, contract } = await getContract();
        await contract.submitTransaction('CreateAsset', ID, Color, Size, Owner, AppraisedValue);
        await gateway.disconnect();
        res.json({ message: 'Asset created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🧠 GET asset by ID
app.get('/assets/:id', async (req, res) => {
    const assetId = req.params.id;
    try {
        const { gateway, contract } = await getContract();
        const result = await contract.evaluateTransaction('ReadAsset', assetId);
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✏️ PUT update asset
app.put('/assets/:id', async (req, res) => {
    const assetId = req.params.id;
    const { Color, Size, Owner, AppraisedValue } = req.body;

    try {
        const { gateway, contract } = await getContract();
        await contract.submitTransaction('UpdateAsset', assetId, Color, Size, Owner, AppraisedValue);
        await gateway.disconnect();
        res.json({ message: `Asset ${assetId} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🗑️ DELETE asset
app.delete('/assets/:id', async (req, res) => {
    const assetId = req.params.id;
    try {
        const { gateway, contract } = await getContract();
        await contract.submitTransaction('DeleteAsset', assetId);
        await gateway.disconnect();
        res.json({ message: `Asset ${assetId} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🌐 API server running at http://localhost:${PORT}`);
});
