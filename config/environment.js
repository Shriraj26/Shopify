const dev = {
  name: 'dev',
  db_name: 'inventory_management',
};

const test = {
  name: 'test',
  db_name: 'inventory_management_test',
};

if (process.argv.slice(2)[0] === 'dev') {
  module.exports = dev;
} else {
  module.exports = test;
}
