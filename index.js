const https = require('https');
const fs = require('fs');
require('dotenv').config()

const chain = process.env.CHAIN

const options = {
	httpsPrivateKeyPath: '/home/headersync/certs/privkey.pem',
	httpsCertificatePath: '/home/headersync/certs/fullchain.pem'
}

// SSL certificate paths (replace with your actual certificate paths)
const privateKey = fs.readFileSync(options.httpsPrivateKeyPath, 'utf8');
const certificate = fs.readFileSync(options.httpsCertificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const server = https.createServer(credentials, (req, res) => {
  // Redirect all requests to the target domain
  res.writeHead(301, {
    Location: `https://${chain}net-chaintracks.babbage.systems${req.url}`
  });
  res.end();
});

// Listen on port 443 (default HTTPS port)
const PORT = 443;
server.listen(PORT, () => {
  console.log(`HTTPS redirect server running on port ${PORT}`);
});