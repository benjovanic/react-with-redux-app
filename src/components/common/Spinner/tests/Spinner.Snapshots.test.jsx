import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from '../Spinner';

it('render Spinner component', () => {
  const tree = renderer.create(<Spinner />);
  expect(tree).toMatchSnapshot();
});
