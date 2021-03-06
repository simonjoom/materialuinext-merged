// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Toolbar, { styleSheet } from './Toolbar';

/**
 * An item that goes in lists.
 */
describe('<Toolbar>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <Toolbar />
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
  });

  it('should render with the user, root and gutters classes', () => {
    const wrapper = shallow(<Toolbar className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.gutters), true, 'should have the gutters class');
  });

  it('should disable the gutters', () => {
    const wrapper = shallow(<Toolbar gutters={false} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.gutters), false, 'should not have the gutters class');
  });
});
