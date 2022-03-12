import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import ArrayGroup from './components/ArrayGroup.jsx';
import Game from './components/Game.jsx';

test('Home Page Loads', () => {
  render(<App />);
  const title = screen.getByText(/Array Sorting Game/i);
  expect(title).toBeInTheDocument();
});
