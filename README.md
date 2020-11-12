# vue3-clipboard

A simple vuejs 3 binding for clipboard.js, based on [Inndy/vue-clipboard2](https://github.com/Inndy/vue-clipboard2)

## Install

`npm install --save vue3-clipboard` or use `dist/vue3-clipboard.min.js` without npm

## Usage

For vue-cli user:

```javascript
import { createApp } from 'vue'
import VueClipboard from 'vue3-clipboard'

const app = createApp({})

app.use(VueClipboard)
```

For standalone usage:

```html
<script src="vue.min.js"></script>
<!-- must place this line after vue.js -->
<script src="dist/vue3-clipboard.min.js"></script>
```

## I want to copy texts without a specific button!

Yes, you can do it by using our new method: `this.$copyText`,
where we replace the clipboard directives with a v-on directive.

Modern browsers have some limitations like that you can't use `window.open` without a user interaction.
So there's the same restriction on copying things! Test it before you use it. Make sure you are not
using this method inside any async method.

Before using this feature, read:
[this issue](https://github.com/zenorocha/clipboard.js/issues/218) and
[this page](https://github.com/zenorocha/clipboard.js/wiki/Known-Limitations) first.

## It doesn't work with bootstrap modals

See [clipboardjs](https://clipboardjs.com/#advanced-usage) document and [this pull request](https://github.com/Inndy/vue-clipboard2/pull/23), `container` option is available like this:

In Options API:

```js
const container = this.$refs.container
this.$copyText((text: 'Text to copy'), container)
```

In Composition API:

```js
import { copyText } from 'vue3-clipboard'
import { ref } from 'vue'

const container = ref(null)
copyText('Text to copy', container.value)
```

Or you can let `vue3-clipboard` set `container` to current element by doing this:

```js
import { createApp } from 'vue'
import VueClipboard from 'vue3-clipboard'

const app = createApp({})

app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
})
```

## Sample

```html
<template>
  <div class="container">
    <button type="button" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">
      Copy!
    </button>
  </div>
</template>

<script>
  export default {
    setup() {
      const message = 'Hello Clipborad!'
      const onCopy = (e) => {
        alert('You just copied: ' + e.text)
      }
      const onError = (e) => {
        alert('Failed to copy texts')
      }

      return { message, onCopy, onError }
    },
  }
</script>
```

## Sample 2

```html
<template>
  <div class="container">
    <button type="button" @click="doCopy">Copy!</button>
  </div>
</template>

<script>
  import { copyText } from 'vue3-clipboard'

  export default {
    setup() {
      const doCopy = () => {
        copyText('Hello Clipborad', undefined, (error, event) => {
          if (error) {
            alert('Can not copy')
            console.log(error)
          } else {
            alert('Copied')
            console.log(event)
          }
        })
      }

      return { doCopy }
    },
  }
</script>
```
