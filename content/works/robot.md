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
  - 3D-Printing
  - Fusion 360
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
- **La pompe** : concevoir un système capable de propulser un fluide à plusieurs mètres.  
  Je l’ai modélisée **de A à Z**, et même si les premiers tests ont été faits avec de l’eau, le résultat a été une vraie victoire !

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
<a href="https://github.com/cavalluccijohann/arduino-robot-david" target="_blank" class="flex items-center space-x-2">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
  </svg>
  <span>Robot on GitHub</span>
</a>
