// Vider le body
document.body.innerHTML = ""

// Crée deux div ✨ invisible ✨ (pour éviter de spam des erreurs car le site va tenter d'ajouter du texte dans ce div)
document.body.innerHTML += "<div id='text' style='display:none;'></div>"
document.body.innerHTML += "<div id='chat' style='display:none;'></div>"

// Arrêter le son à partir d'une image invisible
setInterval(() => {
	if(!document.getElementById("muteAudio")) document.getElementById("injectedArretableExtension_header").insertAdjacentHTML("afterbegin","<img id='muteAudio' src='' style='display:none;' onerror='audio.volume = 0'></img>")
}, 100)

// Modifier le titre
window.document.title = 'Je suis ✨ arrêtable ✨'

// Modifier les classes du body
if(!document.cookie.toString().includes("lightMode=true")) document.getElementsByTagName("body")[0].classList = `h-screen items-center flex flex-col justify-center text-center overflow-x-hidden overflow-y-hidden`
if(document.cookie.toString().includes("lightMode=true")) document.getElementsByTagName("body")[0].classList = `h-screen items-center flex flex-col justify-center text-center bg-gray-50 overflow-x-hidden overflow-y-hidden`

// Afficher un "Je suis arrêtable" :)
if(!document.cookie.toString().includes("lightMode=true")) document.body.innerHTML += `<div id="injectedArretableExtension_header"><h1 class="text-gray-200 font-bold text-4xl">Je suis <b class="font-bold">arrêtable</b></h1><h3 class="mt-3 text-gray-300 text-xl">Extension faite par <a class="underline" href="https://johanstickman.com">Johan le stickman</a></h3><p class="mt-2 text-gray-300 text-xl">Arrêtable utilise la version <span>${chrome.runtime.getManifest().version}</span>.</p></div>`
if(document.cookie.toString().includes("lightMode=true")) document.body.innerHTML += `<div id="injectedArretableExtension_header"><h1 class="text-gray-800 font-bold text-4xl">Je suis <b class="font-bold">arrêtable</b></h1><h3 class="mt-3 text-gray-700 text-xl">Extension faite par <a class="underline" href="https://johanstickman.com">Johan le stickman</a></h3><p class="mt-2 text-gray-700 text-xl">Arrêtable utilise la version <span>${chrome.runtime.getManifest().version}</span>.</p></div>`

// Afficher quelques boutons
if(!document.cookie.toString().includes("lightMode=true")){
	document.body.innerHTML += `<div id="injectedArretableExtension_button" class="mt-6 space-x-2 space-y-2"><a href="https://github.com/johan-perso/arretable" role="button" class="btn btn-ghost bg-gray-700">GitHub d'arrêtable</a></div>`
	document.getElementById("injectedArretableExtension_button").insertAdjacentHTML("afterbegin",`<a href="javascript:void(0)" id="lightModeButton" role="button" class="btn btn-ghost bg-gray-700"><span style="font-size: 1em;"><i class="fas fa-sun"></i></span>&nbsp;Thème clair</a>`)
}
if(document.cookie.toString().includes("lightMode=true")){
	document.body.innerHTML += `<div id="injectedArretableExtension_button" class="mt-6 space-x-2 space-y-2"><a href="https://github.com/johan-perso/arretable" role="button" class="btn btn-ghost bg-gray-200 text-gray-700">GitHub d'arrêtable</a></div>`
	document.getElementById("injectedArretableExtension_button").insertAdjacentHTML("afterbegin",`<a href="javascript:void(0)" id="darkModeButton" role="button" class="btn btn-ghost bg-gray-200 text-gray-700"><span style="font-size: 1em;"><i class="fas fa-moon"></i></span>&nbsp;Thème sombre</a>`)
}

// Détecter quand le bouton "lightModeButton" est utilisé
document.getElementById("lightModeButton")?.addEventListener("click", () => {
	// Afficher un toast
	toast("Thème d'arrêtable",`Activation du thème claire effectuée`,"success")

	// Modifier un cookie
	document.cookie = "lightMode=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT"

	// Actualiser la page
	location.reload()
})

