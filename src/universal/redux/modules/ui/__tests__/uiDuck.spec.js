import reducer, * as actions from '../uiDuck';
import {
  TOGGLE_SIDEBAR,
} from '../uiActions';

jest.unmock('immutable');
jest.unmock('../uiDuck');

describe('ui action creators', () => {
  it('should make a fetch action', () => {
    const expected = {
      type: TOGGLE_SIDEBAR,
    };

    expect(actions.toggleSidebar()).toEqual(expected);
  });
});

describe('todo reducer', () => {
  it('should return initial state', () => {
    const { sidebar } = reducer(undefined, {});

    expect(sidebar).toBe(false);
  });

  it('should handle TOGGLE_SIDEBAR', () => {
    const { sidebar } = reducer(undefined, {
      type: TOGGLE_SIDEBAR,
    });

    expect(sidebar).toBe(true);
  });
});
