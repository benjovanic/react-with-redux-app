import React from 'react';
import renderer from 'react-test-renderer';
import SelectInput from '../SelectInput';

it('render SelectInput component', () => {
  const tree = renderer.create(
    <SelectInput
      name="list"
      label="List"
      onChange={jest.fn()}
    />,
  );
  expect(tree).toMatchSnapshot();
});
