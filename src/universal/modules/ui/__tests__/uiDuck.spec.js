import reducer, * as duck from '../uiDuck';

const {
  TOGGLE_SIDEBAR,
} = duck;

jest.unmock('immutable');
jest.unmock('../uiDuck');

describe('ui action creators', () => {
  it('should make a toggle sidebar action', () => {
    const expected = {
      type: TOGGLE_SIDEBAR,
    };

    expect(duck.toggleSidebar()).toEqual(expected);
  });
});

describe('ui reducer', () => {
  it('should return initial state', () => {
    const { sidebar } = reducer(undefined, {});

    expect(sidebar).toBe(false);
  });

  it('should handle TOGGLE_SIDEBAR - clear', () => {
    const { sidebar } = reducer(undefined, {
      type: TOGGLE_SIDEBAR,
    });

    expect(sidebar).toBe(true);
  });

  it('should handle TOGGLE_SIDEBAR - open', () => {
    const initialState = reducer({
      sidebar: true,
    });

    const { sidebar } = reducer(initialState, {
      type: TOGGLE_SIDEBAR,
    });

    expect(sidebar).toBe(false);
  });
});
