const https = require('https');
const fs = require('fs');
require('dotenv').config()

const chain = process.env.CHAIN
const port = chain === 'main' ? '8084' : '8083'

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
	// Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
	
	// Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // No Content for OPTIONS
    res.end();
    return;
  }

  // Redirect all requests to the target domain
  const Location = `https://${chain}net-chaintracks.babbage.systems${req.url}`
  console.log(`redirect to ${Location}`)
	res.writeHead(301, {
		Location,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Expose-Headers': '*',
		'Access-Control-Allow-Private-Network': 'true'
	});
  res.end();
});

server.listen(port, () => {
  console.log(`HTTPS redirect server running on port ${port}`);
});