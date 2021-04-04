var request = require('request');

export function getPosts(req, res) {
  console.log('In api/test/posts');
  res.render('./test.ejs');
}

export function getResults(req, res) {
  console.log('In api/test/getResults');
  console.log(req.params)
  console.log('==================================================================')
  const testArray = ['json', 'mongoose', 'module'];
  res.json({ results: testArray });
}

// export function testLogin(req,res) {
//   res.render('./登录界面.ejs');
// }

export function testRemoteFile(req,res){
  // request.post('http://localhost')
}