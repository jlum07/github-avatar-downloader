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

  // console.log("Errors:", err);
  // console.log("Result:", contributorsOjb);

  for (var objs of contributorsOjb) {
    downloadImageByURL(objs['avatar_url'], objs['login']);
  }

});

function downloadImageByURL(url, filePath) {

  request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .pipe(fs.createWriteStream('./avatars/'+ filePath +'')); // cant add extension or some files wont open in file manager

}
