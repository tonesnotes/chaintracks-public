const { startChaintracksService, ChaintracksService } = require("@cwi/chaintracks-core")

const chain = 'main'
const options = {
	...ChaintracksService.createChaintracksServiceOptions(),
	httpsPrivateKeyPath: '/home/headersync/certs/privkey.pem',
	httpsCertificatePath: '/home/headersync/certs/fullchain.pem'
}
// HTTPS
const servicePromise = startChaintracksService(chain, options)
// HTTP
//const servicePromise = startChaintracksService(chain)
