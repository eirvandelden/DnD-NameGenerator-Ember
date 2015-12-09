import Ember from 'ember';
import _number from 'lodash/number';

var beginning = ['A', 'Be', 'De', 'El', 'Fa', 'Jo', 'Ki', 'La', 'Ma', 'Na', 'O', 'Pa', 'Re', 'Si', 'Ta', 'Va'];
var middle = ['bar', 'ched', 'dell', 'far'];
var last = ['a','ac', 'ai', 'al', 'am', 'an', 'ar', 'ea', 'el', 'er', 'ess', 'elt', 'ic','id', 'il', 'in', 'is', 'of', 'us'];

export default Ember.Component.extend({
  actions: {
    generateName() {
      var rbeginning = _number.random(0, beginning.length - 1),
          rmiddle = _number.random(0, middle.length - 1),
          rlast = _number.random(0, last.length - 1);

      var name = beginning[rbeginning] + middle[rmiddle] + last[rlast];

      this.setProperties({'name': name});
    }
  },
  name: Ember.computed('bla', function () {
    this.sendAction('generateName')
  })
});
