const jwt = require("jsonwebtoken");
const secret = "EcommerceAPI";

// Token Creator
module.exports.createAccessToken = (user) => {
	// payload
	const data = {
		id: user._id,
		email: user.email,
		password: user.password
	}
	return jwt.sign(data, secret, {/*expiresIn: "60s"*/});
}

// Token Verifier
// To verify a token from the request (from postman)
module.exports.verify = (request, response, next) => {
	// Get JWT (JSON Web Token) from postman
	let token = request.headers.authorization
	if(typeof token !== "undefined"){
		console.log(token);

		// removes the first characters ("Bearer ") from the token
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data) =>{
			if(error){
				return response.send({
					auth: "Failed. "
				});
			}
			else{
				next();
			}
		})
	}
}

// Token Decoder
// To decode the user details from the token
module.exports.decode = (token) => {

	if(typeof token !== "undefined"){

		// remove first 7 characters ("Bearer ") from the token
		token = token.slice(7, token.length);
	}

	return jwt.verify(token, secret, (error, data) => {
		if(error){
			return null
		}
		else{
			return jwt.decode(token, {complete:true}).payload
		}
	})
}