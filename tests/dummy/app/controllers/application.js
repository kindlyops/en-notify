import Em from 'ember'

export default Em.Controller.extend({
  notify: Em.inject.service(),

  init () {
    this.get('notify').success({
      header: "Something went wrong",
      text: 'Hello',
      closeAfter: 150000
    })
  }
})
