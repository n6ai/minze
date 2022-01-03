# Introduction

> Minze is a dead-simple framework for sharable web components.

## Overview

Minze (German shorthand for "Peppermint", pronounced `/ˈmɪnt͡sə/`) lets you rapidly build native web components.

It is not a framework for building complex user interfaces or single-page apps, like React, Vue or Angular. Instead, you can use Minze to create `encapsulated`, `reusable`, `maintainable`, `cross-framework` native web components.

Minze was made to be accessible to everyone, and to be easy to use. It removes a lot of complexity from the creation of custom web components.

Possible use cases:

- **Design Systems**: Create cross-framework design system libraries and share them with your team or the world. Define once, use everywhere.

- **Light Alternative**: If you don't want to use a common framework, but still want to create some components with JavaScript functionality for your site, you can use Minze.

- **Browser Native Extending**: You can add Minze to any web project and create components without using any build tools to extend its functionality.

## Features

- 👶 Simple - Dive right in by [scaffolding a project](/guide/installation#cli) or using a [CDN link](/guide/installation#cdn).
- ⚡ Fast - Tiny footprint ~1KB (minified and compressed).
- 🚀 Modern - Based on the latest technologies around web components.
- 📦 Sharable - Build component libraries or design systems. Define once, use everywhere.
- 🎲 Framework Agnostic - Use Minze with any common framework - React, Vue, Angular ...
- 🔒 Typed API - Scale your component library with ease by using TypeScript.

## Architecture

Minze consists of two main classes:

- **Minze** - A class with multiple static methods and properties for common tasks, like defining several components at once.
- **MinzeElement** - A class that can be used to extend from to create custom web components. It adds an abstraction layer around the web components API and adds several additional features like reactivity.

There's also a [CLI tool](/guide/installation.html#cli) that can be used to create a development and publishing environment for Minze components. Out of the box, it comes with [rollup](https://rollupjs.org/) and [vite](https://vitejs.dev/) and optionally `TypeScript`.

## Browser Support

By default, Minze is transpiled to `ES6`. Minze should be compatible with all [browsers supporting ES6](https://caniuse.com/?search=es6) and [Custom Elements](https://caniuse.com/?search=Custom%20Elements).
