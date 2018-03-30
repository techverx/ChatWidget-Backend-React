import axios from 'axios';
import { BASEPATH } from '../../constants';

function request(method, url, data = {}) {
	return axios({
		method: method,
		url: url,
		data: data,
		dataType: 'json',
		headers: {
			'access-token': localStorage['access-token'],
			'token-type': localStorage['token-type'],
			'client': localStorage['client'],
			'expiry': localStorage['expiry'],
			'uid': localStorage['uid'],
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, access-token, token-type, client, uid',
		}	
	});	  
}

export function logout() {
  localStorage['access-token'] = null
  localStorage['token-type'] = null
  localStorage['client'] = null
  localStorage['expiry'] = null
  localStorage['uid'] = null
}

export function postMessage(data) {
  return request('post', BASEPATH + 'messages.json', {
  	message: data,
  }).then(function(response) {
	});
}

export function fetchMessages(sessionId) {
  	return request('get', BASEPATH + 'messages.json?session_id=' + sessionId).
  		then(function(res) {
		  return res.data;
	});
}

export function fetchConvos() {
  	return request('get', BASEPATH + 'conversations.json').then(function(res) {
		return res.data;
	});
}

