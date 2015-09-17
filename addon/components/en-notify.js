import Ember from 'ember';

const {
  get: get,
  set: set,
  computed,
  inject,
} = Em

export default Ember.Component.extend({
  classNames: ['en-notify'],

  notify: inject.service(),
  messages: null,

  init () {
    this._super(...arguments)
    this.set('messages', Em.A())
    this.get('notify').setTarget(this)
  },

  willDestroyElement () {
    this.get('notify').setTarget(null)
  },

  show (message) {
    if (get(this, 'isDestroyed')) return 

    get(this, 'messages').pushObject(message)
    return message
  }
});
