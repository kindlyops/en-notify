import Em from 'ember'

export default Em.Object.extend({
  header: null,
  text: null,
  errors: Em.A([]),
  type: 'info',
  closeAfter: undefined,
  visible: undefined
})
