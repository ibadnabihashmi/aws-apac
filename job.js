var async               = require('async');
var _                   = require('lodash');
var fs                  = require('fs');
var OperationHelper     = require('apac').OperationHelper;
var opHelper            = new OperationHelper({
  awsId:     'AKIAIOHILJDN5U7NCUFA',
  awsSecret: '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',
  assocId:   'keevaorganics-20'
});

var queue = [
  {
    "BrowseNodeId" : "2335753011",
    "Name" : "Cell Phones & Accessories"
  }
];

async.eachSeries(queue,function (elem,callback) {
  console.log('1');
  opHelper.execute('BrowseNodeLookup', {
    BrowseNodeId: elem.BrowseNodeId
  }).then(function (response) {
    console.log('2');
    console.log("....................processing.................. "+elem.Name);
    fs.writeFile('cats/'+elem.Name+'.json', JSON.stringify(response.result.BrowseNodeLookupResponse.BrowseNodes.BrowseNode.Children,null,2),function (err) {
      console.log('3');
      if(err){
        console.log('err 1');
        callback(err);
      }else{
        console.log('4');
        var nodes = JSON.parse(fs.readFileSync('cats/'+elem.Name+'.json')).BrowseNode;
        console.log('5');
        queue.shift();
        queue = _.concat(queue,nodes);
        console.log('6');
        callback();
      }
    });
  }).catch(function (response) {
    console.log('err 2');
    callback(response.err);
  });
  console.log('7');
},function (err) {
  if(err){
    console.log('notDone');
    throw err;
    return;
  }else{
    console.log('done!!');
    return;
  }
});
console.log("ENDEDEDEDEDEDEDED");