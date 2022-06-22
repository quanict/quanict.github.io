const mdUtil = {

    cloneMethod: (obj, superObj) => {
        return Object.assign({}, obj, superObj);
    },

    appendMethod: function (obj) {
        Object.keys(obj).forEach((f) => {
            this[f] = obj[f];
        });
    },

    appendPrototype: function (obj, superObj) {
        if (typeof superObj === 'undefined') {
            superObj = this;
        }
        Object.keys(obj).forEach((f) => {
            superObj.prototype[f] = obj[f];
        });

    },

    /**
     * Get a random integer in the specified interval
     *
     * @return {Int} int Returns a randomly generated integer
     */
    rand: function (n, m) {
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    }
};