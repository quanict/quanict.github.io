define(["auth/module"],function(a){"use strict";return a.registerFactory("User",["$http","$q",function(a,b){var c=b.defer(),d={initialized:c.promise,username:void 0,picture:void 0};return a.get("api/user.json").then(function(a){d.username=a.data.username,d.picture=a.data.picture,c.resolve(d)}),d}])});