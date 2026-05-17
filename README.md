# 🌡️ Thermostat Card

Une carte minimaliste et performante écrite en JavaScript pur (`LitElement`) pour contrôler efficacement vos entités `climate` sans dépendances externes.

## ✨ Fonctionnalités
* **Zéro dépendance :** Pas besoin d'installer *Mushroom*, *Stack-in-card*, *Button-card* ou *Card-mod*. Tout est inclus nativement.
* **Dynamique :** L'icône centrale change de forme, de couleur et s'anime (clignotement en mode chauffe) selon l'état actuel du thermostat.
* **Contrôle rapide :** Ajustement de la température (+/- 0.5°C), gestion du mode On/Off et sélection immédiate des presets (Confort, Éco, Hors gel, Boost, Manuel).

---

## 🛠️ Configuration Rapide

Ajoutez simplement ce bloc dans votre tableau de bord en mode YAML :

```yaml
type: custom:thermostat-card
title: Thermostat Salon/Cuisine
entity: climate.thermostat_salon_cuisine
current_temp_sensor: sensor.temperature_salon_cuisine
```


| Option | Type | Requis | Par défaut | Description |
| :--- | :--- | :---: | :---: | :--- |
| `type` | string | **Oui** | - | Doit être obligatoirement `custom:thermostat-card`. |
| `entity` | string | **Oui** | - | L'identifiant de votre entité de chauffage (ex: `climate.thermostat_salon_cuisine`). |
| `title` | string | Non | - | Le titre personnalisé affiché en haut de la carte (ex: `Thermostat Salon/Cuisine`). |
| `current_temp_sensor` | string | Non | - | Le capteur de température à afficher en haut de la carte (ex: `sensor.temperature_salon_cuisine`). |


<div style="text-align: center;">
  <p style="font-style: italic; color: gray; margin-top: 8px;">Aperçu de la carte Thermostat chauffage</p>
  <img src="https://raw.githubusercontent.com/dynaloo/thermostat-card/main/images/Capture-1.png" alt="Aperçu du Thermostat" width="400" style="display: block; margin: 0 auto;">
</div>
