import Em from 'ember'

export default Em.Object.extend({
  uid: null,
  header: null,
  text: null,
  errors: Em.A([]),
  type: 'info',
  closeAfter: undefined,
  visible: undefined
})
