// _middlewareName.js

const _middlewareName = function(req, res, next){
  console.log('This is middleware _middlewareName')
  next()
}

module.exports = _middlewareName