void function(root){

    var isObject = function(v){ return v !== null && typeof v === 'object' }

    var unpackOne = function(o, path){
        if ( o == null ) return
        else             return o[path]
    }

    var delve = function(o, path){
        return path.split('.').reduce(unpackOne, o)
    }

    delve.has = function(o, path){
        if ( delve(o, path) !== undefined ) return true

        var parts = path.split('.')
        var unpacked = delve(o, parts.slice(0, -1).join('.'))
        var last = parts.slice(-1)

        if ( isObject(unpacked) ) return last in unpacked
        else                      return false
    }

    if ( typeof module !== 'undefined' && delve(module, 'exports') ) module.exports = delve
    else if ( typeof define === 'function' && delve(define, 'amd') ) define(function(){ return delve })
    else                                                             root.delve = delve

}(this)
