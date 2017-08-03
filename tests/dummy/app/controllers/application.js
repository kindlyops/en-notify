import Ember from 'ember'

const { get, set, run, Controller, inject: { service }} = Ember

export default Controller.extend({
  notify: service(),

  init () {
    let notify = get(this, 'notify').success({
      uid: '123',
      header: "Something went wrong",
      text: 'Hello'
    })

    run.later(() => {
      set(notify, 'text', 'ok')
    }, 1500)
  }
})
