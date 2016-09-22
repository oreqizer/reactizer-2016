import reducer, * as duck from '../intlDuck';

const {
  SET_LOCALE,
} = duck;

const sk = 'sk';

describe('intl action creators', () => {
  it('should make a set locale action', () => {
    const expected = {
      type: SET_LOCALE,
      payload: { locale: sk },
    };

    expect(duck.setLocale(sk)).toEqual(expected);
  });
});

describe('intl reducer', () => {
  it('should return initial state', () => {
    const { locale } = reducer(undefined, {});

    expect(locale).toBe(null);
  });

  it('should handle SET_LOCALE', () => {
    const initialState = reducer({
      locale: 'en',
    });

    const { locale } = reducer(initialState, {
      type: SET_LOCALE,
      payload: { locale: sk },
    });

    expect(locale).toBe(sk);
  });
});
