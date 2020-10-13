import 'izitoast/dist/css/iziToast.min.css'
import iziToast from 'izitoast'

const toast = {
  error: (message, title = 'Error') => {
    return iziToast.error({
      title: title,
      message: message,
      position: 'topCenter',
      overlayClose: true,
      overlay: true,
      closeOnEscape: true,
      closeOnClick: true
    })
  },
  success: (message, title = 'Success') => {
    return iziToast.success({
      title: title,
      message: message,
      position: 'topCenter',
      overlayClose: true,
      overlay: true,
      closeOnEscape: true,
      closeOnClick: true
    })
  },
  warn: (message, title = 'Warning') => {
    return iziToast.warning({
      title: title,
      position: 'topCenter',
      overlayClose: true,
      overlay: true,
      closeOnEscape: true,
      closeOnClick: true,
      message: message
    })
  },
  confirm: (message, title = 'Confirm', callback) => {
    return iziToast.show({
      color: 'red',
      title: title,
      message: message,
      position: 'center',
      progressBarColor: 'red',
      buttons: [
        [
          '<button>Yes</button>',
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: 'fadeOutUp'
              },
              toast
            )
            callback()
          },
          true
        ],
        [
          '<button>Close</button>',
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: 'fadeOutUp'
              },
              toast
            )
          }
        ]
      ]
    })
  }
}

export default toast
