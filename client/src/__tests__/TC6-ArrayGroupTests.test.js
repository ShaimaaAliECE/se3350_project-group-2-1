import App from '../App';
import Game from '../components/Game';
import { fireEvent, render, screen, queryByAttribute } from '@testing-library/react';

// Helper function to query elements by id
const getById = queryByAttribute.bind(null, 'id');
const getByClass = queryByAttribute.bind(null, 'class');

test('Home Page Loads', () => {
    render(<App />);
    const title = screen.getByText(/Array Sorting Game/i);
    expect(title).toBeInTheDocument();
});

test('Level 1 Loads', () => {
  let dom = render(<Game></Game>);
  expect(screen.getByText('Level 1')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Level 1'));
  expect(screen.getByText('Merge Sort Walkthrough')).toBeInTheDocument();
  //expect(screen.getByText('Current Action')).toBeInTheDocument();
});

test('Level 2 Loads', () => {
  let dom = render(<Game startLevel={2}></Game>);
  expect(screen.getByText('Level 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Level 2'));
  expect(screen.getByText('Welcome to Level 2!')).toBeInTheDocument();
  expect(screen.getByText('Root Array')).toBeInTheDocument();
});

test('Level 3 Loads', () => {
  let dom = render(<Game startLevel={3}></Game>);
  expect(screen.getByText('Level 3')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Level 3'));
  expect(screen.getByText('Root Array')).toBeInTheDocument();
  expect(screen.getByText('Split')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Split'));
  expect(screen.getByText('Left Array')).toBeInTheDocument();
  expect(screen.getByText('Right Array')).toBeInTheDocument();
});

test('Level 4 Loads', () => {
  let dom = render(<Game startLevel={4}></Game>);
  expect(screen.getByText('Level 4')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Level 4'));
  expect(screen.getByText('Root Array')).toBeInTheDocument();
  expect(screen.getByText('Split')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Split'));
  expect(screen.getByText('Left Array')).toBeInTheDocument();
  expect(screen.getByText('Right Array')).toBeInTheDocument();
});

test('Level 5 Loads', () => {
  let dom = render(<Game startLevel={5}></Game>);
  expect(screen.getByText('Level 5')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Level 5'));
  expect(screen.getByText('Root Array')).toBeInTheDocument();
  expect(screen.getByText('Split')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Split'));
  expect(screen.getByText('Left Array')).toBeInTheDocument();
  expect(screen.getByText('Right Array')).toBeInTheDocument();
});

test('Custom Level Loads', () => {
  let dom = render(<Game startLevel={6}></Game>);
  expect(screen.getByText('Custom')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Custom'));
  expect(screen.getByText('Root Array')).toBeInTheDocument();
  expect(screen.getByText('Split')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Split'));
  expect(screen.getByText('Left Array')).toBeInTheDocument();
  expect(screen.getByText('Right Array')).toBeInTheDocument();
  expect(dom.container.querySelector('input[type=text]').hasAttribute('disabled')).toEqual(false);
});