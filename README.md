# 🌡️ Thermostat Card

Une carte minimaliste et performante écrite en JavaScript pur (`LitElement`) pour contrôler efficacement vos entités `climate` sans dépendances externes.

## ✨ Fonctionnalités
* **Zéro dépendance :** Pas besoin d'installer *Mushroom*, *Stack-in-card*, *Button-card* ou *Card-mod*. Tout est inclus nativement.
* **Dynamique :** L'icône centrale change de forme, de couleur et s'anime (clignotement en mode chauffe) selon l'état actuel du thermostat.
* **Contrôle rapide :** Ajustement de la température (+/- 0,5°C), gestion du mode On/Off et sélection immédiate des presets (Confort, Éco, Hors gel, Boost, Manuel).
* **Badge rouge clignotant :** indique que le chauffage est actif (en cours de chauffe)
* **Affichage température ambiante :** s'affiche uniquement si une entitée de température est déclarée
* **Adaptatif :** génère les icones spécifiques pour les climatiseurs (testé avec Mitsubishi)

---

## Installation via HACS (Recommended)
1. In Home Assistant, go to HACS → Integrations → Custom Repositories.
2. Add this repository URL: `https://github.com/dynaloo/thermostat-card` (type: Dashboard).
3. Search for "thermostat-card" in HACS and click Install.
4. Click on reload.

---

## 🛠️ Quick Setup

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
