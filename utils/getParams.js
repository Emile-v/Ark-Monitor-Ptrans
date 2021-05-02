// program to get a function's name/values dynamically
function getParams(func) {
          
    // String representaation of the function code
    var str = func.toString();
  
    // Remove comments of the form /* ... */
    // Removing comments of the form //
    // Remove body of the function { ... }
    // removing '=>' if func is arrow function 
    str = str.replace(/\/\*[\s\S]*?\*\//g, '') 
            .replace(/\/\/(.)*/g, '')         
            .replace(/{[\s\S]*}/, '')
            .replace(/=>/g, '')
            .trim();
  
    // Start parameter names after first '('
    var start = str.indexOf("(") + 1;
  
    // End parameter names is just before last ')'
    var end = str.length - 1;
  
    var result = str.substring(start, end).split(", ");
  
    var params = [];
  
    result.forEach(element => {
          
        // Removing any default value
        element = element.replace(/=[\s\S]*/g, '').trim();
  
        if(element.length > 0)
            params.push(element);
    });
      
    return params;
}


// // Test sample functions
// var fun1 = function(){ };
// var fun12 = function(){ };

  
// function fun2(a = 5*6/3, // Comment
//     b){ };
  
// var fun3 = (a, /*
//     */
//     b, //commment
//     c) => /** */{ };
  
// console.log(`List of parameters of ${fun1.name}:`, getParams(fun1));
// console.log(`List of parameters of ${fun2.name}:`, getParams(fun2));
// console.log(`List of parameters of ${fun3.name}:`, getParams(fun3));

// console.log('---------------------');

// console.log(getParams(fun12).length===0);



module.exports.getParams = getParams;