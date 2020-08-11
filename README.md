# vuemaps

A Vue.js library for interactive map APIs.

## Mapbox

The Mapbox components require some instance of `mapboxgl`. If you're using the components in a Vue.js application, you can use Mapbox as a plugin (see an example of this in `src/main.js`).

If that's not available to you, you can [include Mapbox GL JS from the CDN](https://docs.mapbox.com/mapbox-gl-js/api/). The components will look first for a Vue prototype `$mapboxgl`. If that is unavailable, they will look for a `window.mapboxgl`.

For Mapbox GL JS to work, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can provide that in the demo app by creating a `.env.local` file in the root of the directory and setting `VUE_APP_MAPBOX_TOKEN` to your token.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

There's a demo application at `src/App.vue` which gives use case examples. To view it:

```
npm run serve
```

### Compiles and minifies for production

The build process targets a [library](https://cli.vuejs.org/guide/build-targets.html#library) and **does not inline Vue.js**.

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
