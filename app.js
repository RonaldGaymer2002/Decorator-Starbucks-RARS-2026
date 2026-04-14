/* ============================================================
   STARBUCKS BOLIVIA — app.js
   Implementación del Patrón de Diseño DECORATOR
   
   Estructura del Patrón:
   ┌─────────────────────────────────────────────────────────┐
   │ Beverage (Interface / Abstract Component)               │
   │   ├── Espresso        (Concrete Component)              │
   │   ├── Latte           (Concrete Component)              │
   │   ├── Cappuccino      (Concrete Component)              │
   │   ├── Frappuccino     (Concrete Component)              │
   │   └── ...                                               │
   │                                                         │
   │ CondimentDecorator (Abstract Decorator)                 │
   │   ├── MilkDecorator   (Concrete Decorator)              │
   │   ├── SyrupDecorator  (Concrete Decorator)              │
   │   ├── WhipDecorator   (Concrete Decorator)              │
   │   └── ExtraShotDecorator (Concrete Decorator)           │
   └─────────────────────────────────────────────────────────┘
============================================================ */

'use strict';

// ============================================================
// PATRÓN DECORATOR — IMPLEMENTACIÓN JAVASCRIPT
// ============================================================

/**
 * Component Interface (Abstract Base Class emulada en JS)
 * Define el contrato que deben cumplir todos los componentes
 * y decoradores.
 */
class Beverage {
  constructor() {
    if (new.target === Beverage) {
      throw new Error('Beverage es una clase abstracta. No se puede instanciar directamente.');
    }
    this.description = 'Bebida desconocida';
    this.size = 'Grande';
  }

  /**
   * @abstract
   * @returns {string} Descripción de la bebida
   */
  getDescription() {
    return `${this.description} (${this.size})`;
  }

  /**
   * @abstract
   * @returns {number} Costo de la bebida en Bs.
   */
  cost() {
    throw new Error('cost() debe ser implementado por la clase concreta');
  }

  /**
   * @returns {string} Emoji visual del componente
   */
  getEmoji() {
    return '☕';
  }

  /**
   * @returns {object} Color de fondo del vaso en la preview
   */
  getPreviewColor() {
    return { liquid: '#6D4C41', bg: '#D7CCC8' };
  }
}

// ============================================================
// CONCRETE COMPONENTS — Bebidas Base
// ============================================================

class Espresso extends Beverage {
  constructor() {
    super();
    this.description = 'Espresso';
  }
  cost() { return 25; }
  getEmoji() { return '☕'; }
  getPreviewColor() { return { liquid: '#4E2D1E', bg: '#BCAAA4' }; }
}

class Latte extends Beverage {
  constructor() {
    super();
    this.description = 'Caffè Latte';
  }
  cost() { return 32; }
  getEmoji() { return '🥛'; }
  getPreviewColor() { return { liquid: '#A1887F', bg: '#E8D5B7' }; }
}

class Cappuccino extends Beverage {
  constructor() {
    super();
    this.description = 'Cappuccino';
  }
  cost() { return 30; }
  getEmoji() { return '🫖'; }
  getPreviewColor() { return { liquid: '#795548', bg: '#D7CCC8' }; }
}

class Mocha extends Beverage {
  constructor() {
    super();
    this.description = 'Caffè Mocha';
  }
  cost() { return 35; }
  getEmoji() { return '🍫'; }
  getPreviewColor() { return { liquid: '#3E2723', bg: '#D7BFA5' }; }
}

class Frappuccino extends Beverage {
  constructor() {
    super();
    this.description = 'Frappuccino';
  }
  cost() { return 42; }
  getEmoji() { return '🥤'; }
  getPreviewColor() { return { liquid: '#81D4FA', bg: '#E1F5FE' }; }
}

class GreenTea extends Beverage {
  constructor() {
    super();
    this.description = 'Green Tea Latte';
  }
  cost() { return 28; }
  getEmoji() { return '🍵'; }
  getPreviewColor() { return { liquid: '#8BC34A', bg: '#DCEDC8' }; }
}

// ============================================================
// ABSTRACT DECORATOR — Envuelve un Beverage
// ============================================================

