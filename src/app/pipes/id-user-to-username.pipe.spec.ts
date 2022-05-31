import { IdUserToUsernamePipe } from './id-user-to-username.pipe';

describe('IdUserToUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new IdUserToUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
