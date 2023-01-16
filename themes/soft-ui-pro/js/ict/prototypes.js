String.prototype.format = function() {
    return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};

String.prototype.is_url = function(){
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if(!regex.test(this)) {
        console.warn("return false");
        return false;
    } else {
        console.warn("return true");
        return true;
    }
};

String.prototype.is_not_url = function(){
    return !this.is_url();
};
