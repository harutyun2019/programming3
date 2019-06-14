var fs = require('fs');

function main(){
   var file  = "hello.html";
   fs.appendFileSync(file, "Hello world\n");
}
main();