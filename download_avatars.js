var request = require('request');
var fs = require('fs');

var ghToken = require('./secrets.js')

var args = process.argv;
var rOwner = args[2];
var rName = args[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'jlum07',
      'Authorization': 'token ' + ghToken['GITHUB_TOKEN']
    }
  };

  if (!repoOwner || !repoName) {
    console.log('Error: you must enter both a repo owner and name');
    return;
  }

  request(options, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors(rOwner, rName, function(err, result) {

  var contributorsOjb = JSON.parse(result);

  for (var objs of contributorsOjb) {
    downloadImageByURL(objs['avatar_url'], objs['login']);
  }

});

function downloadImageByURL(url, filePath) {

  // var fileType;

  request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response) {
        var fileType = response.headers['content-type'].slice(6);
        // console.log('./avatars/'+ filePath + '.' + response.headers['content-type'].slice(6));
        response.pipe(fs.createWriteStream('./avatars/'+ filePath + '.' + fileType));
      })
      // .pipe(fs.createWriteStream('./avatars/'+ filePath)); // cant add extension or some files wont open in file manager
      // .pipe(fs.createWriteStream('./avatars/'+ filePath + '.' + fileType)); // if i use this line instead of the one above and uncomment the .on response above file types are undefined.. pipe is running before the .on function

      // console.log('./avatars/'+ filePath + '.' + fileType); //this return undefined for file type.. for some reason pipe is being run before .on response
}
