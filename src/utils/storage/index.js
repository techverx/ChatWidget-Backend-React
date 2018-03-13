import { USERID } from '../../constants';

function get(key){
	return localStorage.getItem(key);
}

function set(key, value){
	localStorage.setItem(key, value);
}

export function sessionCheck() {
	let uid = get(USERID)
	return Boolean(uid);
}

export function setUuid() {
	let uid = PUBNUB.uuid();
	set(USERID, uid);
	return uid;
}

export function getUuid() {
	var uid = get(USERID);
	if (!uid || uid == undefined || uid == null) {
		uid = setUuid();
	}
	return uid;
}

