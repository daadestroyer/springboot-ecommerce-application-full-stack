export default {
    oidc:{
        // public identifier for clientId
        clientId:'0oa14wieh0KpVOWVd5d7',
        // issuer of token
        issuer:'https://dev-87041043.okta.com/oauth2/default',
        // once user logged in send them here
        redirectUri:'http://localhost:4200/login/callback',
        scopes:['openid','profile','email']
        // openid : required for authentication request
        // profile : user first name , last name , phone etc
        // email : user's email address
    }
}
