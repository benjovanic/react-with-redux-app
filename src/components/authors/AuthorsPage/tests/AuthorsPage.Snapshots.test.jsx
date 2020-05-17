import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AuthorsPage from '../AuthorsPage';
import initialState from '../../../../redux/reducers/initialState';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

it('render AuthorsList component', () => {
  // const tree = renderer.create(
  //   <Provider store={store}>
  //     <AuthorsPage />
  //   </Provider>,
  // );

  // expect(tree).toMatchSnapshot();

  // TODO mock fetch()
});
