!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).hanziWriter=t()}}(function(){return function(){return function t(e,r,n){function i(a,s){if(!r[a]){if(!e[a]){var h="function"==typeof require&&require;if(!s&&h)return h(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=r[a]={exports:{}};e[a][0].call(c.exports,function(t){return i(e[a][1][t]||t)},c,c.exports,t,e,r,n)}return r[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}}()({1:[function(t,e,r){e.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6)}([function(t,e,r){"use strict";(function(e){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var n=e.performance&&function(){return e.performance.now()}||function(){return Date.now()},i=e.requestAnimationFrame||function(t){return setTimeout(function(){return t(n())},1e3/60)},o=e.cancelAnimationFrame||clearTimeout,a=function(t){for(var e=Object(t),r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];return n.forEach(function(t){if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}),e},s=Object.assign||a;var h=0;t.exports={_assign:a,arrLast:function(t){return t[t.length-1]},assign:s,average:function(t){return t.reduce(function(t,e){return e+t},0)/t.length},callIfExists:function(t,e){return t&&t(e),e},cancelAnimationFrame:o,copyAndMergeDeep:function t(e,n){var i=s({},e);for(var o in n){var a=e[o],h=n[o];a!==h&&(a&&h&&"object"===(void 0===a?"undefined":r(a))&&"object"===(void 0===h?"undefined":r(h))&&!Array.isArray(h)?i[o]=t(a,h):i[o]=h)}return i},counter:function(){return++h},emptyFunc:function(){},inflate:function(t,e){for(var r=t.split("."),n={},i=n,o=0;o<r.length;o++){var a=o===r.length-1?e:{};i[r[o]]=a,i=a}return n},objRepeat:function(t,e){for(var r={},n=0;n<e;n++)r[n]=t;return r},performanceNow:n,requestAnimationFrame:i,timeout:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(e,r){setTimeout(e,t)})},trim:function(t){return t.replace(/^\s+/,"").replace(/\s+$/,"")}}}).call(e,r(3))},function(t,e,r){"use strict";(function(e){var n=r(2).round;function i(t){return e.document.createElementNS("http://www.w3.org/2000/svg",t)}function o(t,e,r){t.setAttributeNS(null,e,r)}function a(t,e){Object.keys(e).forEach(function(r){return o(t,r,e[r])})}function s(t,e){this.svg=t,this.defs=e}s.prototype.createSubCanvas=function(){var t=i("g");return this.svg.appendChild(t),new s(t,this.defs)},s.init=function(t){var r=void 0,n=t;"string"==typeof t&&(n=e.document.getElementById(t));var o=n.nodeName.toUpperCase();"SVG"===o||"G"===o?r=n:(r=i("svg"),n.appendChild(r)),a(r,{width:"100%",height:"100%"});var h=i("defs");return r.appendChild(h),new s(r,h)},t.exports={createElm:i,attrs:a,attr:o,Canvas:s,getPathString:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=n(t[0]),i=t.slice(1),o="M "+r.x+" "+r.y;return i.forEach(function(t){var e=n(t);o+=" L "+e.x+" "+e.y}),e&&(o+="Z"),o},removeElm:function(t){t&&t.parentNode.removeChild(t)}}}).call(e,r(3))},function(t,e,r){"use strict";var n=r(0),i=n.average,o=n.arrLast,a=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},s=function(t){return Math.sqrt(Math.pow(t.x,2)+Math.pow(t.y,2))},h=function(t,e){return s(a(t,e))},u=function(t,e,r){var n=a(e,t),i=r/s(n);return{x:e.x+i*n.x,y:e.y+i*n.y}},c=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.05,r=t.slice(0,1);return t.slice(1).forEach(function(t){var n=r[r.length-1],i=h(t,n);if(i>e)for(var o=Math.ceil(i/e),a=i/o,s=0;s<o;s++)r.push(u(t,n,-1*a*(s+1)));else r.push(t)}),r};t.exports={round:function(t){var e=10*(arguments.length>1&&void 0!==arguments[1]?arguments[1]:1);return{x:Math.round(e*t.x)/e,y:Math.round(e*t.y)/e}},equals:function(t,e){return t.x===e.x&&t.y===e.y},distance:h,frechetDist:function(t,e){for(var r=[],n=0;n<t.length;n++){r.push([]);for(var i=0;i<e.length;i++)r[n].push(-1)}return function n(i,o){return r[i][o]>-1?r[i][o]:(r[i][o]=0===i&&0===o?h(t[0],e[0]):i>0&&0===o?Math.max(n(i-1,0),h(t[i],e[0])):0===i&&o>0?Math.max(n(0,o-1),h(t[0],e[o])):i>0&&o>0?Math.max(Math.min(n(i-1,o),n(i-1,o-1),n(i,o-1)),h(t[i],e[o])):1/0,r[i][o])}(t.length-1,e.length-1)},length:function(t){var e=t[0];return t.slice(1).reduce(function(t,r){var n=h(r,e);return e=r,t+n},0)},rotate:function(t,e){return t.map(function(t){return{x:Math.cos(e)*t.x-Math.sin(e)*t.y,y:Math.sin(e)*t.x+Math.cos(e)*t.y}})},subtract:a,cosineSimilarity:function(t,e){return(t.x*e.x+t.y*e.y)/s(t)/s(e)},extendPointOnLine:u,filterParallelPoints:function(t){if(t.length<3)return t;var e=[t[0],t[1]];return t.slice(2).forEach(function(t,r){var n=e.length,i=a(t,e[n-1]),o=a(e[n-1],e[n-2]);i.y*o.x-i.x*o.y==0&&e.pop(),e.push(t)}),e},subdivideCurve:c,normalizeCurve:function(t){var e={x:i([t[0].x,o(t).x]),y:i([t[0].y,o(t).y])},r=t.map(function(t){return a(t,e)}),n=Math.sqrt(i([Math.pow(r[0].x,2)+Math.pow(r[0].y,2),Math.pow(o(r).x,2)+Math.pow(o(r).y,2)])),s=r.map(function(t){return{x:t.x/n,y:t.y/n}});return c(s)}}},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";var n=r(5),i=r(0).objRepeat,o=function(t,e,r){return[new n("character."+t+".strokes",i({opacity:1,displayPortion:1},e.strokes.length),{duration:r,force:!0})]},a=function(t,e,r){return[new n("character."+t+".opacity",0,{duration:r,force:!0})].concat(o(t,e,0))},s=function(t,e,r){var i,o,a,s=e.strokeNum,h=(e.getLength()+600)/(3*r);return[new n("character."+t,{opacity:1,strokes:(i={},o=s,a={displayPortion:0,opacity:1},o in i?Object.defineProperty(i,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[o]=a,i)}),new n("character."+t+".strokes."+s+".displayPortion",1,{duration:h})]},h=function(t,e,r,h,u){var c=a(t,e,r);return(c=c.concat(o(t,e,0))).push(new n("character."+t,{opacity:1,strokes:i({opacity:0},e.strokes.length)},{force:!0})),e.strokes.forEach(function(e,r){r>0&&c.push(new n.Pause(u)),c=c.concat(s(t,e,h))}),c};t.exports={showStrokes:o,showCharacter:function(t,e,r){return[new n("character."+t,{opacity:1,strokes:i({opacity:1,displayPortion:1},e.strokes.length)},{duration:r,force:!0})]},hideCharacter:a,animateCharacter:h,animateCharacterLoop:function(t,e,r,i,o,a){var s=h(t,e,r,i,o);return s.push(new n.Pause(a)),s},animateStroke:s,showStroke:function(t,e,r){return[new n("character."+t+".strokes."+e,{displayPortion:1,opacity:1},{duration:r,force:!0})]}}},function(t,e,r){"use strict";var n=r(0),i=n.inflate,o=n.performanceNow,a=n.requestAnimationFrame,s=n.cancelAnimationFrame;function h(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.scope=t,this._values=i(t,e),this._duration=r.duration||0,this._force=r.force,this._tickBound=this._tick.bind(this)}function u(t){this._duration=t}h.prototype.run=function(t){var e=this;return 0===this._duration&&t.updateState(this._values),0===this._duration||function t(e,r){for(var n in r)if(r.hasOwnProperty(n)){var i=r[n],o=e[n];if(i>=0){if(i!==o)return!1}else if(!t(o,i))return!1}return!0}(t.state,this._values)?Promise.resolve():(this._renderState=t,this._startState=t.state,this._startTime=o(),this._frameHandle=a(this._tickBound),new Promise(function(t){e._resolve=t}))},h.prototype._tick=function(t){var e,r=Math.min(1,(t-this._startTime)/this._duration);if(1===r)this._renderState.updateState(this._values),this._frameHandle=null,this.cancel(this._renderState);else{var n=(e=r,-Math.cos(e*Math.PI)/2+.5);this._renderState.updateState(function t(e,r,n){var i={};for(var o in r){var a=r[o],s=e[o];i[o]=a>=0?n*(a-s)+s:t(s,a,n)}return i}(this._startState,this._values,n)),this._frameHandle=a(this._tickBound)}},h.prototype.cancel=function(t){this._resolve&&this._resolve(),this._resolve=null,this._frameHandle&&s(this._frameHandle),this._frameHandle=null,this._force&&t.updateState(this._values)},u.prototype.run=function(){var t=this,e=new Promise(function(e){t._resolve=e});return this._timeout=setTimeout(function(){return t.cancel()},this._duration),e},u.prototype.cancel=function(){clearTimeout(this._timeout),this._resolve&&this._resolve(),this._resolve=!1},h.Pause=u,t.exports=h},function(t,e,r){"use strict";(function(e){var n=r(7),i=r(11),o=r(12),a=r(15),s=r(16),h=r(1),u=r(20),c=r(21),l=r(4),p=r(0),d=p.assign,f=p.callIfExists,_=p.trim,g={charDataLoader:u,onLoadCharDataError:null,onLoadCharDataSuccess:null,showOutline:!0,showCharacter:!0,width:null,height:null,padding:20,strokeAnimationSpeed:1,strokeFadeDuration:400,strokeHighlightDuration:200,strokeHighlightSpeed:2,delayBetweenStrokes:1e3,delayBetweenLoops:2e3,strokeColor:"#555",radicalColor:null,highlightColor:"#AAF",outlineColor:"#DDD",drawingColor:"#333",leniency:1,showHintAfterMisses:3,highlightOnComplete:!0,highlightCompleteColor:null,drawingFadeDuration:300,drawingWidth:4,strokeWidth:2,outlineWidth:2};function v(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this._canvas=h.Canvas.init(t),this._options=this._assignOptions(r),this._loadingManager=new c(this._options),this.setCharacter(e),this._setupListeners(),this._quiz=null}v.prototype.showCharacter=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._withData(function(){return t._renderState.run(l.showCharacter("main",t._character,"number"==typeof e.duration?e.duration:t._options.strokeFadeDuration)).then(function(t){return f(e.onComplete,t)})})},v.prototype.hideCharacter=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._withData(function(){return t._renderState.run(l.hideCharacter("main",t._character,"number"==typeof e.duration?e.duration:t._options.strokeFadeDuration)).then(function(t){return f(e.onComplete,t)})})},v.prototype.animateCharacter=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.cancelQuiz(),this._withData(function(){return t._renderState.run(l.animateCharacter("main",t._character,t._options.strokeFadeDuration,t._options.strokeAnimationSpeed,t._options.delayBetweenStrokes)).then(function(t){return f(e.onComplete,t)})})},v.prototype.loopCharacterAnimation=function(){var t=this;arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.cancelQuiz(),this._withData(function(){return t._renderState.run(l.animateCharacterLoop("main",t._character,t._options.strokeFadeDuration,t._options.strokeAnimationSpeed,t._options.delayBetweenStrokes,t._options.delayBetweenLoops),{loop:!0})})},v.prototype.showOutline=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._withData(function(){return t._renderState.run(l.showCharacter("outline",t._character,"number"==typeof e.duration?e.duration:t._options.strokeFadeDuration)).then(function(t){return f(e.onComplete,t)})})},v.prototype.hideOutline=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._withData(function(){return t._renderState.run(l.hideCharacter("outline",t._character,"number"==typeof e.duration?e.duration:t._options.strokeFadeDuration)).then(function(t){return f(e.onComplete,t)})})},v.prototype.quiz=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._withData(function(){t.cancelQuiz(),t._quiz=new s(t._character,t._renderState,t._positioner),t._quiz.startQuiz(d({},t._options,e))})},v.prototype.cancelQuiz=function(){this._quiz&&(this._quiz.cancel(),this._quiz=null)},v.prototype.setCharacter=function(t){var e=this;return this.cancelQuiz(),this._char=t,this._hanziWriterRenderer&&this._hanziWriterRenderer.destroy(),this._renderState&&this._renderState.cancelAll(),this._hanziWriterRenderer=null,this._withDataPromise=this._loadingManager.loadCharData(t).then(function(r){if(!e._loadingManager.loadingFailed){var s=new o;e._character=s.generateCharacter(t,r),e._positioner=new a(e._options),e._hanziWriterRenderer=new n(e._character,e._positioner),e._renderState=new i(e._character,e._options,function(t){e._hanziWriterRenderer.render(t)}),e._hanziWriterRenderer.mount(e._canvas,e._renderState.state),e._hanziWriterRenderer.render(e._renderState.state)}}),this._withDataPromise},v.prototype._assignOptions=function(t){var e=d({},g,t);return t.strokeAnimationDuration&&!t.strokeAnimationSpeed&&(e.strokeAnimationSpeed=500/e.strokeAnimationDuration),t.strokeHighlightDuration&&!t.strokeHighlightSpeed&&(e.strokeHighlightSpeed=500/e.strokeHighlightDuration),t.highlightCompleteColor||(e.highlightCompleteColor=e.highlightColor),this._fillWidthAndHeight(e)},v.prototype._fillWidthAndHeight=function(t){var e=d({},t);if(e.width&&!e.height)e.height=e.width;else if(e.height&&!e.width)e.width=e.height;else if(!e.width&&!e.height){var r=this._canvas.svg.getBoundingClientRect(),n=r.width,i=r.height,o=Math.min(n,i);e.width=o,e.height=o}return e},v.prototype._withData=function(t){var e=this;if(this._loadingManager.loadingFailed)throw Error("Failed to load character data. Call setCharacter and try again.");return this._withDataPromise.then(function(){if(!e._loadingManager.loadingFailed)return t()})},v.prototype._setupListeners=function(){var t=this;this._canvas.svg.addEventListener("mousedown",function(e){!t.isLoadingCharData&&t._quiz&&(e.preventDefault(),t._forwardToQuiz("startUserStroke",t._getMousePoint(e)))}),this._canvas.svg.addEventListener("touchstart",function(e){!t.isLoadingCharData&&t._quiz&&(e.preventDefault(),t._forwardToQuiz("startUserStroke",t._getTouchPoint(e)))}),this._canvas.svg.addEventListener("mousemove",function(e){!t.isLoadingCharData&&t._quiz&&(e.preventDefault(),t._forwardToQuiz("continueUserStroke",t._getMousePoint(e)))}),this._canvas.svg.addEventListener("touchmove",function(e){!t.isLoadingCharData&&t._quiz&&(e.preventDefault(),t._forwardToQuiz("continueUserStroke",t._getTouchPoint(e)))}),e.document.addEventListener("mouseup",function(){return t._forwardToQuiz("endUserStroke")}),e.document.addEventListener("touchend",function(){return t._forwardToQuiz("endUserStroke")})},v.prototype._forwardToQuiz=function(t){var e;if(this._quiz){for(var r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];(e=this._quiz)[t].apply(e,n)}},v.prototype._getMousePoint=function(t){var e=this._canvas.svg.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}},v.prototype._getTouchPoint=function(t){var e=this._canvas.svg.getBoundingClientRect();return{x:t.touches[0].clientX-e.left,y:t.touches[0].clientY-e.top}};var y=null,m=null;if(v.loadCharacterData=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=void 0;return r=y&&m===e?y:new c(d({},g,e)),y=r,m=e,r.loadCharData(t)},v.getScalingTransform=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=new a({width:t,height:e,padding:r});return{x:n.getXOffset(),y:n.getYOffset(),scale:n.getScale(),transform:_("\n      translate("+n.getXOffset()+", "+(n.getHeight()-n.getYOffset())+")\n      scale("+n.getScale()+", "+-1*n.getScale()+")\n    ").replace(/\s+/g," ")}},void 0!==e.window){var k=e.window.HanziWriter;v.noConflict=function(){return e.window.HanziWriter=k,v},e.window.HanziWriter=v}t.exports=v}).call(e,r(3))},function(t,e,r){"use strict";var n=r(8),i=r(10),o=r(0).assign,a=r(1);function s(t,e){this._character=t,this._positioner=e,this._mainCharRenderer=new n(t),this._outlineCharRenderer=new n(t),this._highlightCharRenderer=new n(t),this._userStrokeRenderers={}}s.prototype.mount=function(t){var e=t.createSubCanvas(),r=e.svg;a.attr(r,"transform","\n    translate("+this._positioner.getXOffset()+", "+(this._positioner.getHeight()-this._positioner.getYOffset())+")\n    scale("+this._positioner.getScale()+", "+-1*this._positioner.getScale()+")\n  "),this._outlineCharRenderer.mount(e),this._mainCharRenderer.mount(e),this._highlightCharRenderer.mount(e),this._positionedCanvas=e},s.prototype.render=function(t){var e=this;this._outlineCharRenderer.render(t.character.outline),this._mainCharRenderer.render(t.character.main),this._highlightCharRenderer.render(t.character.highlight);var r=t.userStrokes||{};Object.keys(this._userStrokeRenderers).forEach(function(t){r[t]||(e._userStrokeRenderers[t].destroy(),delete e._userStrokeRenderers[t])}),Object.keys(r).forEach(function(n){if(r[n]){var a=o({strokeWidth:t.options.drawingWidth,strokeColor:t.options.drawingColor},r[n]),s=e._userStrokeRenderers[n];s||((s=new i).mount(e._positionedCanvas,a),e._userStrokeRenderers[n]=s),s.render(a)}})},s.prototype.destroy=function(){a.removeElm(this._positionedCanvas.svg),this._positionedCanvas.defs.innerHTML=""},t.exports=s},function(t,e,r){"use strict";var n=r(9);function i(t){this._oldProps={},this.character=t,this.strokeRenderers=this.character.strokes.map(function(t){return new n(t)})}i.prototype.mount=function(t){var e=t.createSubCanvas();this._group=e.svg,this.strokeRenderers.forEach(function(t,r){t.mount(e)})},i.prototype.render=function(t){if(t!==this._oldProps){t.opacity!==this._oldProps.opacity&&(this._group.style.opacity=t.opacity,0===t.opacity?this._group.style.display="none":0===this._oldProps.opacity&&(this._group.style.display="initial"));for(var e=0;e<this.strokeRenderers.length;e++)this.strokeRenderers[e].render({strokeColor:t.strokeColor,radicalColor:t.radicalColor,opacity:t.strokes[e].opacity,displayPortion:t.strokes[e].displayPortion});this._oldProps=t}},t.exports=i},function(t,e,r){"use strict";var n=r(0).counter,i=r(1),o=r(2),a=o.extendPointOnLine,s=o.filterParallelPoints,h=200;function u(t){this._oldProps={},this._stroke=t,this._pathLength=t.getLength()+h/2}u.prototype.mount=function(t){this._animationPath=i.createElm("path"),this._clip=i.createElm("clipPath"),this._strokePath=i.createElm("path");var e="mask-"+n();i.attr(this._clip,"id",e),i.attr(this._strokePath,"d",this._stroke.path),this._animationPath.style.opacity=0,i.attr(this._animationPath,"clip-path","url(#"+e+")");var r=function(t,e){if(t.length<2)return t;var r=t[1],n=t[0],i=a(r,n,e),o=t.slice(1);return o.unshift(i),o}(s(this._stroke.points),h/2);return i.attr(this._animationPath,"d",i.getPathString(r)),i.attrs(this._animationPath,{stroke:"#FFFFFF","stroke-width":h,fill:"none","stroke-linecap":"round","stroke-linejoin":"miter","stroke-dasharray":this._pathLength+","+this._pathLength}),this._clip.appendChild(this._strokePath),t.defs.appendChild(this._clip),t.svg.appendChild(this._animationPath),this},u.prototype.render=function(t){if(t!==this._oldProps){t.displayPortion!==this._oldProps.displayPortion&&(this._animationPath.style.strokeDashoffset=this._getStrokeDashoffset(t.displayPortion));var e=this._getColor(t);e!==this._getColor(this._oldProps)&&i.attrs(this._animationPath,{stroke:e}),t.opacity!==this._oldProps.opacity&&(this._animationPath.style.opacity=t.opacity),this._oldProps=t}},u.prototype._getStrokeDashoffset=function(t){return.999*this._pathLength*(1-t)},u.prototype._getColor=function(t){var e=t.strokeColor,r=t.radicalColor;return r&&this._stroke.isInRadical?r:e},t.exports=u},function(t,e,r){"use strict";var n=r(1);function i(){this._oldProps={}}i.prototype.mount=function(t){this._path=n.createElm("path"),t.svg.appendChild(this._path)},i.prototype.render=function(t){t!==this._oldProps&&(t.strokeColor===this._oldProps.strokeColor&&t.strokeWidth===this._oldProps.strokeWidth||n.attrs(this._path,{fill:"none",stroke:t.strokeColor,"stroke-width":t.strokeWidth,"stroke-linecap":"round","stroke-linejoin":"round"}),t.opacity!==this._oldProps.opacity&&n.attr(this._path,"opacity",t.opacity),t.points!==this._oldProps.points&&n.attr(this._path,"d",n.getPathString(t.points)),this._oldProps=t)},i.prototype.destroy=function(){n.removeElm(this._path)},t.exports=i},function(t,e,r){"use strict";var n=r(0).copyAndMergeDeep;function i(t,e,r){this._onStateChange=r,this._mutationChains=[],this.state={options:{drawingFadeDuration:e.drawingFadeDuration,drawingWidth:e.drawingWidth,drawingColor:e.drawingColor},character:{main:{strokeColor:e.strokeColor,radicalColor:e.radicalColor,opacity:e.showCharacter?1:0,strokes:{}},outline:{strokeColor:e.outlineColor,opacity:e.showOutline?1:0,strokes:{}},highlight:{strokeColor:e.highlightColor,opacity:1,strokes:{}}},userStrokes:null};for(var n=0;n<t.strokes.length;n++)this.state.character.main.strokes[n]={opacity:1,displayPortion:1},this.state.character.outline.strokes[n]={opacity:1,displayPortion:1},this.state.character.highlight.strokes[n]={opacity:0,displayPortion:1}}i.prototype.updateState=function(t){var e=n(this.state,t);this._onStateChange(e,this.state),this.state=e},i.prototype.run=function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.map(function(t){return t.scope}).filter(function(t){return t});return this.cancelMutations(n),new Promise(function(i){var o={_isActive:!0,_index:0,_resolve:i,_mutations:t,_loop:r.loop,_scopes:n};e._mutationChains.push(o),e._run(o)})},i.prototype._run=function(t){var e=this;if(t._isActive){var r=t._mutations;if(t._index>=r.length){if(!t._loop)return t._isActive=!1,this._mutationChains=this._mutationChains.filter(function(e){return e!==t}),void t._resolve({canceled:!1});t._index=0}t._mutations[t._index].run(this).then(function(){t._isActive&&(t._index++,e._run(t))})}},i.prototype.cancelMutations=function(t){var e=this;this._mutationChains.forEach(function(r){r._scopes.forEach(function(n){t.forEach(function(t){(n.indexOf(t)>=0||t.indexOf(n)>=0)&&e._cancelMutationChain(r)})})})},i.prototype.cancelAll=function(){this.cancelMutations([""])},i.prototype._cancelMutationChain=function(t){t._isActive=!1;for(var e=t._index;e<t._mutations.length;e++)t._mutations[e].cancel(this);t._resolve&&t._resolve({canceled:!0}),this._mutationChains=this._mutationChains.filter(function(e){return e!==t})},t.exports=i},function(t,e,r){"use strict";var n=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){i=!0,o=t}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=r(13),o=r(14);function a(){}a.prototype.generateCharacter=function(t,e){var r=this.generateStrokes(e);return new o(t,r)},a.prototype.generateStrokes=function(t){return t.strokes.map(function(e,r){var o,a=t.medians[r].map(function(t){var e=n(t,2);return{x:e[0],y:e[1]}});return new i(e,a,r,(o=r,t.radStrokes&&t.radStrokes.indexOf(o)>=0))})},t.exports=a},function(t,e,r){"use strict";var n=r(2),i=n.subtract,o=n.distance,a=n.length;function s(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.path=t,this.points=e,this.strokeNum=r,this.isInRadical=n}s.prototype.getStartingPoint=function(){return this.points[0]},s.prototype.getEndingPoint=function(){return this.points[this.points.length-1]},s.prototype.getLength=function(){return a(this.points)},s.prototype.getVectors=function(){var t=this.points[0];return this.points.slice(1).map(function(e){var r=i(e,t);return t=e,r})},s.prototype.getDistance=function(t){var e=this.points.map(function(e){return o(e,t)});return Math.min.apply(Math,e)},s.prototype.getAverageDistance=function(t){var e=this;return t.reduce(function(t,r){return t+e.getDistance(r)},0)/t.length},t.exports=s},function(t,e,r){"use strict";t.exports=function(t,e){this.symbol=t,this.strokes=e}},function(t,e,r){"use strict";var n=[{x:0,y:-124},{x:1024,y:900}];function i(t){this._options=t,this._calculateScaleAndOffset()}i.prototype.convertExternalPoint=function(t){return{x:(t.x-this._xOffset)/this._scale,y:(this.getHeight()-this._yOffset-t.y)/this._scale}},i.prototype.getXOffset=function(){return this._xOffset},i.prototype.getYOffset=function(){return this._yOffset},i.prototype.getScale=function(){return this._scale},i.prototype.getHeight=function(){return this._options.height},i.prototype._calculateScaleAndOffset=function(){var t=n,e=t[1].x-t[0].x,r=t[1].y-t[0].y,i=this._options.width-2*this._options.padding,o=this._options.height-2*this._options.padding,a=i/e,s=o/r;this._scale=Math.min(a,s);var h=this._options.padding+(i-this._scale*e)/2,u=this._options.padding+(o-this._scale*r)/2;this._xOffset=-1*t[0].x*this._scale+h,this._yOffset=-1*t[0].y*this._scale+u},t.exports=i},function(t,e,r){"use strict";var n=r(17),i=r(18),o=r(0),a=o.callIfExists,s=o.counter,h=r(19),u=r(1),c=r(2),l=r(4),p=function(t){return{pathString:u.getPathString(t.externalPoints),points:t.points.map(function(t){return c.round(t)})}};function d(t,e,r){this._character=t,this._renderState=e,this._isActive=!1,this._positioner=r}d.prototype.startQuiz=function(t){this._isActive=!0,this._options=t,this._currentStrokeIndex=0,this._numRecentMistakes=0,this._totalMistakes=0,this._drawnStrokes=[],this._renderState.run(h.startQuiz(this._character,t.strokeFadeDuration))},d.prototype.startUserStroke=function(t){var e=this._positioner.convertExternalPoint(t);if(!this._isActive)return null;if(this._userStroke)return this.endUserStroke();var r=s();this._userStroke=new i(r,e,t),this._renderState.run(h.startUserStroke(r,e))},d.prototype.continueUserStroke=function(t){if(this._userStroke){var e=this._positioner.convertExternalPoint(t);this._userStroke.appendPoint(e,t);var r=this._userStroke.points.slice(0);this._renderState.run(h.updateUserStroke(this._userStroke.id,r))}},d.prototype.endUserStroke=function(){if(this._userStroke)if(this._renderState.run(h.removeUserStroke(this._userStroke.id,this._options.drawingFadeDuration)),1!==this._userStroke.points.length){var t=this._getCurrentStroke(),e=this._renderState.state.character.outline.opacity>0;n(this._userStroke,this._character,this._currentStrokeIndex,{isOutlineVisible:e,leniency:this._options.leniency})?this._handleSuccess(t):(this._handleFailure(),this._numRecentMistakes>=this._options.showHintAfterMisses&&this._renderState.run(h.highlightStroke(t,this._options.highlightColor,this._options.strokeHighlightSpeed))),this._userStroke=null}else this._userStroke=null},d.prototype.cancel=function(){this._isActive=!1,this._userStroke&&this._renderState.run(h.removeUserStroke(this._userStroke.id,this._options.drawingFadeDuration))},d.prototype._handleSuccess=function(t){a(this._options.onCorrectStroke,{character:this._character.symbol,strokeNum:this._currentStrokeIndex,mistakesOnStroke:this._numRecentMistakes,totalMistakes:this._totalMistakes,strokesRemaining:this._character.strokes.length-this._currentStrokeIndex-1,drawnPath:p(this._userStroke)});var e=l.showStroke("main",this._currentStrokeIndex,this._options.strokeFadeDuration);this._currentStrokeIndex+=1,this._numRecentMistakes=0,this._currentStrokeIndex===this._character.strokes.length&&(this._isActive=!1,a(this._options.onComplete,{character:this._character.symbol,totalMistakes:this._totalMistakes}),this._options.highlightOnComplete&&(e=e.concat(h.highlightCompleteChar(this._character,this._options.highlightCompleteColor,2*this._options.strokeHighlightDuration)))),this._renderState.run(e)},d.prototype._handleFailure=function(){this._numRecentMistakes+=1,this._totalMistakes+=1,a(this._options.onMistake,{character:this._character.symbol,strokeNum:this._currentStrokeIndex,mistakesOnStroke:this._numRecentMistakes,totalMistakes:this._totalMistakes,strokesRemaining:this._character.strokes.length-this._currentStrokeIndex,drawnPath:p(this._userStroke)})},d.prototype._getCurrentStroke=function(){return this._character.strokes[this._currentStrokeIndex]},t.exports=d},function(t,e,r){"use strict";var n=r(0).average,i=r(2),o=i.cosineSimilarity,a=i.equals,s=i.frechetDist,h=i.distance,u=i.subtract,c=i.normalizeCurve,l=i.rotate,p=i.length,d=function(t,e){var r=function(t){var e=[],r=t[0];return t.slice(1).forEach(function(t){e.push(u(t,r)),r=t}),e}(t),i=e.getVectors(),a=r.map(function(t){var e=i.map(function(e){return o(e,t)});return Math.max.apply(Math,e)});return n(a)>0},f=[Math.PI/16,Math.PI/32,0,-1*Math.PI/32,-1*Math.PI/16],_=function(t,e,r){var n=r.leniency,i=void 0===n?1:n,o=r.isOutlineVisible,a=void 0!==o&&o,u=e.getAverageDistance(t),_=u<=350*(a||e.strokeNum>0?.5:1)*i;if(!_)return{isMatch:!1,avgDist:u};var g=function(t,e,r){var n=h(e.getStartingPoint(),t[0]),i=h(e.getEndingPoint(),t[t.length-1]);return n<=250*r&&i<=250*r}(t,e,i),v=d(t,e),y=function(t,e,r){var n=c(t,2),i=c(e,2),o=1/0;return f.forEach(function(t){var e=s(n,l(i,t));e<o&&(o=e)}),o<=.75*r}(t,e.points,i),m=function(t,e,r){return r*(p(t)+25)/(e.getLength()+25)>=.35}(t,e,i);return{isMatch:_&&g&&v&&y&&m,avgDist:u}};t.exports=function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=function(t){if(t.length<2)return t;var e=[t[0]];return t.slice(1).forEach(function(t){a(t,e[e.length-1])||e.push(t)}),e}(t.points);if(i.length<2)return null;var o=_(i,e.strokes[r],n);if(!o.isMatch)return!1;for(var s=e.strokes.slice(r+1),h=0;h<s.length;h++){var u=_(i,s[h],n);if(u.isMatch&&u.avgDist<o.avgDist)return!1}return!0}},function(t,e,r){"use strict";function n(t,e,r){this.id=t,this.points=[e],this.externalPoints=[r]}n.prototype.appendPoint=function(t,e){this.points.push(t),this.externalPoints.push(e)},t.exports=n},function(t,e,r){"use strict";var n=r(5),i=r(4),o=r(0).objRepeat;t.exports={highlightCompleteChar:function(t,e,r){return[new n("character.highlight.strokeColor",e)].concat(i.hideCharacter("highlight",t)).concat(i.showCharacter("highlight",t,r/2)).concat(i.hideCharacter("highlight",t,r/2))},highlightStroke:function(t,e,r){var i,o,a,s=t.strokeNum,h=(t.getLength()+600)/(3*r);return[new n("character.highlight.strokeColor",e),new n("character.highlight",{opacity:1,strokes:(i={},o=s,a={displayPortion:0,opacity:0},o in i?Object.defineProperty(i,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[o]=a,i)}),new n("character.highlight.strokes."+s,{displayPortion:1,opacity:1},{duration:h}),new n("character.highlight.strokes."+s+".opacity",0,{duration:h})]},startQuiz:function(t,e){return i.hideCharacter("main",t,e).concat([new n("character.highlight",{opacity:1,strokes:o({opacity:0},t.strokes.length)},{force:!0}),new n("character.main",{opacity:1,strokes:o({opacity:0},t.strokes.length)},{force:!0})])},startUserStroke:function(t,e){return[new n("quiz.activeUserStrokeId",t,{force:!0}),new n("userStrokes."+t,{points:[e],opacity:1},{force:!0})]},updateUserStroke:function(t,e){return[new n("userStrokes."+t+".points",e,{force:!0})]},removeUserStroke:function(t,e){return[new n("userStrokes."+t+".opacity",0,{duration:e}),new n("userStrokes."+t,null,{force:!0})]}}},function(t,e,r){"use strict";(function(e){t.exports=function(t,r,n){var i=new e.XMLHttpRequest;i.overrideMimeType&&i.overrideMimeType("application/json"),i.open("GET",function(t){return"https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/"+t+".json"}(t),!0),i.onerror=function(t){n(i,t)},i.onreadystatechange=function(){4===i.readyState&&(200===i.status?r(JSON.parse(i.responseText)):0!==i.status&&n&&n(i))},i.send(null)}}).call(e,r(3))},function(t,e,r){"use strict";var n=r(0).callIfExists;function i(t){this._loadCounter=0,this._options=t,this._isLoading=!1,this._loadingPromise=null,this.loadingFailed=!1}i.prototype._debouncedLoad=function(t,e){var r=this,n=function(t){e===r._loadCounter&&r._resolve(t)},i=this._options.charDataLoader(t,n,function(t){e===r._loadCounter&&r._reject(t)});i&&n(i)},i.prototype._setupLoadingPromise=function(){var t=this;this._loadingPromise=new Promise(function(e,r){t._resolve=e,t._reject=r}).then(function(e){return t._isLoading=!1,n(t._options.onLoadCharDataSuccess,e),e},function(e){if(t._isLoading=!1,t.loadingFailed=!0,n(t._options.onLoadCharDataError,e),!t._options.onLoadCharDataError){if(e instanceof Error)throw e;var r=new Error("Failed to load char data for "+t._loadingChar);throw r.reason=e,r}})},i.prototype.loadCharData=function(t){return this._loadingChar=t,this._isLoading||this._setupLoadingPromise(),this.loadingFailed=!1,this._isLoading=!0,this._loadCounter++,this._debouncedLoad(t,this._loadCounter),this._loadingPromise},t.exports=i}])},{}]},{},[1])(1)});