function login (loginType, redirectUri) {
	var client = new OktaAuth({
		url: 'https://dev-349912.oktapreview.com',
		clientId: 'OZmBGnsSdLmHv3Fyf56g',
		redirectUri: redirectUri
	});

	var options = {
		responseType: ['id_token', 'code'],
		scopes: ['openid', 'email']
	};

	if (loginType == "redirect") {
		client.token.getWithRedirect();
	} else if (loginType == "popup") {
		client.token.getWithPopup(options)
			.then(function(tokenArray) {
				var idToken = tokenArray[0];
				client.token.decode(idToken);
			}).catch(function(err) {
				console.err(err)
			});
	} else {
		console.err("Unsupported login type passed to login().  Should be either 'redirect' or 'popup'")
	}
}