/**
 * CondimentDecorator — Decorator Abstracto
 * 
 * Mantiene una referencia al componente que decora (wraps).
 * Delega las llamadas base al componente envuelto, permitiendo
 * que los decoradores concretos extiendan el comportamiento.
 */
class CondimentDecorator extends Beverage {
  constructor(beverage) {
    super();
    if (!beverage || !(beverage instanceof Beverage)) {
      throw new Error('CondimentDecorator requiere una instancia de Beverage válida');
    }
    this.wraps = beverage;  // referencia al componente que envuelve
  }

  getDescription() {
    return this.wraps.getDescription();
  }

  cost() {
    return this.wraps.cost();
  }

  getEmoji() {
    return this.wraps.getEmoji();
  }

  getPreviewColor() {
    return this.wraps.getPreviewColor();
  }
}

// ============================================================
// CONCRETE DECORATORS — Ingredientes / Condimentos
// ============================================================

/**
 * Decorator: Shot Extra de Espresso
 */
class ExtraShotDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Shot Extra`;
  }
  cost() {
    return this.wraps.cost() + 10;
  }
  getEmoji() { return '⚡'; }
  get addonEmoji() { return '⚡'; }
}

/**
 * Decorator: Leche de Almendras
 */
class AlmondMilkDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Leche de Almendras`;
  }
  cost() {
    return this.wraps.cost() + 8;
  }
  get addonEmoji() { return '🌰'; }
}

/**
 * Decorator: Leche de Avena
 */
class OatMilkDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Leche de Avena`;
  }
  cost() {
    return this.wraps.cost() + 7;
  }
  get addonEmoji() { return '🌾'; }
}

/**
 * Decorator: Leche Entera
 */
class WholeMilkDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Leche Entera`;
  }
  cost() {
    return this.wraps.cost() + 5;
  }
  get addonEmoji() { return '🥛'; }
}

/**
 * Decorator: Crema Batida
 */
class WhippedCreamDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Crema Batida`;
  }
  cost() {
    return this.wraps.cost() + 7;
  }
  get addonEmoji() { return '🍦'; }
}

/**
 * Decorator: Syrup de Vainilla
 */
class VanillaSyrupDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Syrup de Vainilla`;
  }
  cost() {
    return this.wraps.cost() + 8;
  }
  get addonEmoji() { return '🍶'; }
}

/**
 * Decorator: Syrup de Caramelo
 */
class CaramelSyrupDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Syrup de Caramelo`;
  }
  cost() {
    return this.wraps.cost() + 8;
  }
  get addonEmoji() { return '🍮'; }
}

/**
 * Decorator: Syrup de Avellana
 */
class HazelnutSyrupDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Syrup de Avellana`;
  }
  cost() {
    return this.wraps.cost() + 8;
  }
  get addonEmoji() { return '🌲'; }
}

/**
 * Decorator: Polvo de Canela
 */
class CinnamonDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Canela`;
  }
  cost() {
    return this.wraps.cost() + 3;
  }
  get addonEmoji() { return '🍂'; }
}

/**
 * Decorator: Polvo de Cacao
 */
class CocoaDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Cacao`;
  }
  cost() {
    return this.wraps.cost() + 5;
  }
  get addonEmoji() { return '🍫'; }
}

/**
 * Decorator: Salsa de Caramelo
 */
class CaramelDrizzleDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Salsa Caramelo`;
  }
  cost() {
    return this.wraps.cost() + 6;
  }
  get addonEmoji() { return '✨'; }
}

/**
 * Decorator: Espuma Extra
 */
class ExtraFoamDecorator extends CondimentDecorator {
  constructor(beverage) {
    super(beverage);
  }
  getDescription() {
    return `${this.wraps.getDescription()}, Espuma Extra`;
  }
  cost() {
    return this.wraps.cost() + 4;
  }
  get addonEmoji() { return '🫧'; }
}

// ============================================================
// CATÁLOGO DE DATOS
// ============================================================

const MENU_ITEMS = [
  /* ---- Calientes ---- */
  {
    id: 'h1', category: 'hot',
    name: 'Espresso Clásico',
    desc: 'Intenso y puro, elaborado con la mezcla Espresso Roast exclusiva de Starbucks.',
    price: 25, emoji: '☕', badge: 'Popular', bgColor: '#3E2723',
    baseClass: 'Espresso'
  },
  {
    id: 'h2', category: 'hot',
    name: 'Caffè Latte',
    desc: 'Suave latte con espresso ristretto y leche vaporizada cremosa.',
    price: 32, emoji: '🫖', badge: null, bgColor: '#5D4037',
    baseClass: 'Latte'
  },
  {
    id: 'h3', category: 'hot',
    name: 'Cappuccino',
    desc: 'Espresso con leche vaporizada y una generosa capa de espuma densa.',
    price: 30, emoji: '🥛', badge: 'Favorito', bgColor: '#4E342E',
    baseClass: 'Cappuccino'
  },
  {
    id: 'h4', category: 'hot',
    name: 'Caffè Mocha',
    desc: 'La clásica combinación de espresso con salsa de chocolate y leche al vapor.',
    price: 35, emoji: '🍫', badge: null, bgColor: '#4A148C',
    baseClass: 'Mocha'
  },
  /* ---- Fríos ---- */
  {
    id: 'c1', category: 'cold',
    name: 'Cold Brew',
    desc: 'Café preparado en frío durante 20 horas. Suave, dulce y con notas de chocolate.',
    price: 38, emoji: '🧊', badge: 'Nuevo', bgColor: '#1565C0',
    baseClass: 'Espresso'
  },
  {
    id: 'c2', category: 'cold',
    name: 'Iced Latte',
    desc: 'Espresso sobre hielo con leche fría. Refrescante y delicioso.',
    price: 34, emoji: '🥤', badge: null, bgColor: '#00695C',
    baseClass: 'Latte'
  },
  {
    id: 'c3', category: 'cold',
    name: 'Green Tea Latte Frío',
    desc: 'Polvo de matcha premium con leche fría sobre hielo.',
    price: 35, emoji: '🍵', badge: 'Saludable', bgColor: '#388E3C',
    baseClass: 'GreenTea'
  },
  /* ---- Frappuccino ---- */
  {
    id: 'f1', category: 'frappuccino',
    name: 'Frappuccino Caramelo',
    desc: 'Frappuccino de café con salsa de caramelo y crema batida.',
    price: 42, emoji: '🥤', badge: 'Bestseller', bgColor: '#F57F17',
    baseClass: 'Frappuccino'
  },
  {
    id: 'f2', category: 'frappuccino',
    name: 'Frappuccino Mocha',
    desc: 'Café con chocolate, blended con hielo y crema batida.',
    price: 44, emoji: '🍦', badge: null, bgColor: '#4E342E',
    baseClass: 'Frappuccino'
  },
  {
    id: 'f3', category: 'frappuccino',
    name: 'Frappuccino Vainilla',
    desc: 'Crema de vainilla blended con hielo, cubierto de crema batida.',
    price: 40, emoji: '🌸', badge: null, bgColor: '#AD1457',
    baseClass: 'Frappuccino'
  },
  /* ---- Alimentos ---- */
  {
    id: 'fd1', category: 'food',
    name: 'Croissant de Mantequilla',
    desc: 'Masa hojaldrada con mantequilla francesa, crujiente por fuera y suave por dentro.',
    price: 18, emoji: '🥐', badge: null, bgColor: '#F9A825'
  },
  {
    id: 'fd2', category: 'food',
    name: 'Muffin de Arándanos',
    desc: 'Muffin esponjoso repleto de arándanos frescos con toque de limón.',
    price: 20, emoji: '🫐', badge: null, bgColor: '#6A1B9A'
  },
  {
    id: 'fd3', category: 'food',
    name: 'Sándwich Caprese',
    desc: 'Tomate fresco, mozzarella y albahaca en pan artesanal con pesto.',
    price: 28, emoji: '🥪', badge: null, bgColor: '#E53935'
  },
  {
    id: 'fd4', category: 'food',
    name: 'Cake Pop de Chocolate',
    desc: 'Bizcocho de chocolate cubierto con glaseado y decorado a mano.',
    price: 15, emoji: '🍭', badge: 'Fan Fav', bgColor: '#880E4F'
  },
];

// Configuraciones de los addons disponibles en el customizador
const ADDON_CONFIG = {
  coffee: [
    { id: 'extra_shot',    name: 'Shot Extra',       price: 10, emoji: '⚡', DecoratorClass: ExtraShotDecorator },
  ],
  milk: [
    { id: 'almond_milk',  name: 'Leche de Almendras', price: 8, emoji: '🌰', DecoratorClass: AlmondMilkDecorator },
    { id: 'oat_milk',     name: 'Leche de Avena',     price: 7, emoji: '🌾', DecoratorClass: OatMilkDecorator   },
    { id: 'whole_milk',   name: 'Leche Entera',        price: 5, emoji: '🥛', DecoratorClass: WholeMilkDecorator },
    { id: 'extra_foam',   name: 'Espuma Extra',        price: 4, emoji: '🫧', DecoratorClass: ExtraFoamDecorator },
  ],
  syrup: [
    { id: 'vanilla',      name: 'Syrup Vainilla',     price: 8, emoji: '🍶', DecoratorClass: VanillaSyrupDecorator   },
    { id: 'caramel',      name: 'Syrup Caramelo',     price: 8, emoji: '🍮', DecoratorClass: CaramelSyrupDecorator  },
    { id: 'hazelnut',     name: 'Syrup Avellana',     price: 8, emoji: '🌲', DecoratorClass: HazelnutSyrupDecorator },
  ],
  topping: [
    { id: 'whip',         name: 'Crema Batida',       price: 7, emoji: '🍦', DecoratorClass: WhippedCreamDecorator  },
    { id: 'cinnamon',     name: 'Canela',              price: 3, emoji: '🍂', DecoratorClass: CinnamonDecorator      },
    { id: 'cocoa',        name: 'Polvo de Cacao',     price: 5, emoji: '🍫', DecoratorClass: CocoaDecorator         },
    { id: 'caramel_drizzle', name: 'Salsa Caramelo',  price: 6, emoji: '✨', DecoratorClass: CaramelDrizzleDecorator },
  ],
};

// BASE map para instanciar
const BASE_CLASSES = { Espresso, Latte, Cappuccino, Mocha, Frappuccino, GreenTea };

// ============================================================
// STATE
// ============================================================
const state = {
  selectedBase: null,     // key de BASES
  selectedAddons: new Set(), // addon IDs activos
  cart: [],
  currentBeverage: null,  // La bebida decorada actual
};

// ============================================================
// DOM HELPERS
// ============================================================
const $ = (id) => document.getElementById(id);
const create = (tag, cls) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  return el;
};

// ============================================================
// LÓGICA DECORATOR — Construir bebida decorada
// ============================================================

const BASES = {
  espresso:    { label: 'Espresso',          desc: 'Intenso y puro',                    price: 25, emoji: '☕', Class: Espresso    },
  latte:       { label: 'Caffè Latte',       desc: 'Suave con leche vaporizada',        price: 32, emoji: '🫖', Class: Latte      },
  cappuccino:  { label: 'Cappuccino',        desc: 'Con espuma densa',                  price: 30, emoji: '🥛', Class: Cappuccino  },
  mocha:       { label: 'Caffè Mocha',       desc: 'Con salsa de chocolate',            price: 35, emoji: '🍫', Class: Mocha      },
  frappuccino: { label: 'Frappuccino',       desc: 'Blended con hielo',                 price: 42, emoji: '🥤', Class: Frappuccino },
  greentea:    { label: 'Green Tea Latte',   desc: 'Matcha premium con leche',          price: 28, emoji: '🍵', Class: GreenTea    },
};

/**
 * Builds a decorated Beverage instance using the Decorator pattern.
 * Starting from the base, wraps it with each active addon decorator.
 * 
 * @returns {Beverage|null} La cadena de decorators completa
 */
function buildDecoratedBeverage() {
  if (!state.selectedBase) return null;

  const baseConfig = BASES[state.selectedBase];
  let beverage = new baseConfig.Class(); // Concrete Component

  // Apply each active decorator, wrapping the previous beverage
  state.selectedAddons.forEach(addonId => {
    const allAddons = [
      ...ADDON_CONFIG.coffee,
      ...ADDON_CONFIG.milk,
      ...ADDON_CONFIG.syrup,
      ...ADDON_CONFIG.topping,
    ];
    const addonCfg = allAddons.find(a => a.id === addonId);
    if (addonCfg) {
      beverage = new addonCfg.DecoratorClass(beverage); // DECORATOR wraps beverage
    }
  });

  return beverage;
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderBaseOptions() {
  const container = $('baseOptions');
  if (!container) return;
  container.innerHTML = '';

  Object.entries(BASES).forEach(([key, base]) => {
    const option = create('div', 'base-option');
    option.dataset.key = key;
    option.id = `base-${key}`;
    option.innerHTML = `
      <span class="base-emoji">${base.emoji}</span>
      <div class="base-option-info">
        <div class="base-option-name">${base.label}</div>
        <div class="base-option-desc">${base.desc}</div>
      </div>
      <span class="base-option-price">Bs. ${base.price}</span>
    `;
    option.addEventListener('click', () => selectBase(key));
    container.appendChild(option);
  });
}

function renderAddonList(categoryId, addons) {
  const container = $(categoryId);
  if (!container) return;
  container.innerHTML = '';

  addons.forEach(addon => {
    const item = create('div', 'addon-item');
    item.dataset.id = addon.id;
    item.id = `addon-${addon.id}`;
    item.innerHTML = `
      <div class="addon-item-left">
        <span class="addon-emoji">${addon.emoji}</span>
        <span class="addon-name">${addon.name}</span>
      </div>
      <div class="addon-right">
        <span class="addon-price">+Bs. ${addon.price}</span>
        <div class="addon-toggle">✓</div>
      </div>
    `;
    item.addEventListener('click', () => toggleAddon(addon.id));
    container.appendChild(item);
  });
}

function renderMenuGrid(filter = 'all') {
  const grid = $('menuGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = filter === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === filter);

  items.forEach((item, idx) => {
    const card = create('div', 'menu-card');
    card.id = `menu-card-${item.id}`;
    card.style.animationDelay = `${idx * 0.07}s`;
    card.style.opacity = '0';
    card.innerHTML = `
      <div class="menu-card-img" style="background: linear-gradient(135deg, ${item.bgColor}22, ${item.bgColor}44)">
        <span style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2))">${item.emoji}</span>
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <span class="menu-card-price">Bs. ${item.price}</span>
          <button class="menu-card-add" id="add-${item.id}" aria-label="Agregar ${item.name}" 
                  data-item-id="${item.id}">+</button>
        </div>
      </div>
    `;
    card.querySelector('.menu-card-add').addEventListener('click', (e) => {
      e.stopPropagation();
      addMenuItemToCart(item);
    });
    grid.appendChild(card);
  });
}

/**
 * Renders the decorator chain receipt panel.
 * Shows how the Decorator pattern wraps the base drink with condiments.
 */
function renderDecoratorReceipt() {
  const chain = $('receiptChain');
  const priceEl = $('totalPrice');
  const badgesEl = $('previewBadges');

  if (!chain || !priceEl) return;

  const beverage = buildDecoratedBeverage();
  state.currentBeverage = beverage;

  if (!beverage) {
    chain.innerHTML = '<div class="chain-empty">Elige una bebida base para comenzar</div>';
    priceEl.textContent = 'Bs. 0.00';
    updateCupPreview(null);
    return;
  }

  chain.innerHTML = '';

  // Base item
  const baseConfig = BASES[state.selectedBase];
  const baseItem = create('div', 'chain-item base-item');
  baseItem.innerHTML = `<span>${baseConfig.emoji}</span><span>new ${baseConfig.Class.name}()</span>`;
  chain.appendChild(baseItem);

  // Addon decorators chain
  const allAddons = [
    ...ADDON_CONFIG.coffee,
    ...ADDON_CONFIG.milk,
    ...ADDON_CONFIG.syrup,
    ...ADDON_CONFIG.topping,
  ];

  const badges = [];
  state.selectedAddons.forEach(addonId => {
    const addonCfg = allAddons.find(a => a.id === addonId);
    if (addonCfg) {
      const arrow = create('div', 'chain-item');
      arrow.innerHTML = `<span class="chain-arrow">↳</span><span>${addonCfg.emoji} new ${addonCfg.DecoratorClass.name}()</span>`;
      chain.appendChild(arrow);
      badges.push(addonCfg.emoji);
    }
  });

  priceEl.textContent = `Bs. ${beverage.cost().toFixed(2)}`;

  // Preview badges
  if (badgesEl) {
    badgesEl.innerHTML = badges.slice(-4).map(b =>
      `<span class="preview-badge">${b}</span>`
    ).join('');
  }

  updateCupPreview(baseConfig);
}

function updateCupPreview(baseConfig) {
  const liquid = $('previewLiquid');
  const body   = $('previewBody');
  const foam   = $('previewFoam');
  const lid    = $('previewLid');
  if (!liquid || !body) return;

  if (!baseConfig) {
    body.style.background = '#c8e6c9';
    liquid.style.background = 'rgba(101,67,33,0.3)';
    foam.style.display = 'none';
    return;
  }

  const colors = BASES[state.selectedBase]?.Class ? new (BASES[state.selectedBase].Class)().getPreviewColor() : { liquid: '#4E2D1E', bg: '#BCAAA4' };
  body.style.background = colors.bg;
  liquid.style.background = colors.liquid;
  lid.style.background = 'linear-gradient(180deg, #2e6b52, #1e4d3a)';

  const hasFoam = state.selectedAddons.has('extra_foam') || state.selectedAddons.has('whip');
  foam.style.display = hasFoam ? 'block' : 'none';
}

// ============================================================
// INTERACTIONS
// ============================================================

function selectBase(key) {
  state.selectedBase = key;

  document.querySelectorAll('.base-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.key === key);
  });

  renderDecoratorReceipt();
}

function toggleAddon(addonId) {
  const el = document.getElementById(`addon-${addonId}`);
  if (state.selectedAddons.has(addonId)) {
    state.selectedAddons.delete(addonId);
    el?.classList.remove('selected');
  } else {
    state.selectedAddons.add(addonId);
    el?.classList.add('selected');
  }
  renderDecoratorReceipt();
}

function addMenuItemToCart(item) {
  const cartItem = {
    id: `cart-${Date.now()}-${item.id}`,
    name: item.name,
    desc: item.category === 'food' ? 'Alimento' : 'Bebida estándar',
    price: item.price,
    emoji: item.emoji,
  };
  state.cart.push(cartItem);
  updateCartUI();
  showToast(`✅ ${item.name} agregado al carrito!`);
}

function addCustomDrinkToCart() {
  const beverage = state.currentBeverage;
  if (!beverage) {
    showToast('⚠️ Selecciona primero una bebida base');
    return;
  }

  const baseConfig = BASES[state.selectedBase];
  const cartItem = {
    id: `cart-custom-${Date.now()}`,
    name: baseConfig.label,
    desc: beverage.getDescription().replace(` (${beverage.size})`, ''),
    price: beverage.cost(),
    emoji: baseConfig.emoji,
    custom: true,
  };
  state.cart.push(cartItem);
  updateCartUI();
  showToast(`✅ ¡${baseConfig.label} personalizado agregado!`);
}

function removeFromCart(itemId) {
  state.cart = state.cart.filter(i => i.id !== itemId);
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const count = state.cart.length;
  const countEl = $('cartCount');
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('visible', count > 0);
  }
  const footer = $('cartFooter');
  const subtotal = $('cartSubtotal');
  if (footer && subtotal) {
    const total = state.cart.reduce((sum, i) => sum + i.price, 0);
    subtotal.textContent = `Bs. ${total.toFixed(2)}`;
    footer.style.display = count > 0 ? 'block' : 'none';
  }
  renderCartItems();
}

function renderCartItems() {
  const cartItems = $('cartItems');
  if (!cartItems) return;

  if (state.cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>☕</span>
        <p>Tu carrito está vacío</p>
        <a href="#personalizar" class="btn btn-primary small">Personaliza una bebida</a>
      </div>`;
    return;
  }

  cartItems.innerHTML = '';
  state.cart.forEach(item => {
    const el = create('div', 'cart-item');
    el.id = `cart-item-${item.id}`;
    el.innerHTML = `
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}${item.custom ? ' <span style="color:var(--gold);font-size:.7rem">★ CUSTOM</span>' : ''}</div>
        <div class="cart-item-desc">${item.desc}</div>
        <div class="cart-item-price">Bs. ${item.price.toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar">✕</button>
    `;
    el.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(item.id));
    cartItems.appendChild(el);
  });
}

