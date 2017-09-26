module.exports = function check(str, bracketsConfig) {
    if ( (str.length %2) != 0) {
         return false;
    }
    
    var brackets = {};
    var key = 1;        
    for (var i = 0; i < bracketsConfig.length; i++) {
        for (var j = 0; j < bracketsConfig[i].length; j++) {
            if (bracketsConfig[i][j] == bracketsConfig[i][j + 1]) {              
                brackets[bracketsConfig[i][j]] = {lab:0};
                j +=2;
                continue;
            }
            brackets[bracketsConfig[i][j]] = key;
            key++;
        }       
    }
   
    var stack = [];
    for (var i = 0; i < str.length; i++) {      
        if ((typeof brackets[str[i]]) == 'object') {
            if ( brackets[str[i]].lab === 0) {
                stack.push(str[i]);
                brackets[str[i]].lab = 1;
                continue;
            }           
            if (( brackets[str[i]].lab === 1) && (stack.length > 0) && (brackets[str[i]] == brackets[stack[stack.length - 1]])) {
                stack.pop();
                brackets[str[i]].lab = 0;
                continue;
            }
            
        }
        if ( brackets[str[i]] %2 != 0) {
            stack.push(str[i]);
            continue;
        }
        if (( brackets[str[i]] %2 == 0) && (stack.length > 0) && ((brackets[str[i]] - brackets[stack[stack.length - 1]]) == 1)) {
            stack.pop();
        }   
    }
    
    if (stack.length == 0) {
        return true
    } else {      
        return false;
    }
}
