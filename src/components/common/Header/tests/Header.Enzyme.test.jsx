// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import { MemoryRouter } from 'react-router-dom';
// import Header from '../Header';

// // Note how with shallow render you search for the React component tag
// it('contains 4 NavLinks via shallow', () => {
//   const numLinks = shallow(<Header />).find('NavLink').length;
//   expect(numLinks).toEqual(4);
// });

// // Note how with mount you search for the final rendered HTML since it generates the final DOM.
// // We also need to pull in React Router's memoryRouter for testing since the Header expects to
// // have React Router's props passed in.
// it('contains 4 anchors via mount', () => {
//   const numAnchors = mount(
//     <MemoryRouter>
//       <Header />
//     </MemoryRouter>,
//   ).find('a').length;

//   expect(numAnchors).toEqual(4);
// });
