var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-less-data';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

function serializeData(data) {
    var s = '';

    for (var name in data) {
        if (Object.hasOwnProperty.call(data, name)) {
            var value = data[name];
            s += ((name[0] === '@') ? '' : '@') + name +': '+ value +
                    ((('' + value).slice(-1) === ';') ? '' : ';');
            s += "\n";
        }
    }

    return s.toString();
}

// Plugin level function(dealing with files)
function gulpLessData(data) {

  /*if (!data) {
    throw new PluginError(PLUGIN_NAME, 'Missing less data!');
  }*/

  data = data || {};

  var prefixData = serializeData(data);

  prefixBuffer = new Buffer(prefixData); // allocate ahead of time

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixBuffer, file.contents]);
    }
    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixBuffer));
    }

    cb(null, file);

  });

}

// Exporting the plugin main function
module.exports = gulpLessData;
