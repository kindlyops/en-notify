import Ember from 'ember'

const { get, set, computed, Component, getWithDefault, run, testing } = Ember

export default Component.extend({
  classNames: ['en-notify-message'],
  classNameBindings: [
    'message.type',
    'message.visible:en-notify-show:en-notify-hide',
  ],

  message: null,
  closeAfter: 2500,

  isSuccess: computed.equal('message.type', 'success'),
  isError: computed.equal('message.type', 'error'),

  init() {
    this._super(...arguments)
    set(this, 'message.visible', true)
  },

  didInsertElement() {
    let closeAfter = getWithDefault(
      this,
      'message.closeAfter',
      get(this, 'closeAfter'),
    )

    if (testing) {
      closeAfter = false
    }

    if (closeAfter) {
      run.later(
        this,
        () => {
          if (get(this, 'isDestroyed')) return
          this.send('close')
        },
        closeAfter,
      )
    }
  },

  actions: {
    close() {
      if (get(this, 'message.closed')) return

      get(this, 'message').setProperties({
        closed: true,
        visible: false,
      })

      run.later(
        this,
        () => {
          let parent = get(this, 'parentView')
          if (get(this, 'isDestroyed') || !parent || !get(parent, 'messages'))
            return

          get(parent, 'messages').removeObject(get(this, 'message'))
          set(this, 'message.visible', null)
        },
        250,
      )
    },
  },
})