// ============================================================
// CART DRAWER
// ============================================================

function openCart() {
  $('cartModal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('cartModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// TOAST
// ============================================================
let toastTimer = null;
function showToast(msg) {
  const toast = $('toast');
  if (!toast) return;
  if (toastTimer) clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================
// NAVBAR SCROLL + HAMBURGER
// ============================================================
function initNavbar() {
  const navbar = $('navbar');
  const hamburger = $('hamburger');
  const navLinks = $('navLinks');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNavLink();
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('open'));
  });
}

function updateActiveNavLink() {
  const sections = ['inicio', 'menu', 'personalizar', 'nosotros', 'ubicacion'];
  const scrollY = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const start = section.offsetTop;
    const end = start + section.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= start && scrollY < end);
  });
}

// ============================================================
// PARTICLES
// ============================================================
function initParticles() {
  const container = $('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = create('div', 'particle');
    p.style.setProperty('--x', `${Math.random() * 100}%`);
    p.style.setProperty('--y', `${Math.random() * 100}%`);
    p.style.setProperty('--dur', `${6 + Math.random() * 8}s`);
    p.style.setProperty('--delay', `${Math.random() * 6}s`);
    p.style.width = `${2 + Math.random() * 4}px`;
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

// ============================================================
// MENU FILTERS
// ============================================================
function initMenuFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenuGrid(btn.dataset.filter);
    });
  });
}

