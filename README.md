# ☕ Starbucks Bolivia — Patrón de Diseño Decorator

> Página web funcional inspirada en [sbuxbolivia.com](https://www.sbuxbolivia.com/) que implementa el **Patrón de Diseño Decorator** para la personalización dinámica de bebidas.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Demo](#-demo)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Patrón de Diseño: Decorator](#-patrón-de-diseño-decorator)
  - [¿Qué es el Patrón Decorator?](#qué-es-el-patrón-decorator)
  - [Diagrama UML](#diagrama-uml)
  - [Implementación en el Código](#implementación-en-el-código)
  - [Ejemplo de Uso](#ejemplo-de-uso)
- [Funcionalidades](#-funcionalidades)
- [Cómo Ejecutar](#-cómo-ejecutar)
- [Autor](#-autor)

---

## 📖 Descripción

Este proyecto es una **página web funcional** que replica la experiencia de Starbucks Bolivia, construida con HTML, CSS y JavaScript puro (Vanilla JS). El objetivo principal es demostrar la aplicación del **Patrón de Diseño Decorator** (uno de los patrones estructurales del catálogo GoF) en un contexto real e interactivo: la personalización de bebidas de café.

El usuario puede:
1. Explorar el **menú completo** de bebidas y alimentos.
2. **Personalizar su bebida** eligiendo una base y añadiendo ingredientes dinámicamente.
3. Ver en tiempo real **cómo el patrón Decorator encadena** los componentes.
4. **Agregar al carrito** y simular un pedido.

---

## 🚀 Demo

Simplemente abre el archivo principal en tu navegador:

```
index.html
```

No requiere instalación, servidor ni dependencias externas. Solo un navegador moderno.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica completa |
| **CSS3** | Animaciones, variables, grid/flexbox, glassmorphism |
| **JavaScript ES6+** | Patrón Decorator, clases, módulos, DOM API |
| **Google Fonts** | Lato + Playfair Display |

Sin frameworks, sin librerías externas, sin build tools. ✅

---

## 📁 Estructura del Proyecto

```
Decorator/
│
├── index.html        # Estructura y marcado HTML
├── style.css         # Estilos, animaciones y diseño responsive
├── app.js            # Lógica JS + implementación del Patrón Decorator
└── README.md         # Documentación del proyecto
```

---

## 🎨 Patrón de Diseño: Decorator

### ¿Qué es el Patrón Decorator?

El **Patrón Decorator** es un patrón de diseño estructural que permite **añadir comportamiento o responsabilidades a un objeto de manera dinámica**, sin modificar su clase original y sin usar herencia directa.

> "Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality."
> — *Gang of Four (GoF)*

**Problema que resuelve:** Si tuviéramos que modelar todas las combinaciones posibles de bebidas con ingredientes usando solo herencia, necesitaríamos cientos de subclases (`EspressoConLeche`, `EspressoConLecheYVainilla`, etc.). El Decorator elimina esa explosión combinatoria.

---

### Diagrama UML

```
┌─────────────────────────────────────┐
│         <<Abstract>>                │
│           Beverage                  │
│─────────────────────────────────────│
│ + description: string               │
│ + getDescription(): string          │
│ + cost(): number          ◄─────────┼────────────────────────┐
│ + getEmoji(): string                │                        │
└─────────────────────────────────────┘                        │
          ▲                     ▲                              │
          │ extends              │ extends                     │ wraps
          │                     │                              │
┌─────────────────┐   ┌──────────────────────────────┐        │
│    Espresso     │   │  <<Abstract>>                │        │
│─────────────────│   │  CondimentDecorator          │        │
│ cost(): 25      │   │──────────────────────────────│        │
└─────────────────┘   │ - wraps: Beverage  ──────────┼────────┘
┌─────────────────┐   │ + getDescription(): string   │
│     Latte       │   │ + cost(): number              │
│─────────────────│   └──────────────────────────────┘
│ cost(): 32      │             ▲
└─────────────────┘             │ extends
┌─────────────────┐             │
│   Cappuccino    │   ┌─────────┴──────────────────────────────────────┐
│─────────────────│   │  Concrete Decorators                           │
│ cost(): 30      │   │                                                │
└─────────────────┘   │  ExtraShotDecorator      → cost() + 10        │
┌─────────────────┐   │  AlmondMilkDecorator     → cost() +  8        │
│     Mocha       │   │  OatMilkDecorator        → cost() +  7        │
│─────────────────│   │  WholeMilkDecorator      → cost() +  5        │
│ cost(): 35      │   │  WhippedCreamDecorator   → cost() +  7        │
└─────────────────┘   │  VanillaSyrupDecorator   → cost() +  8        │
┌─────────────────┐   │  CaramelSyrupDecorator   → cost() +  8        │
│  Frappuccino    │   │  HazelnutSyrupDecorator  → cost() +  8        │
│─────────────────│   │  CinnamonDecorator       → cost() +  3        │
│ cost(): 42      │   │  CocoaDecorator          → cost() +  5        │
└─────────────────┘   │  CaramelDrizzleDecorator → cost() +  6        │
                      │  ExtraFoamDecorator      → cost() +  4        │
                      └────────────────────────────────────────────────┘
```

---

### Implementación en el Código

#### 1. Componente Abstracto — `Beverage`

```javascript
class Beverage {
  constructor() {
    if (new.target === Beverage) {
      throw new Error('Beverage es una clase abstracta.');
    }
    this.description = 'Bebida desconocida';
  }

  getDescription() { return this.description; }
  cost() { throw new Error('Debe ser implementado'); }
}
```

#### 2. Componentes Concretos — Bebidas Base

```javascript
class Espresso extends Beverage {
  constructor() {
    super();
    this.description = 'Espresso';
  }
  cost() { return 25; }  // Bs. 25
}

class Latte extends Beverage {
  constructor() {
    super();
    this.description = 'Caffè Latte';
  }
  cost() { return 32; }  // Bs. 32
}
// ... Cappuccino, Mocha, Frappuccino, GreenTea
```

#### 3. Decorador Abstracto — `CondimentDecorator`

```javascript
class CondimentDecorator extends Beverage {
  constructor(beverage) {
    super();
    this.wraps = beverage;  // ← Mantiene referencia al objeto envuelto
  }

  getDescription() { return this.wraps.getDescription(); }
  cost()           { return this.wraps.cost(); }
}
```

#### 4. Decoradores Concretos — Ingredientes

```javascript
class WhippedCreamDecorator extends CondimentDecorator {
  getDescription() {
    return `${this.wraps.getDescription()}, Crema Batida`;
  }
  cost() {
    return this.wraps.cost() + 7;  // Delega + añade su propio costo
  }
}

class VanillaSyrupDecorator extends CondimentDecorator {
  getDescription() {
    return `${this.wraps.getDescription()}, Syrup de Vainilla`;
  }
  cost() {
    return this.wraps.cost() + 8;
  }
}
// ... y 10 decoradores más
```

---

### Ejemplo de Uso

```javascript
// 1. Crear la bebida base (Concrete Component)
let miCafe = new Espresso();
console.log(miCafe.getDescription());  // "Espresso (Grande)"
console.log(miCafe.cost());            // 25

// 2. Decorar con Leche de Almendras
miCafe = new AlmondMilkDecorator(miCafe);
console.log(miCafe.getDescription());  // "Espresso (Grande), Leche de Almendras"
console.log(miCafe.cost());            // 33

// 3. Decorar con Syrup de Vainilla
miCafe = new VanillaSyrupDecorator(miCafe);
console.log(miCafe.getDescription());  // "Espresso (Grande), Leche de Almendras, Syrup de Vainilla"
console.log(miCafe.cost());            // 41

// 4. Decorar con Crema Batida
miCafe = new WhippedCreamDecorator(miCafe);
console.log(miCafe.getDescription());  // "..., Crema Batida"
console.log(miCafe.cost());            // 48
```

Cada decorador **envuelve** al anterior, formando una cadena. Al llamar a `cost()`, cada decorator llama a `this.wraps.cost()` y suma su propio precio — un ejemplo claro de **delegación**.

---

## ✨ Funcionalidades

### Página Web

| Sección | Descripción |
|---|---|
| 🏠 **Hero** | Animación de taza con vapor en CSS puro, partículas flotantes |
| 🍃 **Banner Estacional** | Highlights de la temporada y programa de rewards |
| ☕ **Menú** | 13 productos con filtros por categoría (Hot, Frío, Frappuccino, Food) |
| 🎨 **Personalizador** | Interfaz interactiva del Patrón Decorator en tiempo real |
| 📊 **Diagrama UML** | Visualización del patrón directamente en la página |
| 🌿 **Nosotros** | Historia de Starbucks con estadísticas |
| 📍 **Ubicación** | Av. La Salle, Santa Cruz de la Sierra, Bolivia |
| 🛒 **Carrito** | Drawer deslizante con gestión de pedidos |
| 🍞 **Toast** | Notificaciones de acción del usuario |

### Patrón Decorator en UI

- Selecciona una **bebida base** (6 opciones)
- Agrega **ingredientes** de 4 categorías (11 decoradores disponibles)
- El panel derecho muestra la **cadena de decoradores en tiempo real**
- El precio se calcula **dinámicamente** sumando cada decorator
- La **taza preview** cambia de color según la bebida
- Se puede agregar el pedido personalizado al **carrito**

---

## ▶️ Cómo Ejecutar

1. **Clona o descarga** el repositorio
2. **Abre** `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge)
3. ¡Listo! No requiere instalación ni servidor

```bash
# Opción alternativa: servidor local simple con Python
python -m http.server 8000
# Luego abre: http://localhost:8000
```

```bash
# O con Node.js (npx)
npx serve .
```

> 💡 **Abre la consola del navegador (F12)** para ver la demostración en log del patrón Decorator ejecutándose automáticamente al cargar la página.

---

## 👤 Autor

Desarrollado como proyecto académico para demostrar el **Patrón de Diseño Decorator** del catálogo GoF usando una aplicación web real y atractiva.

**Referencia:** [Starbucks Bolivia](https://www.sbuxbolivia.com/) — Av. La Salle, Santa Cruz de la Sierra, Bolivia 🇧🇴

---

> *"El Patrón Decorator nos permite añadir responsabilidades a los objetos de forma flexible, sin comprometer el principio Open/Closed: las clases deben estar abiertas a extensión pero cerradas a modificación."*
