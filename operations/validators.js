function isDefined(value) {
  if (value === undefined || value === null) {
    return false;
  }
  return true;
}

module.exports = {
  isDefined,
};
