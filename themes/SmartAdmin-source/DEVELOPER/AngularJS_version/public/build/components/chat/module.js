define(["angular","angular-couch-potato","angular-sanitize"],function(a,b){"use strict";var c=a.module("app.chat",["ngSanitize"]);return b.configureApp(c),c.run(["$couchPotato","$templateCache",function(a,b){c.lazy=a,b.put("template/popover/popover.html",'<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind-html="title | unsafe" ng-show="title"></h3>\n      <div class="popover-content"ng-bind-html="content | unsafe"></div>\n  </div>\n</div>\n')}]).filter("unsafe",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),c});