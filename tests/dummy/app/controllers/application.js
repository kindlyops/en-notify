import Em from 'ember'

export default Em.Controller.extend({
  notify: Em.inject.service(),

  init () {
    this.get('notify').show("error", {
      header: "Something went wrong",
      errors: ['Hello there', 'Hi there'],
      closeAfter: null
    })
  }
})
