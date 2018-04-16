var request = require('request');
var ghToken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

// function getRepoContributors(repoOwner, repoName, cb) {

  // var url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  // request.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`)
  //   .on('error', function (err) {
  //     throw err;
  //   })
  //   .on('response', function (response) {

  //   })

// }


function getRepoContributors(repoOwner, repoName, cb) {

  // var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'jlum07',
      'Authorization': 'token ' + ghToken['GITHUB_TOKEN']
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {

  var contributorsOjb = JSON.parse(result);

  console.log("Errors:", err);
  // console.log("Result:", contributorsOjb);

  for (var objs of contributorsOjb) {
    console.log(objs['avatar_url']);
  }

});