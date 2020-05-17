import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../TextInput';

it('render TextInput component', () => {
  const tree = renderer.create(
    <TextInput
      name="input"
      label="Input"
      onChange={jest.fn()}
    />,
  );
  expect(tree).toMatchSnapshot();
});
