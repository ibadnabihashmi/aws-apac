var async               = require('async');
var _                   = require('lodash');
var fs                  = require('fs');
var OperationHelper     = require('apac').OperationHelper;
var sleep               = require('sleep');


var queue = [
  {
    "BrowseNodeId" : "2335753011",
    "Name" : "Cell Phones & Accessories"
  }
];

var nodes = [];
function doSomething(elem) {
  sleep.sleep(2);
  nodes.push(elem);
  fs.writeFileSync('nodes/'+queue[0].Name+'.json', JSON.stringify(nodes,null,2));
  console.log(elem);
  console.log("-------------------------------");
  var promise = opHelper.execute('BrowseNodeLookup', {
    BrowseNodeId: elem.BrowseNodeId
  });
  promise.then(function (response) {
    if(response.result.BrowseNodeLookupResponse.BrowseNodes.BrowseNode.Children){
      var childs = response.result.BrowseNodeLookupResponse.BrowseNodes.BrowseNode.Children.BrowseNode;
      _.forEach(childs,function (child) {
        doSomething(child);
      })
    }
  }).catch(function (response) {
    console.log('error : '+elem.BrowseNodeId);
  });
}

doSomething(queue[0]);
