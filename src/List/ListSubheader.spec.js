// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ListSubheader, { styleSheet } from './ListSubheader';

describe('<ListSubheader>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <ListSubheader />
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ListSubheader className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should display primary class', () => {
    const wrapper = shallow(<ListSubheader primary />);
    assert.strictEqual(wrapper.hasClass(classes.primary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should display inset class', () => {
    const wrapper = shallow(<ListSubheader inset />);
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
});
