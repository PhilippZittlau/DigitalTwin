import{c as g,m as p}from"./three.module-155196c6.js";import{M as k}from"./MeshBVH-176a521e.js";class x{constructor(r){this.name="WorkerBase",this.running=!1,this.worker=r,this.worker.onerror=e=>{throw e.message?new Error(`${this.name}: Could not create Web Worker with error "${e.message}"`):new Error(`${this.name}: Could not create Web Worker.`)}}runTask(){}generate(...r){if(this.running)throw new Error("GenerateMeshBVHWorker: Already running job.");if(this.worker===null)throw new Error("GenerateMeshBVHWorker: Worker has been disposed.");this.running=!0;const e=this.runTask(this.worker,...r);return e.finally(()=>{this.running=!1}),e}dispose(){this.worker.terminate(),this.worker=null}}function b(){return new Worker(""+new URL("generateMeshBVH.worker-95425733.js",import.meta.url).href)}class M extends x{constructor(){super(new b),this.name="GenerateMeshBVHWorker"}runTask(r,e,s={}){return new Promise((h,a)=>{if(e.getAttribute("position").isInterleavedBufferAttribute||e.index&&e.index.isInterleavedBufferAttribute)throw new Error("GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");r.onerror=n=>{a(new Error(`GenerateMeshBVHWorker: ${n.message}`))},r.onmessage=n=>{const{data:o}=n;if(o.error)a(new Error(o.error)),r.onmessage=null;else if(o.serialized){const{serialized:t,position:B}=o,l=k.deserialize(t,e,{setIndex:!1}),w=Object.assign({setBoundingBox:!0},s);if(e.attributes.position.array=B,t.index)if(e.index)e.index.array=t.index;else{const c=new g(t.index,1,!1);e.setIndex(c)}w.setBoundingBox&&(e.boundingBox=l.getBoundingBox(new p)),s.onProgress&&s.onProgress(o.progress),h(l),r.onmessage=null}else s.onProgress&&s.onProgress(o.progress)};const i=e.index?e.index.array:null,u=e.attributes.position.array,f=[u];i&&f.push(i),r.postMessage({index:i,position:u,options:{...s,onProgress:null,includedProgressCallback:!!s.onProgress,groups:[...e.groups]}},f.map(n=>n.buffer).filter(n=>typeof SharedArrayBuffer>"u"||!(n instanceof SharedArrayBuffer)))})}}export{M as GenerateMeshBVHWorker};
