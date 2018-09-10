import bookshelfParanoia from 'bookshelf-paranoia';

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : process.env.DB_HOST || '127.0.0.1',
    user     : process.env.DB_USER ||  'root',
    password : process.env.DB_PASSWORD || 'password',
    database : process.env.DB_NAME || 'vsmart-courseware',
    charset  : 'utf8'
  }
});

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('pagination');
bookshelf.plugin('registry');
bookshelf.plugin(bookshelfParanoia, { field: 'deleted_at' });

export default bookshelf;