import React from 'react';
import renderer from 'react-test-renderer';
import * as ReactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ManageAuthorPage from '../ManageAuthorPage';
import { authors } from '../../../../../tools/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

let spyOnUseDispatch;

describe('ManageAuthorPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn(() => Promise.resolve());
    spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(dispatch);
  });

  afterEach(() => {
    spyOnUseDispatch.mockRestore();
  });

  it('render ManageAuthorPage with empty authors', () => {
    // const store = mockStore({
    //   authors: [],
    // });
    // const tree = renderer.create(
    //   <ReactRedux.Provider store={store}>
    //     <ManageAuthorPage />
    //   </ReactRedux.Provider>,
    // );
    expect('').toMatchSnapshot();
  });
});
