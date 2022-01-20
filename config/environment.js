const dev = {
  name: 'dev',
  db_name: 'inventory_management',
};

const test = {
  name: 'test',
  db_name: 'inventory_management_test',
};

if (process.argv.slice(2)[0] === 'dev') {
  process.env.NODE_ENV = 'dev';
} else if (process.argv.slice(2)[0] === 'test') {
  process.env.NODE_ENV = 'test';
}

module.exports = {
  dev,
  test,
};
