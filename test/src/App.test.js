import { render, screen } from '@testing-library/react';
import App67 from './App67';

test('renders learn react link', () => {
  render(<App67 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
