(this["webpackJsonpuse-xircus-example"]=this["webpackJsonpuse-xircus-example"]||[]).push([[0],{10:function(t,e,n){},11:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),u=n(1),i=n.n(u),c=(n(10),n(2));function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t){return(s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,o,u=[],i=!0,c=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(u.push(r.value),!e||u.length!==e);i=!0);}catch(a){c=!0,o=a}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return u}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function b(t,e,n){t.state=l(l({},t.state),e),t.listeners.forEach((function(n){n.fds&&n.fds.length>0?Object.keys(e).filter((function(t){return n.fds.includes(t)})).length>0&&n.run(t.state):n.run(t.state)})),n&&n(t)}function m(t,e,n,r,o,u){var i=y(e.useState(o),2)[1],c=n?n(t.state):t.state,a=e.useMemo((function(){return r?r(t.actions):t.actions}),[r,t.actions]);return e.useEffect((function(){var e={oldState:{}};return e.id=(new Date).getTime(),e.fds=u||[],e.run=n?function(t){var r=n(t);r!==e.oldState&&(e.oldState=r,i(r))}:i,t.listeners.push(e),e.run(t.state),function(){t.listeners=t.listeners.filter((function(t){return t!==e}))}}),[]),[c,a]}var d=function(t,e,n,r){var o={state:e,listeners:[]};return o.setState=b.bind(null,o),o.actions=function t(e,n){var r={};return Object.keys(n).forEach((function(o){"function"===typeof n[o]&&(r[o]=n[o].bind(null,e)),"object"===s(n[o])&&(r[o]=t(e,n[o]))})),r}(o,n),r&&r(o),m.bind(null,o,t,null,null,e)},O=d(r,{username:"xircusdev"},{update:function(t){t.setState({username:"xircusteam"})}}),h=function(){var t=O(["username"]),e=Object(c.a)(t,2),n=e[0],r=e[1];return o.a.createElement("div",null,o.a.createElement("h1",null,n.username),o.a.createElement("button",{onClick:function(){return r.update()}},"Update"))};i.a.render(o.a.createElement(h,null),document.getElementById("root"))},3:function(t,e,n){t.exports=n(11)}},[[3,1,2]]]);
//# sourceMappingURL=main.f4517d45.chunk.js.map