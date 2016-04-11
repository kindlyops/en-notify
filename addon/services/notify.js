import Em from 'ember'
import Message from 'en-notify/utils/message'

const {
  get: get,
  set: set
} = Em

function aliasToShow (type) {
  return function (message, options) {
    return this.show(type, message, options)
  }
}

export default Ember.Service.extend({
  init () {
    this.pending = []
  },

  success: aliasToShow('success'),
  error: aliasToShow('error'),

  show (type, options) {
    let message = Message.create({
      type: type,
      uid: options.uid,
      header: options.header,
      text: options.text,
      errors: options.errors,
      closeAfter: options.closeAfter
    })

    let target = get(this, 'target')

    if (target) {
      target.show(message)
    } else {
      this.pending.push(message)
    }

    return message
  },

  remove (uid) {
    let target = get(this, 'target')
    let message, messages, filtered

    if (target) {
      messages = target.get('messages')
      message = messages.filter(message => get(message, 'uid') === uid)
      messages.removeObjects(message)
    } else {
      messages = this.pending
      filtered = messages.reject(message => get(message, 'uid') === uid)
      this.pending = filtered
    }
  },

  setTarget (target) {
    set(this, 'target', target)
    
    if (target) {
      this.pending.forEach(message => target.show(message))
      this.pending = []
    }
  }
});
