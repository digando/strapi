import createRoute from '../createRoute';

describe('ADMIN | CONTAINER | SettingsPage | utils | createRoute', () => {
  it('should return a <Route /> with the correctProps', () => {
    const compo = () => 'test';

    const {
      props: { component, path, exact },
      key,
    } = createRoute(compo, '/test', true);

    expect(key).toEqual('/test');
    expect(component()).toEqual('test');
    expect(exact).toBeTruthy();
    expect(path).toEqual('/test');
  });
});
