import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('name-generator', 'Integration | Component | name generator', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{name-generator}}`);

  assert.notEqual(this.$().text().trim().length, 0);
  assert.notEqual(this.$('button').length, 0);
});
