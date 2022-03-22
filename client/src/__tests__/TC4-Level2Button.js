
import Game from '../components/Game.jsx';
import {render, fireEvent, waitFor, screen, queryByAttribute} from '@testing-library/react'

test('check if level 1 is rendering on open', () => {
   let dom = render(<Game></Game>);
   const getById = queryByAttribute.bind(null, 'id');
   fireEvent.click(screen.getByText('Level 1'));
   expect(getById(dom.container, 'mistakesCountB')).toHaveTextContent('Mistakes Left: 3');
});