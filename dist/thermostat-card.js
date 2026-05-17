import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class ThermostatCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Vous devez définir une entité (entity)");
    }
    this.config = config;
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    // Récupération dynamique de l'entité depuis le YAML
    const entityId = this.config.entity;
    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-card>
          <div style="padding: 16px; color: red; font-weight: bold;">
            Entité introuvable : ${entityId}
          </div>
        </ha-card>
      `;
    }

    const mode = stateObj.state;
    const preset = stateObj.attributes.preset_mode;

    // Détermination de l'icône principale et de sa couleur
    let mainIcon = "mdi:thermostat";
    let mainIconColor = "rgba(255, 255, 0, 1)";
    let shapeColor = "rgba(0, 0, 0, 1)";

    if (mode === "off") {
      mainIcon = "mdi:power";
      mainIconColor = "rgba(255, 255, 255, 1)";
      shapeColor = "rgba(128, 128, 128, 1)";
    } else if (mode === "heat") {
      switch (preset) {
        case "comfort":
          mainIcon = "mdi:sofa";
          mainIconColor = "rgba(255, 165, 0, 1)";
          break;
        case "eco":
          mainIcon = "mdi:leaf";
          mainIconColor = "rgba(0, 128, 0, 1)";
          break;
        case "frost":
          mainIcon = "mdi:snowflake-thermometer";
          mainIconColor = "rgba(0, 191, 255, 1)";
          break;
        case "boost":
          mainIcon = "mdi:rocket-launch";
          mainIconColor = "rgba(255, 0, 0, 1)";
          break;
        case "none":
          mainIcon = "mdi:hand-back-right-outline";
          mainIconColor = "rgba(255, 0, 255, 1)";
          break;
      }
    }

    return html`
      <ha-card .header="${this.config.title || ''}">
        <div class="card-container">
          
          <!-- Ligne 1 : Contrôle principal (Mushroom-like) -->
          <div class="buttons1">
            <div class="mushroom-container">
              <div class="shape" style="background-color: ${shapeColor};">
                <ha-icon .icon="${mainIcon}" style="color: ${mainIconColor};"></ha-icon>
              </div>
              <div class="controls">
                <ha-icon-button @click="${() => this._setTemp(stateObj, -0.5)}">
                  <ha-icon icon="mdi:minus"></ha-icon>
                </ha-icon-button>
                
                <span class="temp-display">
                  ${stateObj.attributes.temperature ? stateObj.attributes.temperature : '--'}°C
                </span>
                
                <ha-icon-button @click="${() => this._setTemp(stateObj, 0.5)}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                </ha-icon-button>
              </div>
            </div>
          </div>

          <!-- Ligne 2 : ON / OFF -->
          <div class="buttons2">
            <button class="btn ${mode === 'heat' ? 'active-heat' : ''}" @click="${() => this._setHvacMode('heat')}">
              <ha-icon icon="mdi:fire" class="${mode === 'heat' ? 'blink' : ''}"></ha-icon>
              <span>on</span>
            </button>
            <button class="btn ${mode === 'off' ? 'active-off' : ''}" @click="${() => this._setHvacMode('off')}">
              <ha-icon icon="mdi:power"></ha-icon>
              <span>off</span>
            </button>
          </div>

          <!-- Ligne 3 : Presets -->
          <div class="buttons3">
            <button class="btn" @click="${() => this._setPreset('comfort')}">
              <ha-icon icon="mdi:sofa" style="color: ${preset === 'comfort' ? 'rgba(255, 165, 0, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>Confort</span>
            </button>
            <button class="btn" @click="${() => this._setPreset('eco')}">
              <ha-icon icon="mdi:leaf" style="color: ${preset === 'eco' ? 'rgba(0, 128, 0, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>Eco</span>
            </button>
            <button class="btn" @click="${() => this._setPreset('frost')}">
              <ha-icon icon="mdi:snowflake-thermometer" style="color: ${preset === 'frost' ? 'rgba(0, 191, 255, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>Hors gel</span>
            </button>
            <button class="btn" @click="${() => this._setPreset('boost')}">
              <ha-icon icon="mdi:rocket-launch" style="color: ${preset === 'boost' ? 'rgba(255, 0, 0, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>Boost</span>
            </button>
            <button class="btn" @click="${() => this._setPreset('none')}">
              <ha-icon icon="mdi:hand-back-right-outline" style="color: ${preset === 'none' ? 'rgba(255, 255, 0, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>Manuel</span>
            </button>
          </div>

        </div>
      </ha-card>
    `;
  }

  _setHvacMode(mode) {
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: mode,
    });
  }

  _setPreset(preset) {
    this.hass.callService("climate", "set_preset_mode", {
      entity_id: this.config.entity,
      preset_mode: preset,
    });
  }

  _setTemp(stateObj, change) {
    const currentTemp = stateObj.attributes.temperature || 20;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this.config.entity,
      temperature: currentTemp + change,
    });
  }

  static get styles() {
    return css`
      .card-container {
        padding: 0 16px 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .mushroom-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255,255,255,0.05);
        padding: 8px;
        border-radius: 12px;
      }
      .shape {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
      }
      .controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .temp-display {
        font-size: 18px;
        font-weight: bold;
      }
      .buttons2 {
        display: flex;
        justify-content: center;
        gap: 15px;
      }
      .buttons2 .btn {
        width: 45%;
      }
      .buttons3 {
        display: flex;
        justify-content: space-between;
        gap: 5px;
      }
      .btn {
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 8px;
        border-radius: 8px;
        color: var(--primary-text-color);
        flex: 1;
      }
      .btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .btn span {
        font-size: 12px;
      }
      .active-heat ha-icon {
        color: rgba(255, 0, 0, 1);
      }
      .active-off ha-icon {
        color: rgba(255, 255, 255, 1);
      }
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0.3; }
        100% { opacity: 1; }
      }
      .blink {
        animation: blink 3s infinite;
      }
    `;
  }
}

customElements.define("thermostat-card", ThermostatCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "thermostat-card",
  name: "Thermostat Personnalisé",
  description: "Carte Thermostat dynamique avec gestion des presets",
});
