import React from 'react';
import renderer from 'react-test-renderer';
import * as ReactRedux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ManageAuthorPage from '../ManageAuthorPage';
import { authors } from '../../../../../tools/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

jest.mock('../../AuthorForm', () => {
  const AuthorFormMock = () => (<div className="author-form-mock" />);
  return AuthorFormMock;
});

const props = {
  history: {
    push: () => {},
  },
  match: {
    params: {
      slug: '',
    },
  },
};

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

  it('render ManageAuthorPage with loading spinner', () => {
    const store = mockStore({});

    const tree = renderer.create(
      <ReactRedux.Provider store={store}>
        <ManageAuthorPage
          history={props.history}
          match={props.match}
        />
      </ReactRedux.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('render ManageAuthorPage with mock AuthorForm', () => {
    const store = mockStore({
      authors,
      author: authors[0],
    });
    props.match.slug = authors[0].slug;

    const tree = renderer.create(
      <ReactRedux.Provider store={store}>
        <ManageAuthorPage
          history={props.history}
          match={props.match}
        />
      </ReactRedux.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
