import React from 'react';
import renderer from 'react-test-renderer';
import * as ReactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AuthorsPage from '../AuthorsPage';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

jest.mock('../../AuthorList', () => {
  const AuthorListMock = () => (<div className="author-list-mock" />);
  return AuthorListMock;
});

let spyOnUseDispatch;

describe('AuthorsPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn(() => Promise.resolve());
    spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(dispatch);
  });

  afterEach(() => {
    spyOnUseDispatch.mockRestore();
  });

  it('render AuthorsPage with mock AuthorList', () => {
    const store = mockStore({
      authors: [],
    });
    const tree = renderer.create(
      <ReactRedux.Provider store={store}>
        <AuthorsPage />
      </ReactRedux.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('render AuthorsPage with loading spinner', () => {
    const store = mockStore({
      apiCallsInProgress: 1,
    });
    const tree = renderer.create(
      <MemoryRouter>
        <ReactRedux.Provider store={store}>
          <AuthorsPage />
        </ReactRedux.Provider>
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
