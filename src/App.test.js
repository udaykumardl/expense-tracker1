// import { render, screen } from '@testing-library/react';
// import { act } from 'react';
// import App from './App';

// test('renders learn react link', () => {
//   act(() => {
//     render(<App />);
//   });
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello React link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learn React/i);
  expect(linkElement).toBeInTheDocument();
});