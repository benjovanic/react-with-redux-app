import React from 'react';
import renderer from 'react-test-renderer';
import PageNotFound from '../PageNotFound';

it('render PageNotFound component', () => {
  const tree = renderer.create(<PageNotFound />);
  expect(tree).toMatchSnapshot();
});
