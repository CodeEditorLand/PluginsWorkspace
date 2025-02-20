if("__TAURI__"in window){var __TAURI_PLUGIN_FS__=function(t){"use strict";function e(t,e,n,i){if("function"==typeof e||!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)}function n(t,e,n,i,o){if("function"==typeof e||!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(t,n),n}var i,o,r,a;"function"==typeof SuppressedError&&SuppressedError;const s="__TAURI_TO_IPC_KEY__";class f{constructor(){this.__TAURI_CHANNEL_MARKER__=!0,i.set(this,(()=>{})),o.set(this,0),r.set(this,[]),this.id=function(t,e=!1){return window.__TAURI_INTERNALS__.transformCallback(t,e)}((({message:t,id:a})=>{if(a==e(this,o,"f"))for(e(this,i,"f").call(this,t),n(this,o,e(this,o,"f")+1);e(this,o,"f")in e(this,r,"f");){const t=e(this,r,"f")[e(this,o,"f")];e(this,i,"f").call(this,t),delete e(this,r,"f")[e(this,o,"f")],n(this,o,e(this,o,"f")+1)}else e(this,r,"f")[a]=t}))}set onmessage(t){n(this,i,t)}get onmessage(){return e(this,i,"f")}[(i=new WeakMap,o=new WeakMap,r=new WeakMap,s)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[s]()}}async function c(t,e={},n){return window.__TAURI_INTERNALS__.invoke(t,e,n)}class l{get rid(){return e(this,a,"f")}constructor(t){a.set(this,void 0),n(this,a,t)}async close(){return c("plugin:resources|close",{rid:this.rid})}}var u,p;function w(t){return{isFile:t.isFile,isDirectory:t.isDirectory,isSymlink:t.isSymlink,size:t.size,mtime:null!==t.mtime?new Date(t.mtime):null,atime:null!==t.atime?new Date(t.atime):null,birthtime:null!==t.birthtime?new Date(t.birthtime):null,readonly:t.readonly,fileAttributes:t.fileAttributes,dev:t.dev,ino:t.ino,mode:t.mode,nlink:t.nlink,uid:t.uid,gid:t.gid,rdev:t.rdev,blksize:t.blksize,blocks:t.blocks}}a=new WeakMap,t.BaseDirectory=void 0,(u=t.BaseDirectory||(t.BaseDirectory={}))[u.Audio=1]="Audio",u[u.Cache=2]="Cache",u[u.Config=3]="Config",u[u.Data=4]="Data",u[u.LocalData=5]="LocalData",u[u.Document=6]="Document",u[u.Download=7]="Download",u[u.Picture=8]="Picture",u[u.Public=9]="Public",u[u.Video=10]="Video",u[u.Resource=11]="Resource",u[u.Temp=12]="Temp",u[u.AppConfig=13]="AppConfig",u[u.AppData=14]="AppData",u[u.AppLocalData=15]="AppLocalData",u[u.AppCache=16]="AppCache",u[u.AppLog=17]="AppLog",u[u.Desktop=18]="Desktop",u[u.Executable=19]="Executable",u[u.Font=20]="Font",u[u.Home=21]="Home",u[u.Runtime=22]="Runtime",u[u.Template=23]="Template",t.SeekMode=void 0,(p=t.SeekMode||(t.SeekMode={}))[p.Start=0]="Start",p[p.Current=1]="Current",p[p.End=2]="End";class h extends l{async read(t){if(0===t.byteLength)return 0;const e=await c("plugin:fs|read",{rid:this.rid,len:t.byteLength}),n=function(t){const e=new Uint8ClampedArray(t),n=e.byteLength;let i=0;for(let t=0;t<n;t++)i*=256,i+=e[t];return i}(e.slice(-8)),i=e instanceof ArrayBuffer?new Uint8Array(e):e;return t.set(i.slice(0,i.length-8)),0===n?null:n}async seek(t,e){return await c("plugin:fs|seek",{rid:this.rid,offset:t,whence:e})}async stat(){return w(await c("plugin:fs|fstat",{rid:this.rid}))}async truncate(t){await c("plugin:fs|ftruncate",{rid:this.rid,len:t})}async write(t){return await c("plugin:fs|write",{rid:this.rid,data:t})}}async function d(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const n=await c("plugin:fs|open",{path:t instanceof URL?t.toString():t,options:e});return new h(n)}async function y(t){await c("plugin:fs|unwatch",{rid:t})}return t.FileHandle=h,t.copyFile=async function(t,e,n){if(t instanceof URL&&"file:"!==t.protocol||e instanceof URL&&"file:"!==e.protocol)throw new TypeError("Must be a file URL.");await c("plugin:fs|copy_file",{fromPath:t instanceof URL?t.toString():t,toPath:e instanceof URL?e.toString():e,options:n})},t.create=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const n=await c("plugin:fs|create",{path:t instanceof URL?t.toString():t,options:e});return new h(n)},t.exists=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");return await c("plugin:fs|exists",{path:t instanceof URL?t.toString():t,options:e})},t.lstat=async function(t,e){return w(await c("plugin:fs|lstat",{path:t instanceof URL?t.toString():t,options:e}))},t.mkdir=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");await c("plugin:fs|mkdir",{path:t instanceof URL?t.toString():t,options:e})},t.open=d,t.readDir=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");return await c("plugin:fs|read_dir",{path:t instanceof URL?t.toString():t,options:e})},t.readFile=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const n=await c("plugin:fs|read_file",{path:t instanceof URL?t.toString():t,options:e});return n instanceof ArrayBuffer?new Uint8Array(n):Uint8Array.from(n)},t.readTextFile=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const n=await c("plugin:fs|read_text_file",{path:t instanceof URL?t.toString():t,options:e}),i=n instanceof ArrayBuffer?n:Uint8Array.from(n);return(new TextDecoder).decode(i)},t.readTextFileLines=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const n=t instanceof URL?t.toString():t;return await Promise.resolve({path:n,rid:null,async next(){null===this.rid&&(this.rid=await c("plugin:fs|read_text_file_lines",{path:n,options:e}));const t=await c("plugin:fs|read_text_file_lines_next",{rid:this.rid}),i=t instanceof ArrayBuffer?new Uint8Array(t):Uint8Array.from(t),o=1===i[i.byteLength-1];if(o)return this.rid=null,{value:null,done:o};return{value:(new TextDecoder).decode(i.slice(0,i.byteLength)),done:o}},[Symbol.asyncIterator](){return this}})},t.remove=async function(t,e){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");await c("plugin:fs|remove",{path:t instanceof URL?t.toString():t,options:e})},t.rename=async function(t,e,n){if(t instanceof URL&&"file:"!==t.protocol||e instanceof URL&&"file:"!==e.protocol)throw new TypeError("Must be a file URL.");await c("plugin:fs|rename",{oldPath:t instanceof URL?t.toString():t,newPath:e instanceof URL?e.toString():e,options:n})},t.size=async function(t){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");return await c("plugin:fs|size",{path:t instanceof URL?t.toString():t})},t.stat=async function(t,e){return w(await c("plugin:fs|stat",{path:t instanceof URL?t.toString():t,options:e}))},t.truncate=async function(t,e,n){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");await c("plugin:fs|truncate",{path:t instanceof URL?t.toString():t,len:e,options:n})},t.watch=async function(t,e,n){const i={recursive:!1,delayMs:2e3,...n},o=Array.isArray(t)?t:[t];for(const t of o)if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const r=new f;r.onmessage=e;const a=await c("plugin:fs|watch",{paths:o.map((t=>t instanceof URL?t.toString():t)),options:i,onEvent:r});return()=>{y(a)}},t.watchImmediate=async function(t,e,n){const i={recursive:!1,...n,delayMs:null},o=Array.isArray(t)?t:[t];for(const t of o)if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const r=new f;r.onmessage=e;const a=await c("plugin:fs|watch",{paths:o.map((t=>t instanceof URL?t.toString():t)),options:i,onEvent:r});return()=>{y(a)}},t.writeFile=async function(t,e,n){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");if(e instanceof ReadableStream){const i=await d(t,n);for await(const t of e)await i.write(t);await i.close()}else await c("plugin:fs|write_file",e,{headers:{path:encodeURIComponent(t instanceof URL?t.toString():t),options:JSON.stringify(n)}})},t.writeTextFile=async function(t,e,n){if(t instanceof URL&&"file:"!==t.protocol)throw new TypeError("Must be a file URL.");const i=new TextEncoder;await c("plugin:fs|write_text_file",i.encode(e),{headers:{path:encodeURIComponent(t instanceof URL?t.toString():t),options:JSON.stringify(n)}})},t}({});Object.defineProperty(window.__TAURI__,"fs",{value:__TAURI_PLUGIN_FS__})}
