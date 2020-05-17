import React from 'react';
import renderer from 'react-test-renderer';
import AboutPage from '../AboutPage';

it('render AboutPage component', () => {
  const tree = renderer.create(<AboutPage />);
  expect(tree).toMatchSnapshot();
});
