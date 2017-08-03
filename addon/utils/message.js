import Ember from 'ember'

const { A } = Ember

export default Ember.Object.extend({
  uid: null,
  header: null,
  text: null,
  errors: A([]),
  type: 'info',
  closeAfter: undefined,
  visible: undefined,
})
