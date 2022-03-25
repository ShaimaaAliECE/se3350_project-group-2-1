import Game from '../components/Game.jsx';
import {render, fireEvent, screen } from '@testing-library/react'
window.alert = jest.fn();

test('timeout activity is initiated', () => {
   render(<Game></Game>);
   fireEvent.click(screen.getByText('Level 5'));

   setTimeout(setTimeout(() => {
    expect(window.alert).toHaveTextContent('Timeout due to inactivity!');
  }, 300001));

});