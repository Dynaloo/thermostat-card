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

    // Détermination de l'icône principale (Tracés SVG natifs MDI)
    let mainIconPath = "M12,2A3,3 0 0,0 9,5V12A6,6 0 0,0 7,17A5,5 0 0,0 12,22A5,5 0 0,0 17,17A6,6 0 0,0 15,12V5A3,3 0 0,0 12,2M12,4A1,1 0 0,1 13,5V7H11V5A1,1 0 0,1 12,4M13,10V12H11V10H13M12,20A3,3 0 0,1 9,17C9,15.76 9.77,14.69 11,14.25V13H13V14.25C14.23,14.69 15,15.76 15,17A3,3 0 0,1 12,20Z"; 
    let mainIconColor = "rgba(255, 255, 0, 1)";
    let shapeColor = "rgba(0, 0, 0, 1)";

    if (mode === "off") {
      mainIconPath = "M12,21A9,9 0 0,1 3,12A9,9 0 0,1 12,3A9,9 0 0,1 21,12A9,9 0 0,1 12,21M12,1A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,1M11,6V13H13V6H11Z";
      mainIconColor = "rgba(255, 255, 255, 1)";
      shapeColor = "rgba(128, 128, 128, 1)";
    } else if (mode === "heat") {
      switch (preset) {
        case "comfort":
          mainIconPath = "M19,10H5V13H19V10M19,15H5V18H19V15M12,2A5,5 0 0,0 7,7V8H17V7A5,5 0 0,0 12,2Z"; // Simplifié/Sofa alternatif pour compatibilité
          mainIconColor = "rgba(255, 165, 0, 1)";
          break;
        case "eco":
          mainIconPath = "M17,8C8,10 5.9,16.17 5.18,18C6.9,17.16 11,15.35 14,13.05C11.5,13.18 8.86,13.96 7,15C7.86,13.1 11,10.6 16,9.5C15.04,11.31 13,14 9,15.5C13,14.5 16,11 18,6C17.65,6.65 17.3,7.34 17,8Z";
          mainIconColor = "rgba(0, 128, 0, 1)";
          break;
        case "frost":
          mainIconPath = "M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM11 7H13V13H11ZM11 15H13V17H11Z"; // Variante simple lisible
          mainIconColor = "rgba(0, 191, 255, 1)";
          break;
        case "boost":
          mainIconPath = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,6H13V10H17V12H13V16H11V12H7V10H11V6Z";
          mainIconColor = "rgba(255, 0, 0, 1)";
          break;
        case "none":
          mainIconPath = "M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2ZM12,17.5A1.5,1.5 0 1,1 13.5,16A1.5,1.5 0 0,1 12,17.5ZM13.5,13H10.5V6.5H13.5Z";
          mainIconColor = "rgba(255, 0, 255, 1)";
          break;
      }
    }

    return html`
      <ha-card .header="${this.config.title || ''}">
        <div class="card-container">
          
          <!-- Ligne 1 : Contrôle principal avec SVG NATIFS -->
          <div class="buttons1">
            <div class="mushroom-container">
              <div class="shape" style="background-color: ${shapeColor};">
                <svg class="svg-main" viewBox="0 0 24 24" style="fill: ${mainIconColor};">
                  <path d="${mainIconPath}"/>
                </svg>
              </div>
              <div class="controls">
                <button class="btn-inc-dec" @click="${() => this._setTemp(stateObj, -0.5)}">
                  <svg class="svg-btn" viewBox="0 0 24 24">
                    <path d="M19,13H5V11H19V13Z" />
                  </svg>
                </button>
                <span class="temp-display">
                  ${stateObj.attributes.temperature ? stateObj.attributes.temperature : '--'}°C
                </span>
                <button class="btn-inc-dec" @click="${() => this._setTemp(stateObj, 0.5)}">
                  <svg class="svg-btn" viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Ligne 2 : ON / OFF -->
          <div class="buttons2">
            <button class="btn ${mode === 'heat' ? 'active-heat' : ''}" @click="${() => this._setHvacMode('heat')}">
              <ha-icon icon="mdi:fire" class="${mode === 'heat' ? 'blink' : ''}" style="color: ${mode === 'heat' ? 'rgba(255, 0, 0, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>ON</span>
            </button>
            <button class="btn ${mode === 'off' ? 'active-off' : ''}" @click="${() => this._setHvacMode('off')}">
              <ha-icon icon="mdi:power" style="color: ${mode === 'off' ? 'rgba(255, 255, 255, 1)' : 'rgba(128, 128, 128, 1)'}"></ha-icon>
              <span>OFF</span>
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
        padding: 10px;
        border-radius: 14px;
      }
      .shape {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
      }
      /* TAILLE ICÔNE PRINCIPALE DE GAUCHE : Réglage direct en pixels */
      .svg-main {
        width: 24px;
        height: 24px;
      }
      .controls {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .btn-inc-dec {
        background: rgba(255, 255, 255, 0.08);
        border: none;
        border-radius: 50%;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--primary-text-color);
        transition: background 0.2s, transform 0.1s;
        padding: 0;
      }
      .btn-inc-dec:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      .btn-inc-dec:active {
        transform: scale(0.92);
      }
      /* TAILLE DES BOUTONS PLUS / MOINS : Réglage direct en pixels */
      .svg-btn {
        width: 18px;
        height: 18px;
        fill: var(--primary-text-color);
      }
      .temp-display {
        font-size: 22px;
        font-weight: bold;
        min-width: 70px;
        text-align: center;
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
        gap: 8px;
        padding: 10px 6px;
        border-radius: 8px;
        color: var(--primary-text-color);
        flex: 1;
      }
      .btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .btn ha-icon {
        transform: scale(1.25);
        margin-bottom: 4px;
      }
      .btn span {
        font-size: 14px;
        font-weight: 500;
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
