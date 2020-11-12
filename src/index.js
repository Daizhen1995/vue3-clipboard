import Clipboard from 'clipboard/dist/clipboard.min.js'

let VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true,
}
export function copyText(text, container, callback) {
  var fakeElement = document.createElement('button')
  var clipboard = new Clipboard(fakeElement, {
    text: function () {
      return text
    },
    action: function () {
      return 'copy'
    },
    container: typeof container === 'object' ? container : document.body,
  })
  clipboard.on('success', function (e) {
    clipboard.destroy()
    callback(undefined, e)
  })
  clipboard.on('error', function (e) {
    clipboard.destroy()
    callback(e, undefined)
  })
  if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
  fakeElement.click()
  if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
}

export default function (app, vueClipboardConfig) {
  VueClipboardConfig = vueClipboardConfig
  app.config.globalProperties.$copyText = copyText
  app.directive('clipboard', {
    mounted: function (el, binding) {
      if (binding.arg === 'success') {
        el._vClipboard_success = binding.value
      } else if (binding.arg === 'error') {
        el._vClipboard_error = binding.value
      } else {
        var clipboard = new Clipboard(el, {
          text: function () {
            return binding.value
          },
          action: function () {
            return binding.arg === 'cut' ? 'cut' : 'copy'
          },
          container: vueClipboardConfig.autoSetContainer ? el : undefined,
        })
        clipboard.on('success', function (e) {
          var callback = el._vClipboard_success
          callback && callback(e)
        })
        clipboard.on('error', function (e) {
          var callback = el._vClipboard_error
          callback && callback(e)
        })
        el._vClipboard = clipboard
      }
    },
    updated: function (el, binding) {
      if (binding.arg === 'success') {
        el._vClipboard_success = binding.value
      } else if (binding.arg === 'error') {
        el._vClipboard_error = binding.value
      } else {
        el._vClipboard.text = function () {
          return binding.value
        }
        el._vClipboard.action = function () {
          return binding.arg === 'cut' ? 'cut' : 'copy'
        }
      }
    },
    unmounted: function (el, binding) {
      if (binding.arg === 'success') {
        delete el._vClipboard_success
      } else if (binding.arg === 'error') {
        delete el._vClipboard_error
      } else {
        el._vClipboard.destroy()
        delete el._vClipboard
      }
    },
  })
}
