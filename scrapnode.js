var async               = require('async');
var _                   = require('lodash');
var fs                  = require('fs');
var OperationHelper     = require('apac').OperationHelper;


var queue = [
    {
        "BrowseNodeId" : "2335753011",
        "Name" : "Cell Phones & Accessories"
    }
];

// async.eachSeries(queue,function (elem,callback) {
//   var promise = opHelper.execute('BrowseNodeLookup', {
//     BrowseNodeId: elem.BrowseNodeId
//   });
//   promise.then(function (response) {
//     fs.writeFile('cats/'+elem.Name+'.json', JSON.stringify(response.result.BrowseNodeLookupResponse.BrowseNodes.BrowseNode.Children,null,2),function (err) {
//       if(err){
//         callback(err);
//       }else{
//         var nodes = JSON.parse(fs.readFileSync('cats/'+elem.Name+'.json')).BrowseNode;
//         queue.shift();
//         queue = _.concat(queue,nodes);
//         callback(null,'done');
//       }
//     });
//   }).catch(function (response) {
//     callback(response.err);
//   });
// },function (err) {
//   if(err){
//     console.log('notDone');
//     throw err;
//     return;
//   }else{
//     console.log('done!!');
//     return;
//   }
// });
// console.log("ENDEDEDEDEDEDEDED");
