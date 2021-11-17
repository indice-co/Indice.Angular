//https://github.com/axa-group/oauth2-mock-server
const { OAuth2Server } = require('oauth2-mock-server');

let server = new OAuth2Server();

// catching signals and do something before exit
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function (sig) {
    process.on(sig, function () {
        //console.log("Caught interrupt signal");
        // Stop the server
        StopServer().then(() => process.exit());
    });
});


async function Main() {

    await StartServer(server);

    // server.service.on('beforeTokenSigning', (token, _req) => {
    //     token.payload.client_id = "sample-app";
    // });

    // Modify the uri and query parameters before the authorization redirect
    // server.service.on('beforeAuthorizeRedirect', (authorizeRedirectUri, req) => {
    //     authorizeRedirectUri.url.searchParams.set('foo', 'bar');
    // });

    // Simulates a custom token revocation body
    // server.service.on('beforeRevoke', (revokeResponse, req) => {
    //     revokeResponse.body = {
    //         result: 'revoked',
    //     };
    // });

    // Force the oidc service to provide an invalid_grant response on next call to the token endpoint
    // server.service.on('beforeResponse', (tokenEndpointResponse, req) => {
    //     tokenEndpointResponse.body = {
    //         error: 'invalid_grant',
    //     };
    //     tokenEndpointResponse.statusCode = 400;
    // });

    server.service.on('beforeUserinfo', (userInfoResponse, req) => {
        userInfoResponse.body = {
            email: "company@indice.gr",
            email_verified: true,
            family_name: "Company",
            given_name: "Indice",
            name: "company@indice.gr",
            preferred_username: "company@indice.gr",
            sub: "johndoe",
        };
        //userInfoResponse.statusCode = 401;
    });
}

async function StartServer(server) {
    // Generate a new RSA key and add it to the keystore
    await server.issuer.keys.generate('RS256');
    // Start the server
    await server.start(8080, 'localhost');
    //console.log('Issuer URL:', server.issuer.url); // -> http://localhost:8080
}

async function StopServer() {
    await server.stop();
};

Main();