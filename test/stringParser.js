function _traverse(obj, arr) {
    return obj.map((_, index)=>{
        return stringParser(arr, obj, index)
    })
}

/**
 *
 * @param symbol {string|array|object}
 * @param type {*}
 * @returns {string[]}
 * @private
 */
function _judgeType(symbol, type){
    if(type === Array){
        return symbol
    }else if(type === String){
        return symbol.split('.')
    }
    return symbol?.title.split('.')
}

function _hasProp(symbol, name){
    return Object.prototype.hasOwnProperty.call(symbol, name)
}

/**
 * Parse a string and get some values in an object like $t in vue-i18n
 * @param symbol {string|array|object}
 * @param res {array}
 * @param num {Number}
 * @returns {*}
 */
function stringParser(symbol, res, num = undefined) {
    const type = symbol.constructor
    const arr = _judgeType(symbol, type)
    const length = arr.length
    let temp = num === undefined ? res : res[num]
    if(type === Object && _hasProp(symbol, 'before')){
        const data = symbol.before.call(temp)
        if(data) temp = data
    }
	for(let i = 0; i < length; i++){
		if(arr[i] === '$'){
			temp = _traverse(temp, arr.slice(i + 1))
			break
		}
		temp = temp[arr[i]]
	}
    if(type === Object && _hasProp(symbol, 'action')){
        return symbol.action.call({result: temp})
    }
    return temp
}

module.exports = stringParser