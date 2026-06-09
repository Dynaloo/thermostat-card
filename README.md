# 🌡️ Thermostat Personnalisé Adaptatif (Heater & AC)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![Version](https://badgen.net/github/release/dynaloo/thermostat-card?label=version&color=blue)
![Downloads](https://badgen.net/github/assets-dl/dynaloo/thermostat-card?label=Downloads&color=blue)
[![Home Assistant Community Forum](https://img.shields.io/badge/Home%20Assistant-Community%20Forum-blue?logo=home-assistant)](https://community.home-assistant.io/t/simple-swipe-card-a-custom-card-for-easy-card-navigation/888415)

Une carte Home Assistant (Lovelace) universelle, moderne et ultra-réactive pour piloter vos appareils de **Chauffage classique fils pilotes** ou de **Climatisation (AC)** (testé avec Mitsubishi). Inspirée du design épuré de *Mushroom*, elle regroupe l'essentiel de vos commandes sur un minimum d'espace.

---

## ✨ Fonctionnalités

* 🔄 **Double Interface :**
  * S'adapte automatiquement selon le type d'appareil choisi (Chauffage avec presets ou Climatisation avec modes complexes).
* 🎛️ **Contrôles AC Avancés :**
  * Gestion intégrée de la vitesse de ventilation (`fan_mode`) et de l'oscillation des volets horizontaux/verticaux (`swing_mode`).
* 🎨 **Indicateurs d'États Clairs :** 
  * Fond d'icône noir lorsque l'appareil est actif, gris uni lorsqu'il est éteint (`off`).
  * Badge pulsant de couleur (Orange pour le chauffage, Bleu pour la clim) en fonction de l'activité réelle (`hvac_action`).
* 🐭 **Infobulles Contextuelles :**
  * Survoler les boutons à la souris affiche des informations détaillées sur l'action ou l'état actuel de la sonde.
* 🛠️ **Éditeur Visuel Intégré :**
  * Configuration simple et rapide grâce au formulaire natif `ha-form`.

---

## 🚀 Installation

### HACS (Recommended)
[![Add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=dynaloo&repository=thermostat-card&category=Plugin)

### HACS (Manual)
1. Open HACS
2. Click on the three dots in the top right corner
3. Select "Custom repositories"
4. Add this repository URL : `https://github.com/dynaloo/thermostat-card`
5. Click "Add"
6. Click on reload
7. Search for "thermostat-card" and install it

### Manual Installation
1. Download `thermostat-card` from the latest release or from the `/build` folder in the main repository
2. Copy it to `config/www/thermostat-card/thermostat-card.js`
3. Add the following to your configuration.yaml:
   ```yaml
   lovelace:
     resources:
       - url: /local/thermostat-card/thermostat-card.js
         type: JavaScript Module
   ```
4. Restart Home Assistant

---

## 🛠️ Configuration exemple

Thermostat-Card includes a visual editor that appears when you add or edit the card through the Home Assistant UI.

or simply add this block to your dashboard in YAML mode :

```yaml
type: custom:thermostat-card
device_type: heater
entity: climate.thermostat_salon_cuisine
title: Thermostat Salon/Cuisine
current_temp_sensor: sensor.temperature_salon_cuisine
```


| Option | Type | Requis | Par défaut | Description |
| :--- | :--- | :---: | :---: | :--- |
| `device_type` | string | **yes** | - | Doit être obligatoirement `heater or ac`. |
| `type` | string | **yes** | - | Doit être obligatoirement `custom:thermostat-card`. |
| `entity` | string | **yes** | - | L'identifiant de votre entité de chauffage (ex: `climate.thermostat_salon_cuisine`). |
| `title` | string | No | - | Le titre personnalisé affiché en haut de la carte (ex: `Thermostat Salon/Cuisine`). |
| `current_temp_sensor` | string | No | - | Le capteur de température à afficher en haut de la carte (ex: `sensor.temperature_salon_cuisine`). |

---

## 📸 Captures d'écran

<div style="text-align: center;">
  <p style="font-style: italic; color: gray; margin-top: 8px;">Aperçu carte Thermostat chauffage en mode <b>off</b></p>
  <img src="https://raw.githubusercontent.com/dynaloo/thermostat-card/main/images/Capture-1.png" alt="Aperçu du Thermostat>" width="400" style="display: block; margin: 0 auto;">
</div>

<div style="text-align: center;">
  <p style="font-style: italic; color: gray; margin-top: 8px;">Aperçu carte Thermostat chauffage en mode <b>on</b></p>
  <img src="https://raw.githubusercontent.com/dynaloo/thermostat-card/main/images/Capture-2.png" alt="Aperçu du Thermostat" width="400" style="display: block; margin: 0 auto;">
</div>

<div style="text-align: center;">
  <p style="font-style: italic; color: gray; margin-top: 8px;">Aperçu carte Thermostat chauffage en mode <b>on</b> et <b>actif</b> (affichage point rouge clignotant sur l'icone</p>
  <img src="https://raw.githubusercontent.com/dynaloo/thermostat-card/main/images/Capture-3.png" alt="Aperçu du Thermostat" width="400" style="display: block; margin: 0 auto;">
</div>

<div style="text-align: center;">
  <p style="font-style: italic; color: gray; margin-top: 8px;">Aperçu carte Thermostat climatiseur en mode <b>off</b></p>
  <img src="https://raw.githubusercontent.com/dynaloo/thermostat-card/main/images/Capture-4.png" alt="Aperçu du Thermostat>" width="400" style="display: block; margin: 0 auto;">
</div>

<div style="text-align: center;">
  <p style="font-style: italic; color: gray; margin-top: 8px;">Aperçu carte Thermostat climatiseur en mode <b>ventilation</b></p>
  <img src="https://raw.githubusercontent.com/dynaloo/thermostat-card/main/images/Capture-5.png" alt="Aperçu du Thermostat>" width="400" style="display: block; margin: 0 auto;">
</div>
---

🤝 Contribute! Suggestions and bug reports are welcome! Feel free to open an issue or submit a pull request to the repository.
