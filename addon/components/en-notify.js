import Ember from 'ember'

const { A, get, set, computed, Component, inject } = Ember

export default Component.extend({
  classNames: ['en-notify'],

  notify: inject.service(),
  messages: null,

  init() {
    this._super(...arguments)
    set(this, 'messages', A())
    get(this, 'notify').setTarget(this)
  },

  willDestroyElement() {
    get(this, 'notify').setTarget(null)
  },

  show(message) {
    if (get(this, 'isDestroyed')) return

    get(this, 'messages').pushObject(message)
    return message
  },
})
