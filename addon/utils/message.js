import Em from 'ember'

export default Em.Object.extend({
  header: null,
  text: null,
  type: 'info',
  closeAfter: undefined,
  visible: undefined
})
