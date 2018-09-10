import bookshelf from 'config/bookshelf';

const UserProfile = bookshelf.Model.extend({
  tableName: 'user_profiles',
  softDelete: true,
  hasTimestamps: true,
});

bookshelf.model('UserProfile', UserProfile);

export default UserProfile;