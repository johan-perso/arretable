// Bloquer l'accès au service worker d'inarrêtable, si la requête vient d'un script
chrome.webRequest.onBeforeRequest.addListener(function (details){
	if(details.type === "script") return { cancel: true }
}, { urls: ["https://el2zay.is-a.dev/inarretable/web/sw-notif.js"] }, ['blocking']);