// ============================================================
// INTERSECTION OBSERVER (lazy reveal)
// ============================================================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-img-card, .info-card, .seasonal-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================================
// CHECKOUT SIMULATION
// ============================================================
function initCheckout() {
  $('checkoutBtn')?.addEventListener('click', () => {
    if (state.cart.length === 0) return;
    const total = state.cart.reduce((sum, i) => sum + i.price, 0);
    closeCart();
    showToast(`🎉 ¡Pedido de Bs. ${total.toFixed(2)} procesado! Gracias.`);
    state.cart = [];
    updateCartUI();
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Init sections
  initParticles();
  initNavbar();
  renderMenuGrid();
  initMenuFilters();
  renderBaseOptions();
  renderAddonList('coffeeAddons',  ADDON_CONFIG.coffee);
  renderAddonList('milkAddons',    ADDON_CONFIG.milk);
  renderAddonList('syrupAddons',   ADDON_CONFIG.syrup);
  renderAddonList('toppingAddons', ADDON_CONFIG.topping);
  renderDecoratorReceipt();
  initReveal();
  initCheckout();

  // Cart events
  $('cartBtn')?.addEventListener('click', openCart);
  $('cartClose')?.addEventListener('click', closeCart);
  $('cartOverlay')?.addEventListener('click', closeCart);

  // Add to cart from customizer
  $('addToCartBtn')?.addEventListener('click', addCustomDrinkToCart);

  // Console demo of the Decorator pattern
  console.groupCollapsed('🎨 Starbucks — Demostración del Patrón Decorator');
  let demo = new Espresso();
  console.log(`Base: ${demo.getDescription()} → Bs. ${demo.cost()}`);
  demo = new AlmondMilkDecorator(demo);
  console.log(`+ Leche de Almendras: ${demo.getDescription()} → Bs. ${demo.cost()}`);
  demo = new VanillaSyrupDecorator(demo);
  console.log(`+ Syrup Vainilla: ${demo.getDescription()} → Bs. ${demo.cost()}`);
  demo = new WhippedCreamDecorator(demo);
  console.log(`= FINAL: ${demo.getDescription()} → Bs. ${demo.cost()}`);
  console.groupEnd();
});
