# Womazing

A static, multi-page storefront frontend built with HTML5, SCSS and vanilla JavaScript.

**Live demo:** [yevhenii-miroshnikov.github.io/Womazing](https://yevhenii-miroshnikov.github.io/Womazing/)

**Repository:** [github.com/yevhenii-miroshnikov/Womazing](https://github.com/yevhenii-miroshnikov/Womazing)

## Project Context

Womazing began as an educational frontend project during a course, based on a ready-made Figma Community design. The multi-page frontend and later refinements were implemented independently.

## Table of Contents

- [Implemented Features](#implemented-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Run Locally](#run-locally)
- [Verification](#verification)
- [Scope and Limitations](#scope-and-limitations)
- [Design and Asset Attribution](#design-and-asset-attribution)
- [Kurzbeschreibung (DE)](#kurzbeschreibung-de)
- [Contact](#contact)

## Implemented Features

- Multi-page navigation across the home, shop, product, cart, checkout, contact and information pages.
- Product category filtering and product option selection.
- Cart item addition, removal and quantity updates; cart state is stored in sessionStorage.
- Light and dark themes; the preference is stored in localStorage.
- Client-side validation and feedback for the contact and checkout forms.
- Responsive navigation, a home-page carousel and a team image gallery.

## Technology Stack

- **HTML5** for the static page structure.
- **SCSS** with BEM-style class naming for styles.
- **Vanilla JavaScript** and browser APIs for page interactions and browser storage.
- **GitHub Pages** for the static live demo.

The HTML pages use the committed stylesheet at **dest/css/styles.css**. The repository does not define an npm-based build step.

## Project Structure

    .
    ├── index.html                  # Home page
    ├── Shop_page.html              # Product catalogue
    ├── item_*.html                 # Product pages
    ├── shopping-cart.html
    ├── ordering_page.html
    ├── Contact_page.html
    ├── About-brand_page.html
    ├── scripts/                    # Vanilla JavaScript interactions
    ├── dest/css/
    │   ├── styles.scss             # SCSS entry point
    │   ├── _*.scss                 # Imported style partials
    │   └── styles.css              # Compiled stylesheet used by the pages
    └── images/

## Run Locally

Clone the repository:

    git clone https://github.com/yevhenii-miroshnikov/Womazing.git
    cd Womazing

Serve the project from a local static HTTP server and open **index.html** through that server. For example, the existing workflow uses the VS Code Live Server extension. The pages use JavaScript modules, so opening them directly with a **file://** URL may prevent module scripts from loading.

The compiled CSS is already included; no package installation or CSS build step is needed to run the site. For SCSS changes, **dest/css/styles.scss** is the entry point. The existing editor workflow uses the VS Code Live Sass Compiler extension and its **Watch Sass** action to update **dest/css/styles.css**.

## Verification

- The deployed Live Demo opened in Chromium and displayed the home page, navigation, content and product links.
- A manual smoke check covered selected Chromium viewports: desktop (1280 × 800), tablet (820 × 1180) and mobile (390 × 844). It covered the home, shop, product, cart, contact and checkout pages; navigation, category filtering, cart updates, theme persistence and empty-form validation were checked. Forms were not submitted with real data.
- This check did not use physical devices or cover every browser.

## Scope and Limitations

This is a static frontend demonstration hosted by GitHub Pages. The contact and checkout forms provide client-side validation and feedback; they are not connected to a backend and do not process messages, orders or payments.

## Design and Asset Attribution

The design reference is [WOMAZING +](https://www.figma.com/community/file/1233626946001279400/womazing) by [Govard (@govard)](https://www.figma.com/@govard), a Figma Community file listed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). I adapted the design and independently implemented the functioning multi-page frontend and its later refinements.

The website photographs were exported from the Figma file. Their individual creators and licensing terms have not been independently verified, so this attribution does not claim separate rights to the photographs or assume they are covered by CC BY 4.0.

The root MIT license remains for my original HTML, SCSS and JavaScript code. It does not establish ownership or separate usage rights for the design or photographs.

## Kurzbeschreibung (DE)

Womazing ist ein Lernprojekt auf Grundlage eines bereitgestellten Figma-Community-Entwurfs. Das mehrseitige Frontend wurde eigenständig umgesetzt und später weiterentwickelt. Die statische Demo umfasst Katalog, Produktseiten und clientseitige Interaktionen; Checkout- und Kontaktformulare sind nicht an ein Backend angebunden.

## Contact

- **GitHub:** [@yevhenii-miroshnikov](https://github.com/yevhenii-miroshnikov)
- **LinkedIn:** [yevhenii-miroshnikov](https://www.linkedin.com/in/yevhenii-miroshnikov)
