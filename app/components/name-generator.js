import Ember from 'ember';
import _number from 'lodash/number';

var beginning = ['A', 'Be', 'De', 'El', 'Fa', 'Jo', 'Ki', 'La', 'Ma', 'Na', 'O', 'Pa', 'Re', 'Si', 'Ta', 'Va'];
var middle = ['bar', 'ched', 'dell', 'far'];
var last = ['a','ac', 'ai', 'al', 'am', 'an', 'ar', 'ea', 'el', 'er', 'ess', 'elt', 'ic','id', 'il', 'in', 'is', 'of', 'us'];

export default Ember.Component.extend({
  actions: {
    newName() {
        this.setName();
    }
  },
  generateName: function () {
      var rbeginning = _number.random(0, beginning.length - 1),
          rmiddle = _number.random(0, middle.length - 1),
          rlast = _number.random(0, last.length - 1);

      return beginning[rbeginning] + middle[rmiddle] + last[rlast];
  },
   setName: function () {
       this.set('name', this.generateName())
   }.on('init')
});
