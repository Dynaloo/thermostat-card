# 🌡️ Thermostat Personnalisé Adaptatif (Heater & AC)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![Version](https://img.shields.io/badge/version-1.0.8-blue.svg)

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

### Via HACS (Recommandé)
1. In Home Assistant, go to HACS → Integrations → Custom Repositories.
2. Add this repository URL: `https://github.com/dynaloo/thermostat-card` (type: Dashboard).
3. Search for "thermostat-card" in HACS and click Install.
4. Click on reload.

### Installation Manuelle
1. Download the `thermostat-card.js` file to the root of this repository.
2. Copy the file to your Home Assistant folder: `config/www/thermostat-card.js`.
3. Add the resource reference to your dashboard (Settings -> Dashboards -> 3 dots in the upper right corner -> Resources):
   * **URL :** `/local/thermostat-card.js`
   * **Type :** `JavaScript Module`

---

## 🛠️ Configuration exemple

Choose the personalized thermostat card, and fill in the fields or simply add this block to your dashboard in YAML mode :

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

---
🤝 Contribuer
Contribute! Suggestions and bug reports are welcome! Feel free to open an issue or submit a pull request to the repository.
