/**
 * Created by axetroy on 17-6-14.
 */
const fs = require('fs');

fs.readFile('./dist/flex-grid.css', { encoding: 'utf8' }, function(
  err,
  content
) {
  if (err) throw err;
  fs.writeFile('./dist/flex-grid.wxss', content, function() {
    if (err) throw err;
  });
});
