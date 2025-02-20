if("__TAURI__"in window){var __TAURI_PLUGIN_SHELL__=function(e){"use strict";function t(e,t,s,i){if("function"==typeof t||!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===s?i:"a"===s?i.call(e):i?i.value:t.get(e)}function s(e,t,s,i,n){if("function"==typeof t||!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(e,s),s}var i,n,r;"function"==typeof SuppressedError&&SuppressedError;const o="__TAURI_TO_IPC_KEY__";class a{constructor(){this.__TAURI_CHANNEL_MARKER__=!0,i.set(this,(()=>{})),n.set(this,0),r.set(this,[]),this.id=function(e,t=!1){return window.__TAURI_INTERNALS__.transformCallback(e,t)}((({message:e,id:o})=>{if(o==t(this,n,"f"))for(t(this,i,"f").call(this,e),s(this,n,t(this,n,"f")+1);t(this,n,"f")in t(this,r,"f");){const e=t(this,r,"f")[t(this,n,"f")];t(this,i,"f").call(this,e),delete t(this,r,"f")[t(this,n,"f")],s(this,n,t(this,n,"f")+1)}else t(this,r,"f")[o]=e}))}set onmessage(e){s(this,i,e)}get onmessage(){return t(this,i,"f")}[(i=new WeakMap,n=new WeakMap,r=new WeakMap,o)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[o]()}}async function h(e,t={},s){return window.__TAURI_INTERNALS__.invoke(e,t,s)}class c{constructor(){this.eventListeners=Object.create(null)}addListener(e,t){return this.on(e,t)}removeListener(e,t){return this.off(e,t)}on(e,t){return e in this.eventListeners?this.eventListeners[e].push(t):this.eventListeners[e]=[t],this}once(e,t){const s=i=>{this.removeListener(e,s),t(i)};return this.addListener(e,s)}off(e,t){return e in this.eventListeners&&(this.eventListeners[e]=this.eventListeners[e].filter((e=>e!==t))),this}removeAllListeners(e){return e?delete this.eventListeners[e]:this.eventListeners=Object.create(null),this}emit(e,t){if(e in this.eventListeners){const s=this.eventListeners[e];for(const e of s)e(t);return!0}return!1}listenerCount(e){return e in this.eventListeners?this.eventListeners[e].length:0}prependListener(e,t){return e in this.eventListeners?this.eventListeners[e].unshift(t):this.eventListeners[e]=[t],this}prependOnceListener(e,t){const s=i=>{this.removeListener(e,s),t(i)};return this.prependListener(e,s)}}class l{constructor(e){this.pid=e}async write(e){await h("plugin:shell|stdin_write",{pid:this.pid,buffer:e})}async kill(){await h("plugin:shell|kill",{cmd:"killChild",pid:this.pid})}}class u extends c{constructor(e,t=[],s){super(),this.stdout=new c,this.stderr=new c,this.program=e,this.args="string"==typeof t?[t]:t,this.options=s??{}}static create(e,t=[],s){return new u(e,t,s)}static sidecar(e,t=[],s){const i=new u(e,t,s);return i.options.sidecar=!0,i}async spawn(){const e=this.program,t=this.args,s=this.options;"object"==typeof t&&Object.freeze(t);const i=new a;return i.onmessage=e=>{switch(e.event){case"Error":this.emit("error",e.payload);break;case"Terminated":this.emit("close",e.payload);break;case"Stdout":this.stdout.emit("data",e.payload);break;case"Stderr":this.stderr.emit("data",e.payload)}},await h("plugin:shell|spawn",{program:e,args:t,options:s,onEvent:i}).then((e=>new l(e)))}async execute(){const e=this.program,t=this.args,s=this.options;return"object"==typeof t&&Object.freeze(t),await h("plugin:shell|execute",{program:e,args:t,options:s})}}return e.Child=l,e.Command=u,e.EventEmitter=c,e.open=async function(e,t){await h("plugin:shell|open",{path:e,with:t})},e}({});Object.defineProperty(window.__TAURI__,"shell",{value:__TAURI_PLUGIN_SHELL__})}
