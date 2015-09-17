import Em from 'ember'
import Message from 'en-notify/utils/message'

const {
  get: get,
  set: set
} = Em

export default Ember.Service.extend({
  init () {
    this.pending = []
  },

  show (type, options) {
    let message = Message.create({
      type: type,
      header: options.header,
      text: options.text,
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

  setTarget (target) {
    set(this, 'target', target)
    
    if (target) {
      this.pending.forEach(message => target.show(message))
      this.pending = []
    }
  }
});
