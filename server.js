const index = require('./index.js');
const db = require('./config/mongoose');
const port = 8000; // port

index.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Express Server is running! - ', port);
});
