const { startChaintracksService, ChaintracksService } = require("@cwi/chaintracks-core")
require('dotenv').config()

const chain = process.env.CHAIN

const options = {
	...ChaintracksService.createChaintracksServiceOptions(),
	httpsPrivateKeyPath: '/home/headersync/certs/privkey.pem',
	httpsCertificatePath: '/home/headersync/certs/fullchain.pem'
}
// HTTPS
const servicePromise = startChaintracksService(chain, options)
// HTTP
//const servicePromise = startChaintracksService(chain)
