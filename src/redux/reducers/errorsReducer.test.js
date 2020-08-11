import errorsReducer from './errorsReducer';

test('Default state should be login', () => {
    let action = { type: 'blah'};
    expect(errorsReducer(undefined, action.loginMessage)).toBe('')
    expect(errorsReducer('blah', action)).toBe('')
})

test('login mode should return login ', () => {
    let action = { type: 'LOGIN_INPUT_ERROR'};
    expect(errorsReducer('blah', action)).toBe({loginMessage: 'Enter your username and password!'});
})