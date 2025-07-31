---
title: Combat Robot
description: My first venture into competitive robotics. Representing a fusion of engineering challenges and competitive strategy.
url: https://github.com/cavalluccijohann/arduino-robot-david
date: 2025-04-00
year: 2025
image: /assets/works/robot.webp
minRead: 5
roles:
  - Full Stack
technologies:
  - Arduino
teamName: Author
authors:
  - name: Johann Cavallucci
    to: https://x.com/JohannCVL
    target: _blank
    avatar:
      src: https://avatars.githubusercontent.com/u/72015679?v=4
      alt: Johann Cavallucci
---
# 🔥 Flamethrower Robot – Arduino Combat Bot

## 🤖 Présentation rapide

Ce projet est né d’un simple défi entre deux amis :

**Construire un robot de combat en 2 semaines, avec moins de 50€. Et tout ça chacun de son côté !**

Après de nombreuses heures de réflexion, j’ai décidé d’utiliser un lance-flammes.  
D’une part parce que bon… c’est stylé 🔥  
Et aussi parce qu’un fluide en feu peut s’infiltrer dans les moindres failles de l’adversaire.

Mais une bonne attaque ne suffit pas, il faut penser **défense**.  
J’ai imaginé une **forme conique** pour limiter les points d’accroche et dévier les attaques, en me préparant à l’inconnu — je ne savais pas du tout ce que mon adversaire allait construire.

> Voilà un premier aperçu de la BÊTE…  
> Petite mais terrible.

---

## 🧱 Conception & composants

Bon, c’est bien beau d’avoir l’idée… mais comment on fabrique ça ?

La première étape : **beaucoup de recherches** pour identifier les composants les plus efficaces, tout en respectant le budget serré.

### 🧩 Matériel utilisé

| Élément                     | Description                                 |
|----------------------------|---------------------------------------------|
| **Arduino Uno**            | Microcontrôleur principal                   |
| **HC-05**                  | Module Bluetooth pour le contrôle           |
| **L298N H-Bridge**         | Contrôle de la propulsion                   |
| **Moteurs DC + roues**     | Mouvement du robot                          |
| **Réservoir imprimé 3D**   | Stockage du carburant (isopropanol)         |
| **Allumeur à arc électrique** | Allumage du système de flamme           |
| **Batteries 18650**        | Alimentation                                |

---

## ⚙️ Pourquoi ces choix techniques ?

- **Arduino Uno** : peu coûteux, simple à programmer, parfait pour un projet comme celui-ci.
- **Bluetooth (HC-05)** : facile à intégrer, communication directe avec le smartphone.
- **L298N** : contrôle indépendant des deux moteurs (avant/arrière/gauche/droite).
- **Impression 3D** : essentielle pour fabriquer un réservoir et des pièces sur-mesure.
- **Allumeur à arc électrique** : résiste au mouvement, activable à distance, fiable même en conditions instables.

---

## 🚧 Les défis rencontrés

- **Le temps** : 2 semaines en bossant le soir… c’est très court, surtout pour intégrer un lance-flammes.
- **L’alimentation** : gérer plusieurs composants avec une batterie limitée.
- **Le budget** : tout créer à partir de rien (pompe DIY, structure imprimée, etc.).
- **L’électronique** : apprendre à comprendre les puissances, les risques, et comment tout adapter proprement.

---

## 🧠 Ce que j’ai appris

- Comment intégrer plusieurs modules avec Arduino
- Utiliser le Bluetooth dans un projet embarqué
- Bases d’électronique : tension, intensité, composants, sécurité
- Organiser un projet technique **sous contraintes réelles**

---

## 🔌 Schéma électronique

*(Ajoute ici un visuel clair : Fritzing, Lucidchart, ou même un schéma simple au trait)*

---

## ✅ Résultat final

Le robot est **fonctionnel** :

- Se déplace dans toutes les directions
- Contrôle à distance via smartphone
- Système de flamme fonctionnel et **sécurisé**
- Respecte les contraintes : **< 50€**, **< 2 semaines**

Mais… j’ai **perdu** 😅

> 💡 Conseil : définissez une **taille et un poids max** si vous lancez un défi comme celui-ci. Ça vous évitera les surprises !

---

## 📸 Galerie

*(Ajoute ici des photos : robot terminé, intérieur, flamme, impressions 3D, tests, etc.)*

---

## 🗂️ Pour aller plus loin (optionnel)

- [Lien vers le code Arduino](#)
- [Fichier STL du réservoir imprimé](#)
- [Schéma électronique complet](#)
