# Arrêtable

> Arrêtable est une extension Chrome pour empêcher [le site d'inarrêtable](https://el2zay.is-a.dev/inarretable/inarretable.html) de vous spammer.

Arrêtable bloque :
* Les notifications
* Le faux support d'Elbot
* Le rick roll (le son qui se joue en arrière-plan)
* Le texte "Je suis inarrêtable"

Arrêtable rajoute :
* Un thème clair/sombre
* Un système de détection des mises à jour


## Installation

Arrêtable ne fait pas partie du Chrome Web Store donc...
* Aller sur chrome://extensions et activer le mode développeur
* Télécharger l'archive .zip de la dernière version d'[Arrêtable](https://github.com/johan-perso/arretable/releases) sur votre ordinateur et décompressez-la.
* Appuyer sur le bouton "Charger l'extension non empaquetée" via la page d'extensions et sélectionner le dossier contenant Arrêtable.

L'extension devrait être installée et opérationnelle ! Notez tout de même que si un des fichiers d'Arrêtable est supprimé, l'extension ne fonctionnera plus.


## Comment ça marche ?

### Blocage de notifications

Inarrêtable utilise un "service worker" afin d'afficher les notifications (vous pouvez le trouver [ici](https://el2zay.is-a.dev/inarretable/web/sw-notif.js)). Arrêtable va tout simplement, bloquer l'accès au service worker, si la requête vient d'un script.

### Blocage du rick roll

Le rick roll est un simple audio qui se joue au démarrage de la page et qui s'insère dans une variable `audio`. Arrêtable va glisser une image invisible dans la page du site, lorsque l'image **n'est pas chargée** en raison d'une erreur, le volume de l'`audio` sera mis à 0. (oui j'ai vraiment galéré pour trouver une méthode qui marche et j'arrive même pas à l'expliquer)

### Blocage des textes et du support Elbot

Lorsque la page s'affiche, tout le contenu de la page sera supprimé par l'extension. Aussi simple que ça


## Licence

ISC © [Johan](https://johanstickman.com)
