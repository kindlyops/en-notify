import Em from 'ember'

export default Em.Controller.extend({
  notify: Em.inject.service(),

  init () {
    let e = this.get('notify').success({
      uid: '123',
      header: "Something went wrong",
      text: 'Hello',
      closeAfter: 150000
    })

    Em.run.later(() => {
      e.set('text', 'ok')
    }, 1500)

    Em.run.later(() => {
      this.get('notify').remove('123')
    }, 1500)
  }
})
