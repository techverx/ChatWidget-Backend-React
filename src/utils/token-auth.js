import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from '../constants'

const config = {
  authUrl,
  userAttributes: {
    email: localStorage['email'],
    uid: localStorage['uid'],
    expiry: localStorage['expiry'],
    client: localStorage['client'],
    'access-token': localStorage['access-token'],
    'token-type': localStorage['token-type']
  },
  userRegistrationAttributes: {
    email: 'email',
    password: 'password',
  },
}
const {
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  signInUser,
  signOutUser,
  verifyCredentials,
}