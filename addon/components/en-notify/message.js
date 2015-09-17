import Ember from 'ember';

const {
  get: get,
  set: set,
  computed,
  getWithDefault,
  run
} = Em

export default Ember.Component.extend({
  classNames: ['en-notify-message'],
  classNameBindings: ['message.type', 'message.visible:en-notify-show:en-notify-hide'],

  message: null,
  closeAfter: null,

  init () {
    this._super(...arguments)

    run.later(this, () => {
      set(this, 'message.visible', true)
    }, 50)
  },
  
  didInsertElement () {
    let closeAfter = getWithDefault(this, 'message.closeAfter', get(this, 'closeAfter'))

    if (closeAfter) {
      run.later(this, () => {
        if (get(this, 'isDestroyed')) return
        this.send('close')

      }, closeAfter)
    }
  },

  actions: {
    close () {
      if (get(this, 'message.closed')) return

      get(this, 'message').setProperties({
        closed: true,
        visible: false
      })

      run.later(this, () => {
        let parent = get(this, 'parentView')
        if (get(this, 'isDestroyed') || ! parent || !get(parent, 'messages')) return

        get(parent, 'messages').removeObject(get(this, 'message'))
        set(this, 'message.visible', null)

      }, 250)
    }
  }
});