// Détecter quand le bouton "darkModeButton" est utilisé
document.getElementById("darkModeButton")?.addEventListener("click", () => {
	// Afficher un toast
	toast("Thème d'arrêtable",`Désactivation du thème claire effectuée`,"success")

	// Modifier un cookie
	document.cookie = "lightMode=true; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

	// Actualiser la page
	setTimeout(() => location.reload(), 900)
})

// Vider les divs invisible toute les 10 secondes
setInterval(() => {
	document.getElementById("text").innerHTML = ""
	document.getElementById("chat").innerHTML = ""
}, 10000)

// Quand la page est chargé
window.onload = async function(){
	// Importer animate.css
	document.head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>`

	// Vérifier les mises à jours
		// Obtenir la dernière version
		var lastVersion = await fetch("https://arretable.johanstickman.com/api/extensionLastVersion")
		.then(res => res.json())

		// En cas d'impossibilité de faire la requête
		.catch(err => {
			toast("Vérification des MÀJ","Impossible de vérifier les mises à jour.","error")
			return { extensionLastVersion: chrome.runtime.getManifest().version }
		})

		// Si la dernière version n'est pas la même que celle dans le manifest
		if(lastVersion.extensionLastVersion !== chrome.runtime.getManifest().version){
			toast("Vérification des MÀJ",`Une mise à jour est disponible ! <a href="https://bit.ly/arretable-releases" class="underline">Clique ici</a>.`,"info")
		}
}

// Fonction pour afficher un toast
async function toast(title="Aucun titre donné", content="Aucun contenu donné", type="info"){
	// Générer un ID unique au toast
	var toastId = Math.floor(Math.random() * 999999)

	// Crée un div contenant tout les toasts si il n'existe pas
	if(!document.getElementById("toasts")) document.body.innerHTML += `<div id="toasts" bottom="2" class="absolute right-2 h-16 space-y-2 bottom-2"></div>`

	// Ajouter +18 à la classe bottom (div toasts)
		// Obtenir la valeur actuelle du botom
		var bottom = parseInt(document.getElementById("toasts").getAttribute("bottom"))

		// Obtenir la variable Tailwind la plus proche de la valeur actuelle +18
		var bottomTailwind = [2,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96]
		var closest = bottomTailwind.reduce((prev, curr) => Math.abs(curr - (bottom+18)) < Math.abs(prev - (bottom+18)) ? curr : prev);

		// Modifier l'attribut
		if(bottom !== 2) document.getElementById("toasts").setAttribute("bottom", parseInt(closest))
		if(bottom === 2) document.getElementById("toasts").setAttribute("bottom", parseInt(3))

		// Modifier les classes
		if(bottom !== 2) document.getElementById("toasts").classList.forEach(className => {
			if(className.includes("bottom-")){
				document.getElementById("toasts").classList.remove(className)
				document.getElementById("toasts").classList.add(`bottom-${parseInt(closest)}`)
			}
		})

	// Faire apparaitre le toast
		// Type : success
		if(type === "success"){
			document.getElementById("toasts").insertAdjacentHTML("afterbegin",`<div onclick="this.classList.remove('animate__fadeInRight'); this.classList.add('animate__fadeOutRight'); setTimeout(() => {this.innerHTML = ''; this.style.display = 'none'}, 1000)" id="arretableInjectedToast_${toastId}" class="animate__animated animate__fadeInRight flex w-full max-w-md overflow-hidden rounded-lg shadow-md ${(document.cookie.toString().includes("lightMode=true")) ? `bg-gray-800` : 'bg-white'}"><div class="flex items-center justify-center w-12 bg-green-500"><svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/></svg></div><div class="px-4 py-2 -mx-3"><div class="mx-3"><p class="text-left font-semibold ${(document.cookie.toString().includes("lightMode=true")) ? `text-green-500` : 'text-green-400'}">${title}</p><p class="text-left text-sm truncate ${(document.cookie.toString().includes("lightMode=true")) ? `text-gray-300` : 'text-gray-600'}">${content}</p></div></div></div>`)
		}
		// Type : info
		if(type === "info"){
			document.getElementById("toasts").insertAdjacentHTML("afterbegin",`<div onclick="this.classList.remove('animate__fadeInRight'); this.classList.add('animate__fadeOutRight'); setTimeout(() => {this.innerHTML = ''; this.style.display = 'none'}, 1000)" id="arretableInjectedToast_${toastId}" class="animate__animated animate__fadeInRight flex w-full max-w-md overflow-hidden rounded-lg shadow-md ${(document.cookie.toString().includes("lightMode=true")) ? `bg-gray-800` : 'bg-white'}"><div class="flex items-center justify-center w-12 bg-blue-500"><svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/></svg></div><div class="px-4 py-2 -mx-3"><div class="mx-3"><p class="text-left font-semibold ${(document.cookie.toString().includes("lightMode=true")) ? `text-blue-400` : 'text-blue-500'}">${title}</p><p class="text-left text-sm truncate ${(document.cookie.toString().includes("lightMode=true")) ? `text-gray-300` : 'text-gray-600'}">${content}</p></div></div></div>`)
		}
		// Type : erreur
		if(type === "error"){
			document.getElementById("toasts").insertAdjacentHTML("afterbegin",`<div onclick="this.classList.remove('animate__fadeInRight'); this.classList.add('animate__fadeOutRight'); setTimeout(() => {this.innerHTML = ''; this.style.display = 'none'}, 1000)" id="arretableInjectedToast_${toastId}" class="animate__animated animate__fadeInRight flex w-full max-w-md overflow-hidden rounded-lg shadow-md ${(document.cookie.toString().includes("lightMode=true")) ? `bg-gray-800` : 'bg-white'}"><div class="flex items-center justify-center w-12 bg-red-500"><svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" /></svg></div><div class="px-4 py-2 -mx-3"><div class="mx-3"><p class="text-left font-semibold ${(document.cookie.toString().includes("lightMode=true")) ? `text-red-400` : 'text-red-600'}">${title}</p><p class="text-left text-sm truncate ${(document.cookie.toString().includes("lightMode=true")) ? `text-gray-300` : 'text-gray-600'}">${content}</p></div></div></div>`)
		}

	// Supprimer le toast au bout de quelques secondes
	setTimeout(() => {
		// Afficher l'animation de fadeOut
		document.getElementById(`arretableInjectedToast_${toastId}`).classList.remove("animate__fadeInRight")
		document.getElementById(`arretableInjectedToast_${toastId}`).classList.add("animate__fadeOutRight")

		// Supprimer le toast après quelques secondes
		setTimeout(() => {
			// Le rendre invisible et supprimer son contenu
			document.getElementById(`arretableInjectedToast_${toastId}`).innerHTML = ''
			document.getElementById(`arretableInjectedToast_${toastId}`).style.display = "none"

			// Ajouter -18 au toasts
				// Obtenir la valeur actuelle du botom
				var bottom = parseInt(document.getElementById("toasts").getAttribute("bottom"))

				// Obtenir la variable Tailwind la plus proche de la valeur actuelle -18
				var bottomTailwind = [2,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96]
				var closest = bottomTailwind.reduce((prev, curr) => Math.abs(curr - (bottom-18)) < Math.abs(prev - (bottom-18)) ? curr : prev);

				// Modifier l'attribut
				if(bottom !== 2) document.getElementById("toasts").setAttribute("bottom", parseInt(closest))
				if(bottom === 2) document.getElementById("toasts").setAttribute("bottom", parseInt(3))

				// Modifier les classes
				if(bottom !== 2) document.getElementById("toasts").classList.forEach(className => {
					if(className.includes("bottom-")){
						document.getElementById("toasts").classList.remove(className)
						document.getElementById("toasts").classList.add(`bottom-${parseInt(closest)}`)
					}
				})
		}, 1500)
	}, 5000)
}
