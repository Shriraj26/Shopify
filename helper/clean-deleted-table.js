function clean() {
  // Check if record inserted in deleted table is older than 15 mins this cron job was run...
  // delete the records older than 15 mins, of this cron job

  console.log('Called at - ', Date.now());
}

module.exports = clean;
