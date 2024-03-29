# Introduction

> Minze is a dead-simple JS framework for native web components.

## Overview

Minze (German shorthand for "Peppermint", pronounced [`/ˈmɪnt͡sə/`](https://upload.wikimedia.org/wikipedia/commons/c/c2/De-Minze.ogg)) lets you rapidly build native web components.

It is not a framework for building complex user interfaces or single-page apps, like React, Vue or Angular. Instead, you can use Minze to create `encapsulated`, `reusable`, `maintainable`, `cross-framework` native web components.

Minze was made to be accessible to everyone, and to be easy to use. It removes a lot of complexity from the creation of custom web components.

Possible use cases:

- **Design Systems**: Create cross-framework design system libraries and share them with your team or the world. Define once, use everywhere.

- **Light Alternative**: If you don't want to use a common framework, but still want to create some components with JavaScript functionality for your site, you can use Minze.

- **Browser Native Extending**: You can add Minze to any web project and create components without using any build tools to extend its functionality.

## Features

- 👶 Simple - Dive right in by [scaffolding a project](/guide/installation#cli), installing from [npm](/guide/installation#npm) or using [CDN link](/guide/installation#cdn).
- ⚡ Fast - Tiny footprint ~3KB (minified and compressed).
- 🚀 Modern - Based on the latest technologies around web components.
- 📦 Shareable - Build component libraries or design systems. Define once, use everywhere.
- 🎲 Framework Agnostic - Use Minze with any common framework - React, Vue, Svelte, etc ...
- 📕 Storybook - Minze x Storybook dev environment integration.
- 📖 Extensive Docs - Comprehensive documentation and API reference.
- 🔒 Typed API - Scale your component library with ease by using TypeScript.

## Architecture

Minze consists of two main classes:

- **Minze** - A class with multiple static methods for common tasks, like defining several components at once.
- **MinzeElement** - Base class for custom web components. It adds an abstraction layer around the web components API and several additional features like reactivity.

There's also a [CLI tool](/guide/installation#cli) that can be used to create a development environment for Minze components. Out of the box, it runs with vanilla [Vite](https://vitejs.dev/) or [Storybook](https://storybook.js.org) and optionally `TypeScript`.

::: tip
Minze and MinzeElement are based on JavaScript classes, if you need a basic refresher on JavaScript classes check the ["Using classes" mdn guide](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_classes) or the [Classes API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes).
:::

## Browser Support

By default, Minze is transpiled to `ES2020`. Minze should be compatible with all [browsers supporting ES2020](https://caniuse.com/?search=es2020) and [Custom Elements](https://caniuse.com/?search=Custom%20Elements).
