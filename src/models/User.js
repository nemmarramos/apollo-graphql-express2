import bookshelf from 'config/bookshelf';

const User = bookshelf.Model.extend({
  tableName: 'users',
  softDelete: true,
  hasTimestamps: true,
});

bookshelf.model('User', User);

export default User;