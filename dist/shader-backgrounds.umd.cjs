(function(S,E){typeof exports=="object"&&typeof module<"u"?E(exports):typeof define=="function"&&define.amd?define(["exports"],E):(S=typeof globalThis<"u"?globalThis:S||self,E(S.ShaderBackgrounds={}))})(this,(function(S){"use strict";var Ot=S=>{throw TypeError(S)};var st=(S,E,k)=>E.has(S)||Ot("Cannot "+k);var V=(S,E,k)=>(st(S,E,"read from private field"),k?k.call(S):E.get(S)),rt=(S,E,k)=>E.has(S)?Ot("Cannot add the same private member more than once"):E instanceof WeakSet?E.add(S):E.set(S,k),nt=(S,E,k,U)=>(st(S,E,"write to private field"),U?U.call(S,k):E.set(S,k),k),R=(S,E,k)=>(st(S,E,"access private method"),k);var X,A,D,$,kt,at,W,Gt,Dt;function E(i){let t=i[0],e=i[1],s=i[2];return Math.sqrt(t*t+e*e+s*s)}function k(i,t){return i[0]=t[0],i[1]=t[1],i[2]=t[2],i}function U(i,t,e,s){return i[0]=t,i[1]=e,i[2]=s,i}function lt(i,t,e){return i[0]=t[0]+e[0],i[1]=t[1]+e[1],i[2]=t[2]+e[2],i}function ht(i,t,e){return i[0]=t[0]-e[0],i[1]=t[1]-e[1],i[2]=t[2]-e[2],i}function Pt(i,t,e){return i[0]=t[0]*e[0],i[1]=t[1]*e[1],i[2]=t[2]*e[2],i}function Xt(i,t,e){return i[0]=t[0]/e[0],i[1]=t[1]/e[1],i[2]=t[2]/e[2],i}function j(i,t,e){return i[0]=t[0]*e,i[1]=t[1]*e,i[2]=t[2]*e,i}function qt(i,t){let e=t[0]-i[0],s=t[1]-i[1],r=t[2]-i[2];return Math.sqrt(e*e+s*s+r*r)}function Nt(i,t){let e=t[0]-i[0],s=t[1]-i[1],r=t[2]-i[2];return e*e+s*s+r*r}function ot(i){let t=i[0],e=i[1],s=i[2];return t*t+e*e+s*s}function $t(i,t){return i[0]=-t[0],i[1]=-t[1],i[2]=-t[2],i}function Ut(i,t){return i[0]=1/t[0],i[1]=1/t[1],i[2]=1/t[2],i}function Z(i,t){let e=t[0],s=t[1],r=t[2],n=e*e+s*s+r*r;return n>0&&(n=1/Math.sqrt(n)),i[0]=t[0]*n,i[1]=t[1]*n,i[2]=t[2]*n,i}function ct(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function ut(i,t,e){let s=t[0],r=t[1],n=t[2],a=e[0],l=e[1],h=e[2];return i[0]=r*h-n*l,i[1]=n*a-s*h,i[2]=s*l-r*a,i}function Yt(i,t,e,s){let r=t[0],n=t[1],a=t[2];return i[0]=r+s*(e[0]-r),i[1]=n+s*(e[1]-n),i[2]=a+s*(e[2]-a),i}function Vt(i,t,e,s,r){const n=Math.exp(-s*r);let a=t[0],l=t[1],h=t[2];return i[0]=e[0]+(a-e[0])*n,i[1]=e[1]+(l-e[1])*n,i[2]=e[2]+(h-e[2])*n,i}function Wt(i,t,e){let s=t[0],r=t[1],n=t[2],a=e[3]*s+e[7]*r+e[11]*n+e[15];return a=a||1,i[0]=(e[0]*s+e[4]*r+e[8]*n+e[12])/a,i[1]=(e[1]*s+e[5]*r+e[9]*n+e[13])/a,i[2]=(e[2]*s+e[6]*r+e[10]*n+e[14])/a,i}function jt(i,t,e){let s=t[0],r=t[1],n=t[2],a=e[3]*s+e[7]*r+e[11]*n+e[15];return a=a||1,i[0]=(e[0]*s+e[4]*r+e[8]*n)/a,i[1]=(e[1]*s+e[5]*r+e[9]*n)/a,i[2]=(e[2]*s+e[6]*r+e[10]*n)/a,i}function Zt(i,t,e){let s=t[0],r=t[1],n=t[2];return i[0]=s*e[0]+r*e[3]+n*e[6],i[1]=s*e[1]+r*e[4]+n*e[7],i[2]=s*e[2]+r*e[5]+n*e[8],i}function Ht(i,t,e){let s=t[0],r=t[1],n=t[2],a=e[0],l=e[1],h=e[2],o=e[3],c=l*n-h*r,u=h*s-a*n,f=a*r-l*s,d=l*f-h*u,g=h*c-a*f,p=a*u-l*c,m=o*2;return c*=m,u*=m,f*=m,d*=2,g*=2,p*=2,i[0]=s+c+d,i[1]=r+u+g,i[2]=n+f+p,i}const Qt=(function(){const i=[0,0,0],t=[0,0,0];return function(e,s){k(i,e),k(t,s),Z(i,i),Z(t,t);let r=ct(i,t);return r>1?0:r<-1?Math.PI:Math.acos(r)}})();function Jt(i,t){return i[0]===t[0]&&i[1]===t[1]&&i[2]===t[2]}class P extends Array{constructor(t=0,e=t,s=t){return super(t,e,s),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set(t,e=t,s=t){return t.length?this.copy(t):(U(this,t,e,s),this)}copy(t){return k(this,t),this}add(t,e){return e?lt(this,t,e):lt(this,this,t),this}sub(t,e){return e?ht(this,t,e):ht(this,this,t),this}multiply(t){return t.length?Pt(this,this,t):j(this,this,t),this}divide(t){return t.length?Xt(this,this,t):j(this,this,1/t),this}inverse(t=this){return Ut(this,t),this}len(){return E(this)}distance(t){return t?qt(this,t):E(this)}squaredLen(){return ot(this)}squaredDistance(t){return t?Nt(this,t):ot(this)}negate(t=this){return $t(this,t),this}cross(t,e){return e?ut(this,t,e):ut(this,this,t),this}scale(t){return j(this,this,t),this}normalize(){return Z(this,this),this}dot(t){return ct(this,t)}equals(t){return Jt(this,t)}applyMatrix3(t){return Zt(this,this,t),this}applyMatrix4(t){return Wt(this,this,t),this}scaleRotateMatrix4(t){return jt(this,this,t),this}applyQuaternion(t){return Ht(this,this,t),this}angle(t){return Qt(this,t)}lerp(t,e){return Yt(this,this,t,e),this}smoothLerp(t,e,s){return Vt(this,this,t,e,s),this}clone(){return new P(this[0],this[1],this[2])}fromArray(t,e=0){return this[0]=t[e],this[1]=t[e+1],this[2]=t[e+2],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t}transformDirection(t){const e=this[0],s=this[1],r=this[2];return this[0]=t[0]*e+t[4]*s+t[8]*r,this[1]=t[1]*e+t[5]*s+t[9]*r,this[2]=t[2]*e+t[6]*s+t[10]*r,this.normalize()}}const ft=new P;let Kt=1,te=1,dt=!1;class ee{constructor(t,e={}){t.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=t,this.attributes=e,this.id=Kt++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let s in e)this.addAttribute(s,e[s])}addAttribute(t,e){if(this.attributes[t]=e,e.id=te++,e.size=e.size||1,e.type=e.type||(e.data.constructor===Float32Array?this.gl.FLOAT:e.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),e.target=t==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,e.normalized=e.normalized||!1,e.stride=e.stride||0,e.offset=e.offset||0,e.count=e.count||(e.stride?e.data.byteLength/e.stride:e.data.length/e.size),e.divisor=e.instanced||0,e.needsUpdate=!1,e.usage=e.usage||this.gl.STATIC_DRAW,e.buffer||this.updateAttribute(e),e.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==e.count*e.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,e.count*e.divisor);this.instancedCount=e.count*e.divisor}else t==="index"?this.drawRange.count=e.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,e.count))}updateAttribute(t){const e=!t.buffer;e&&(t.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==t.buffer&&(this.gl.bindBuffer(t.target,t.buffer),this.glState.boundBuffer=t.buffer),e?this.gl.bufferData(t.target,t.data,t.usage):this.gl.bufferSubData(t.target,0,t.data),t.needsUpdate=!1}setIndex(t){this.addAttribute("index",t)}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}setInstancedCount(t){this.instancedCount=t}createVAO(t){this.VAOs[t.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.bindAttributes(t)}bindAttributes(t){t.attributeLocations.forEach((e,{name:s,type:r})=>{if(!this.attributes[s]){console.warn(`active attribute ${s} not being supplied`);return}const n=this.attributes[s];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let a=1;r===35674&&(a=2),r===35675&&(a=3),r===35676&&(a=4);const l=n.size/a,h=a===1?0:a*a*4,o=a===1?0:a*4;for(let c=0;c<a;c++)this.gl.vertexAttribPointer(e+c,l,n.type,n.normalized,n.stride+h,n.offset+c*o),this.gl.enableVertexAttribArray(e+c),this.gl.renderer.vertexAttribDivisor(e+c,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:t,mode:e=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${t.attributeOrder}`&&(this.VAOs[t.attributeOrder]||this.createVAO(t),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${t.attributeOrder}`),t.attributeLocations.forEach((r,{name:n})=>{const a=this.attributes[n];a.needsUpdate&&this.updateAttribute(a)});let s=2;this.attributes.index?.type===this.gl.UNSIGNED_INT&&(s=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(e,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*s,this.instancedCount):this.gl.renderer.drawArraysInstanced(e,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(e,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*s):this.gl.drawArrays(e,this.drawRange.start,this.drawRange.count)}getPosition(){const t=this.attributes.position;if(t.data)return t;if(!dt)return console.warn("No position buffer data found to compute bounds"),dt=!0}computeBoundingBox(t){t||(t=this.getPosition());const e=t.data,s=t.size;this.bounds||(this.bounds={min:new P,max:new P,center:new P,scale:new P,radius:1/0});const r=this.bounds.min,n=this.bounds.max,a=this.bounds.center,l=this.bounds.scale;r.set(1/0),n.set(-1/0);for(let h=0,o=e.length;h<o;h+=s){const c=e[h],u=e[h+1],f=e[h+2];r.x=Math.min(c,r.x),r.y=Math.min(u,r.y),r.z=Math.min(f,r.z),n.x=Math.max(c,n.x),n.y=Math.max(u,n.y),n.z=Math.max(f,n.z)}l.sub(n,r),a.add(r,n).divide(2)}computeBoundingSphere(t){t||(t=this.getPosition());const e=t.data,s=t.size;this.bounds||this.computeBoundingBox(t);let r=0;for(let n=0,a=e.length;n<a;n+=s)ft.fromArray(e,n),r=Math.max(r,this.bounds.center.squaredDistance(ft));this.bounds.radius=Math.sqrt(r)}remove(){for(let t in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[t]),delete this.VAOs[t];for(let t in this.attributes)this.gl.deleteBuffer(this.attributes[t].buffer),delete this.attributes[t]}}let ie=1;const gt={};class se{constructor(t,{vertex:e,fragment:s,uniforms:r={},transparent:n=!1,cullFace:a=t.BACK,frontFace:l=t.CCW,depthTest:h=!0,depthWrite:o=!0,depthFunc:c=t.LEQUAL}={}){t.canvas||console.error("gl not passed as first argument to Program"),this.gl=t,this.uniforms=r,this.id=ie++,e||console.warn("vertex shader not supplied"),s||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=a,this.frontFace=l,this.depthTest=h,this.depthWrite=o,this.depthFunc=c,this.blendFunc={},this.blendEquation={},this.stencilFunc={},this.stencilOp={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=t.createShader(t.VERTEX_SHADER),this.fragmentShader=t.createShader(t.FRAGMENT_SHADER),this.program=t.createProgram(),t.attachShader(this.program,this.vertexShader),t.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:e,fragment:s})}setShaders({vertex:t,fragment:e}){if(t&&(this.gl.shaderSource(this.vertexShader,t),this.gl.compileShader(this.vertexShader),this.gl.getShaderInfoLog(this.vertexShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${pt(t)}`)),e&&(this.gl.shaderSource(this.fragmentShader,e),this.gl.compileShader(this.fragmentShader),this.gl.getShaderInfoLog(this.fragmentShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${pt(e)}`)),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))return console.warn(this.gl.getProgramInfoLog(this.program));this.uniformLocations=new Map;let s=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let a=0;a<s;a++){let l=this.gl.getActiveUniform(this.program,a);this.uniformLocations.set(l,this.gl.getUniformLocation(this.program,l.name));const h=l.name.match(/(\w+)/g);l.uniformName=h[0],l.nameComponents=h.slice(1)}this.attributeLocations=new Map;const r=[],n=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const l=this.gl.getActiveAttrib(this.program,a),h=this.gl.getAttribLocation(this.program,l.name);h!==-1&&(r[h]=l.name,this.attributeLocations.set(l,h))}this.attributeOrder=r.join("")}setBlendFunc(t,e,s,r){this.blendFunc.src=t,this.blendFunc.dst=e,this.blendFunc.srcAlpha=s,this.blendFunc.dstAlpha=r,t&&(this.transparent=!0)}setBlendEquation(t,e){this.blendEquation.modeRGB=t,this.blendEquation.modeAlpha=e}setStencilFunc(t,e,s){this.stencilRef=e,this.stencilFunc.func=t,this.stencilFunc.ref=e,this.stencilFunc.mask=s}setStencilOp(t,e,s){this.stencilOp.stencilFail=t,this.stencilOp.depthFail=e,this.stencilOp.depthPass=s}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha),this.stencilFunc.func||this.stencilOp.stencilFail?this.gl.renderer.enable(this.gl.STENCIL_TEST):this.gl.renderer.disable(this.gl.STENCIL_TEST),this.gl.renderer.setStencilFunc(this.stencilFunc.func,this.stencilFunc.ref,this.stencilFunc.mask),this.gl.renderer.setStencilOp(this.stencilOp.stencilFail,this.stencilOp.depthFail,this.stencilOp.depthPass)}use({flipFaces:t=!1}={}){let e=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((r,n)=>{let a=this.uniforms[n.uniformName];for(const l of n.nameComponents){if(!a)break;if(l in a)a=a[l];else{if(Array.isArray(a.value))break;a=void 0;break}}if(!a)return mt(`Active uniform ${n.name} has not been supplied`);if(a&&a.value===void 0)return mt(`${n.name} uniform is missing a value parameter`);if(a.value.texture)return e=e+1,a.value.update(e),H(this.gl,n.type,r,e);if(a.value.length&&a.value[0].texture){const l=[];return a.value.forEach(h=>{e=e+1,h.update(e),l.push(e)}),H(this.gl,n.type,r,l)}H(this.gl,n.type,r,a.value)}),this.applyState(),t&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}}function H(i,t,e,s){s=s.length?re(s):s;const r=i.renderer.state.uniformLocations.get(e);if(s.length)if(r===void 0||r.length!==s.length)i.renderer.state.uniformLocations.set(e,s.slice(0));else{if(ne(r,s))return;r.set?r.set(s):ae(r,s),i.renderer.state.uniformLocations.set(e,r)}else{if(r===s)return;i.renderer.state.uniformLocations.set(e,s)}switch(t){case 5126:return s.length?i.uniform1fv(e,s):i.uniform1f(e,s);case 35664:return i.uniform2fv(e,s);case 35665:return i.uniform3fv(e,s);case 35666:return i.uniform4fv(e,s);case 35670:case 5124:case 35678:case 36306:case 35680:case 36289:return s.length?i.uniform1iv(e,s):i.uniform1i(e,s);case 35671:case 35667:return i.uniform2iv(e,s);case 35672:case 35668:return i.uniform3iv(e,s);case 35673:case 35669:return i.uniform4iv(e,s);case 35674:return i.uniformMatrix2fv(e,!1,s);case 35675:return i.uniformMatrix3fv(e,!1,s);case 35676:return i.uniformMatrix4fv(e,!1,s)}}function pt(i){let t=i.split(`
`);for(let e=0;e<t.length;e++)t[e]=e+1+": "+t[e];return t.join(`
`)}function re(i){const t=i.length,e=i[0].length;if(e===void 0)return i;const s=t*e;let r=gt[s];r||(gt[s]=r=new Float32Array(s));for(let n=0;n<t;n++)r.set(i[n],n*e);return r}function ne(i,t){if(i.length!==t.length)return!1;for(let e=0,s=i.length;e<s;e++)if(i[e]!==t[e])return!1;return!0}function ae(i,t){for(let e=0,s=i.length;e<s;e++)i[e]=t[e]}let Q=0;function mt(i){Q>100||(console.warn(i),Q++,Q>100&&console.warn("More than 100 program warnings - stopping logs."))}const J=new P;let le=1;class he{constructor({canvas:t=document.createElement("canvas"),width:e=300,height:s=150,dpr:r=1,alpha:n=!1,depth:a=!0,stencil:l=!1,antialias:h=!1,premultipliedAlpha:o=!1,preserveDrawingBuffer:c=!1,powerPreference:u="default",autoClear:f=!0,webgl:d=2}={}){const g={alpha:n,depth:a,stencil:l,antialias:h,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:u};this.dpr=r,this.alpha=n,this.color=!0,this.depth=a,this.stencil=l,this.premultipliedAlpha=o,this.autoClear=f,this.id=le++,d===2&&(this.gl=t.getContext("webgl2",g)),this.isWebgl2=!!this.gl,this.gl||(this.gl=t.getContext("webgl",g)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(e,s),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(t,e){this.width=t,this.height=e,this.gl.canvas.width=t*this.dpr,this.gl.canvas.height=e*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:t+"px",height:e+"px"})}setViewport(t,e,s=0,r=0){this.state.viewport.width===t&&this.state.viewport.height===e||(this.state.viewport.width=t,this.state.viewport.height=e,this.state.viewport.x=s,this.state.viewport.y=r,this.gl.viewport(s,r,t,e))}setScissor(t,e,s=0,r=0){this.gl.scissor(s,r,t,e)}enable(t){this.state[t]!==!0&&(this.gl.enable(t),this.state[t]=!0)}disable(t){this.state[t]!==!1&&(this.gl.disable(t),this.state[t]=!1)}setBlendFunc(t,e,s,r){this.state.blendFunc.src===t&&this.state.blendFunc.dst===e&&this.state.blendFunc.srcAlpha===s&&this.state.blendFunc.dstAlpha===r||(this.state.blendFunc.src=t,this.state.blendFunc.dst=e,this.state.blendFunc.srcAlpha=s,this.state.blendFunc.dstAlpha=r,s!==void 0?this.gl.blendFuncSeparate(t,e,s,r):this.gl.blendFunc(t,e))}setBlendEquation(t,e){t=t||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===t&&this.state.blendEquation.modeAlpha===e)&&(this.state.blendEquation.modeRGB=t,this.state.blendEquation.modeAlpha=e,e!==void 0?this.gl.blendEquationSeparate(t,e):this.gl.blendEquation(t))}setCullFace(t){this.state.cullFace!==t&&(this.state.cullFace=t,this.gl.cullFace(t))}setFrontFace(t){this.state.frontFace!==t&&(this.state.frontFace=t,this.gl.frontFace(t))}setDepthMask(t){this.state.depthMask!==t&&(this.state.depthMask=t,this.gl.depthMask(t))}setDepthFunc(t){this.state.depthFunc!==t&&(this.state.depthFunc=t,this.gl.depthFunc(t))}setStencilMask(t){this.state.stencilMask!==t&&(this.state.stencilMask=t,this.gl.stencilMask(t))}setStencilFunc(t,e,s){this.state.stencilFunc===t&&this.state.stencilRef===e&&this.state.stencilFuncMask===s||(this.state.stencilFunc=t||this.gl.ALWAYS,this.state.stencilRef=e||0,this.state.stencilFuncMask=s||0,this.gl.stencilFunc(t||this.gl.ALWAYS,e||0,s||0))}setStencilOp(t,e,s){this.state.stencilFail===t&&this.state.stencilDepthFail===e&&this.state.stencilDepthPass===s||(this.state.stencilFail=t,this.state.stencilDepthFail=e,this.state.stencilDepthPass=s,this.gl.stencilOp(t,e,s))}activeTexture(t){this.state.activeTextureUnit!==t&&(this.state.activeTextureUnit=t,this.gl.activeTexture(this.gl.TEXTURE0+t))}bindFramebuffer({target:t=this.gl.FRAMEBUFFER,buffer:e=null}={}){this.state.framebuffer!==e&&(this.state.framebuffer=e,this.gl.bindFramebuffer(t,e))}getExtension(t,e,s){return e&&this.gl[e]?this.gl[e].bind(this.gl):(this.extensions[t]||(this.extensions[t]=this.gl.getExtension(t)),e?this.extensions[t]?this.extensions[t][s].bind(this.extensions[t]):null:this.extensions[t])}sortOpaque(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program.id!==e.program.id?t.program.id-e.program.id:t.zDepth!==e.zDepth?t.zDepth-e.zDepth:e.id-t.id}sortTransparent(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.zDepth!==e.zDepth?e.zDepth-t.zDepth:e.id-t.id}sortUI(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program.id!==e.program.id?t.program.id-e.program.id:e.id-t.id}getRenderList({scene:t,camera:e,frustumCull:s,sort:r}){let n=[];if(e&&s&&e.updateFrustum(),t.traverse(a=>{if(!a.visible)return!0;a.draw&&(s&&a.frustumCulled&&e&&!e.frustumIntersectsMesh(a)||n.push(a))}),r){const a=[],l=[],h=[];n.forEach(o=>{o.program.transparent?o.program.depthTest?l.push(o):h.push(o):a.push(o),o.zDepth=0,!(o.renderOrder!==0||!o.program.depthTest||!e)&&(o.worldMatrix.getTranslation(J),J.applyMatrix4(e.projectionViewMatrix),o.zDepth=J.z)}),a.sort(this.sortOpaque),l.sort(this.sortTransparent),h.sort(this.sortUI),n=a.concat(l,h)}return n}render({scene:t,camera:e,target:s=null,update:r=!0,sort:n=!0,frustumCull:a=!0,clear:l}){s===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(s),this.setViewport(s.width,s.height)),(l||this.autoClear&&l!==!1)&&(this.depth&&(!s||s.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),(this.stencil||!s||s.stencil)&&(this.enable(this.gl.STENCIL_TEST),this.setStencilMask(255)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),r&&t.updateMatrixWorld(),e&&e.updateMatrixWorld(),this.getRenderList({scene:t,camera:e,frustumCull:a,sort:n}).forEach(o=>{o.draw({camera:e})})}}function oe(i,t){return i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],i}function ce(i,t,e,s,r){return i[0]=t,i[1]=e,i[2]=s,i[3]=r,i}function ue(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=e*e+s*s+r*r+n*n;return a>0&&(a=1/Math.sqrt(a)),i[0]=e*a,i[1]=s*a,i[2]=r*a,i[3]=n*a,i}function fe(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]+i[3]*t[3]}function de(i){return i[0]=0,i[1]=0,i[2]=0,i[3]=1,i}function ge(i,t,e){e=e*.5;let s=Math.sin(e);return i[0]=s*t[0],i[1]=s*t[1],i[2]=s*t[2],i[3]=Math.cos(e),i}function vt(i,t,e){let s=t[0],r=t[1],n=t[2],a=t[3],l=e[0],h=e[1],o=e[2],c=e[3];return i[0]=s*c+a*l+r*o-n*h,i[1]=r*c+a*h+n*l-s*o,i[2]=n*c+a*o+s*h-r*l,i[3]=a*c-s*l-r*h-n*o,i}function pe(i,t,e){e*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],l=Math.sin(e),h=Math.cos(e);return i[0]=s*h+a*l,i[1]=r*h+n*l,i[2]=n*h-r*l,i[3]=a*h-s*l,i}function me(i,t,e){e*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],l=Math.sin(e),h=Math.cos(e);return i[0]=s*h-n*l,i[1]=r*h+a*l,i[2]=n*h+s*l,i[3]=a*h-r*l,i}function ve(i,t,e){e*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],l=Math.sin(e),h=Math.cos(e);return i[0]=s*h+r*l,i[1]=r*h-s*l,i[2]=n*h+a*l,i[3]=a*h-n*l,i}function xe(i,t,e,s){let r=t[0],n=t[1],a=t[2],l=t[3],h=e[0],o=e[1],c=e[2],u=e[3],f,d,g,p,m;return d=r*h+n*o+a*c+l*u,d<0&&(d=-d,h=-h,o=-o,c=-c,u=-u),1-d>1e-6?(f=Math.acos(d),g=Math.sin(f),p=Math.sin((1-s)*f)/g,m=Math.sin(s*f)/g):(p=1-s,m=s),i[0]=p*r+m*h,i[1]=p*n+m*o,i[2]=p*a+m*c,i[3]=p*l+m*u,i}function ye(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=e*e+s*s+r*r+n*n,l=a?1/a:0;return i[0]=-e*l,i[1]=-s*l,i[2]=-r*l,i[3]=n*l,i}function be(i,t){return i[0]=-t[0],i[1]=-t[1],i[2]=-t[2],i[3]=t[3],i}function we(i,t){let e=t[0]+t[4]+t[8],s;if(e>0)s=Math.sqrt(e+1),i[3]=.5*s,s=.5/s,i[0]=(t[5]-t[7])*s,i[1]=(t[6]-t[2])*s,i[2]=(t[1]-t[3])*s;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[r*3+r]&&(r=2);let n=(r+1)%3,a=(r+2)%3;s=Math.sqrt(t[r*3+r]-t[n*3+n]-t[a*3+a]+1),i[r]=.5*s,s=.5/s,i[3]=(t[n*3+a]-t[a*3+n])*s,i[n]=(t[n*3+r]+t[r*3+n])*s,i[a]=(t[a*3+r]+t[r*3+a])*s}return i}function Me(i,t,e="YXZ"){let s=Math.sin(t[0]*.5),r=Math.cos(t[0]*.5),n=Math.sin(t[1]*.5),a=Math.cos(t[1]*.5),l=Math.sin(t[2]*.5),h=Math.cos(t[2]*.5);return e==="XYZ"?(i[0]=s*a*h+r*n*l,i[1]=r*n*h-s*a*l,i[2]=r*a*l+s*n*h,i[3]=r*a*h-s*n*l):e==="YXZ"?(i[0]=s*a*h+r*n*l,i[1]=r*n*h-s*a*l,i[2]=r*a*l-s*n*h,i[3]=r*a*h+s*n*l):e==="ZXY"?(i[0]=s*a*h-r*n*l,i[1]=r*n*h+s*a*l,i[2]=r*a*l+s*n*h,i[3]=r*a*h-s*n*l):e==="ZYX"?(i[0]=s*a*h-r*n*l,i[1]=r*n*h+s*a*l,i[2]=r*a*l-s*n*h,i[3]=r*a*h+s*n*l):e==="YZX"?(i[0]=s*a*h+r*n*l,i[1]=r*n*h+s*a*l,i[2]=r*a*l-s*n*h,i[3]=r*a*h-s*n*l):e==="XZY"&&(i[0]=s*a*h-r*n*l,i[1]=r*n*h-s*a*l,i[2]=r*a*l+s*n*h,i[3]=r*a*h+s*n*l),i}const Se=oe,Ce=ce,Ae=fe,_e=ue;class Ee extends Array{constructor(t=0,e=0,s=0,r=1){super(t,e,s,r),this.onChange=()=>{},this._target=this;const n=["0","1","2","3"];return new Proxy(this,{set(a,l){const h=Reflect.set(...arguments);return h&&n.includes(l)&&a.onChange(),h}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this._target[0]=t,this.onChange()}set y(t){this._target[1]=t,this.onChange()}set z(t){this._target[2]=t,this.onChange()}set w(t){this._target[3]=t,this.onChange()}identity(){return de(this._target),this.onChange(),this}set(t,e,s,r){return t.length?this.copy(t):(Ce(this._target,t,e,s,r),this.onChange(),this)}rotateX(t){return pe(this._target,this._target,t),this.onChange(),this}rotateY(t){return me(this._target,this._target,t),this.onChange(),this}rotateZ(t){return ve(this._target,this._target,t),this.onChange(),this}inverse(t=this._target){return ye(this._target,t),this.onChange(),this}conjugate(t=this._target){return be(this._target,t),this.onChange(),this}copy(t){return Se(this._target,t),this.onChange(),this}normalize(t=this._target){return _e(this._target,t),this.onChange(),this}multiply(t,e){return e?vt(this._target,t,e):vt(this._target,this._target,t),this.onChange(),this}dot(t){return Ae(this._target,t)}fromMatrix3(t){return we(this._target,t),this.onChange(),this}fromEuler(t,e){return Me(this._target,t,t.order),e||this.onChange(),this}fromAxisAngle(t,e){return ge(this._target,t,e),this.onChange(),this}slerp(t,e){return xe(this._target,this._target,t,e),this.onChange(),this}fromArray(t,e=0){return this._target[0]=t[e],this._target[1]=t[e+1],this._target[2]=t[e+2],this._target[3]=t[e+3],this.onChange(),this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t[e+3]=this[3],t}}const Re=1e-6;function ze(i,t){return i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],i[4]=t[4],i[5]=t[5],i[6]=t[6],i[7]=t[7],i[8]=t[8],i[9]=t[9],i[10]=t[10],i[11]=t[11],i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15],i}function Te(i,t,e,s,r,n,a,l,h,o,c,u,f,d,g,p,m){return i[0]=t,i[1]=e,i[2]=s,i[3]=r,i[4]=n,i[5]=a,i[6]=l,i[7]=h,i[8]=o,i[9]=c,i[10]=u,i[11]=f,i[12]=d,i[13]=g,i[14]=p,i[15]=m,i}function Fe(i){return i[0]=1,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=1,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}function Ie(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=t[4],l=t[5],h=t[6],o=t[7],c=t[8],u=t[9],f=t[10],d=t[11],g=t[12],p=t[13],m=t[14],v=t[15],_=e*l-s*a,y=e*h-r*a,x=e*o-n*a,w=s*h-r*l,b=s*o-n*l,z=r*o-n*h,I=c*p-u*g,B=c*m-f*g,T=c*v-d*g,L=u*m-f*p,F=u*v-d*p,O=f*v-d*m,M=_*O-y*F+x*L+w*T-b*B+z*I;return M?(M=1/M,i[0]=(l*O-h*F+o*L)*M,i[1]=(r*F-s*O-n*L)*M,i[2]=(p*z-m*b+v*w)*M,i[3]=(f*b-u*z-d*w)*M,i[4]=(h*T-a*O-o*B)*M,i[5]=(e*O-r*T+n*B)*M,i[6]=(m*x-g*z-v*y)*M,i[7]=(c*z-f*x+d*y)*M,i[8]=(a*F-l*T+o*I)*M,i[9]=(s*T-e*F-n*I)*M,i[10]=(g*b-p*x+v*_)*M,i[11]=(u*x-c*b-d*_)*M,i[12]=(l*B-a*L-h*I)*M,i[13]=(e*L-s*B+r*I)*M,i[14]=(p*y-g*w-m*_)*M,i[15]=(c*w-u*y+f*_)*M,i):null}function xt(i){let t=i[0],e=i[1],s=i[2],r=i[3],n=i[4],a=i[5],l=i[6],h=i[7],o=i[8],c=i[9],u=i[10],f=i[11],d=i[12],g=i[13],p=i[14],m=i[15],v=t*a-e*n,_=t*l-s*n,y=t*h-r*n,x=e*l-s*a,w=e*h-r*a,b=s*h-r*l,z=o*g-c*d,I=o*p-u*d,B=o*m-f*d,T=c*p-u*g,L=c*m-f*g,F=u*m-f*p;return v*F-_*L+y*T+x*B-w*I+b*z}function yt(i,t,e){let s=t[0],r=t[1],n=t[2],a=t[3],l=t[4],h=t[5],o=t[6],c=t[7],u=t[8],f=t[9],d=t[10],g=t[11],p=t[12],m=t[13],v=t[14],_=t[15],y=e[0],x=e[1],w=e[2],b=e[3];return i[0]=y*s+x*l+w*u+b*p,i[1]=y*r+x*h+w*f+b*m,i[2]=y*n+x*o+w*d+b*v,i[3]=y*a+x*c+w*g+b*_,y=e[4],x=e[5],w=e[6],b=e[7],i[4]=y*s+x*l+w*u+b*p,i[5]=y*r+x*h+w*f+b*m,i[6]=y*n+x*o+w*d+b*v,i[7]=y*a+x*c+w*g+b*_,y=e[8],x=e[9],w=e[10],b=e[11],i[8]=y*s+x*l+w*u+b*p,i[9]=y*r+x*h+w*f+b*m,i[10]=y*n+x*o+w*d+b*v,i[11]=y*a+x*c+w*g+b*_,y=e[12],x=e[13],w=e[14],b=e[15],i[12]=y*s+x*l+w*u+b*p,i[13]=y*r+x*h+w*f+b*m,i[14]=y*n+x*o+w*d+b*v,i[15]=y*a+x*c+w*g+b*_,i}function Be(i,t,e){let s=e[0],r=e[1],n=e[2],a,l,h,o,c,u,f,d,g,p,m,v;return t===i?(i[12]=t[0]*s+t[4]*r+t[8]*n+t[12],i[13]=t[1]*s+t[5]*r+t[9]*n+t[13],i[14]=t[2]*s+t[6]*r+t[10]*n+t[14],i[15]=t[3]*s+t[7]*r+t[11]*n+t[15]):(a=t[0],l=t[1],h=t[2],o=t[3],c=t[4],u=t[5],f=t[6],d=t[7],g=t[8],p=t[9],m=t[10],v=t[11],i[0]=a,i[1]=l,i[2]=h,i[3]=o,i[4]=c,i[5]=u,i[6]=f,i[7]=d,i[8]=g,i[9]=p,i[10]=m,i[11]=v,i[12]=a*s+c*r+g*n+t[12],i[13]=l*s+u*r+p*n+t[13],i[14]=h*s+f*r+m*n+t[14],i[15]=o*s+d*r+v*n+t[15]),i}function Le(i,t,e){let s=e[0],r=e[1],n=e[2];return i[0]=t[0]*s,i[1]=t[1]*s,i[2]=t[2]*s,i[3]=t[3]*s,i[4]=t[4]*r,i[5]=t[5]*r,i[6]=t[6]*r,i[7]=t[7]*r,i[8]=t[8]*n,i[9]=t[9]*n,i[10]=t[10]*n,i[11]=t[11]*n,i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15],i}function Oe(i,t,e,s){let r=s[0],n=s[1],a=s[2],l=Math.hypot(r,n,a),h,o,c,u,f,d,g,p,m,v,_,y,x,w,b,z,I,B,T,L,F,O,M,N;return Math.abs(l)<Re?null:(l=1/l,r*=l,n*=l,a*=l,h=Math.sin(e),o=Math.cos(e),c=1-o,u=t[0],f=t[1],d=t[2],g=t[3],p=t[4],m=t[5],v=t[6],_=t[7],y=t[8],x=t[9],w=t[10],b=t[11],z=r*r*c+o,I=n*r*c+a*h,B=a*r*c-n*h,T=r*n*c-a*h,L=n*n*c+o,F=a*n*c+r*h,O=r*a*c+n*h,M=n*a*c-r*h,N=a*a*c+o,i[0]=u*z+p*I+y*B,i[1]=f*z+m*I+x*B,i[2]=d*z+v*I+w*B,i[3]=g*z+_*I+b*B,i[4]=u*T+p*L+y*F,i[5]=f*T+m*L+x*F,i[6]=d*T+v*L+w*F,i[7]=g*T+_*L+b*F,i[8]=u*O+p*M+y*N,i[9]=f*O+m*M+x*N,i[10]=d*O+v*M+w*N,i[11]=g*O+_*M+b*N,t!==i&&(i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i)}function ke(i,t){return i[0]=t[12],i[1]=t[13],i[2]=t[14],i}function bt(i,t){let e=t[0],s=t[1],r=t[2],n=t[4],a=t[5],l=t[6],h=t[8],o=t[9],c=t[10];return i[0]=Math.hypot(e,s,r),i[1]=Math.hypot(n,a,l),i[2]=Math.hypot(h,o,c),i}function Ge(i){let t=i[0],e=i[1],s=i[2],r=i[4],n=i[5],a=i[6],l=i[8],h=i[9],o=i[10];const c=t*t+e*e+s*s,u=r*r+n*n+a*a,f=l*l+h*h+o*o;return Math.sqrt(Math.max(c,u,f))}const wt=(function(){const i=[1,1,1];return function(t,e){let s=i;bt(s,e);let r=1/s[0],n=1/s[1],a=1/s[2],l=e[0]*r,h=e[1]*n,o=e[2]*a,c=e[4]*r,u=e[5]*n,f=e[6]*a,d=e[8]*r,g=e[9]*n,p=e[10]*a,m=l+u+p,v=0;return m>0?(v=Math.sqrt(m+1)*2,t[3]=.25*v,t[0]=(f-g)/v,t[1]=(d-o)/v,t[2]=(h-c)/v):l>u&&l>p?(v=Math.sqrt(1+l-u-p)*2,t[3]=(f-g)/v,t[0]=.25*v,t[1]=(h+c)/v,t[2]=(d+o)/v):u>p?(v=Math.sqrt(1+u-l-p)*2,t[3]=(d-o)/v,t[0]=(h+c)/v,t[1]=.25*v,t[2]=(f+g)/v):(v=Math.sqrt(1+p-l-u)*2,t[3]=(h-c)/v,t[0]=(d+o)/v,t[1]=(f+g)/v,t[2]=.25*v),t}})();function De(i,t,e,s){let r=E([i[0],i[1],i[2]]);const n=E([i[4],i[5],i[6]]),a=E([i[8],i[9],i[10]]);xt(i)<0&&(r=-r),e[0]=i[12],e[1]=i[13],e[2]=i[14];const h=i.slice(),o=1/r,c=1/n,u=1/a;h[0]*=o,h[1]*=o,h[2]*=o,h[4]*=c,h[5]*=c,h[6]*=c,h[8]*=u,h[9]*=u,h[10]*=u,wt(t,h),s[0]=r,s[1]=n,s[2]=a}function Pe(i,t,e,s){const r=i,n=t[0],a=t[1],l=t[2],h=t[3],o=n+n,c=a+a,u=l+l,f=n*o,d=n*c,g=n*u,p=a*c,m=a*u,v=l*u,_=h*o,y=h*c,x=h*u,w=s[0],b=s[1],z=s[2];return r[0]=(1-(p+v))*w,r[1]=(d+x)*w,r[2]=(g-y)*w,r[3]=0,r[4]=(d-x)*b,r[5]=(1-(f+v))*b,r[6]=(m+_)*b,r[7]=0,r[8]=(g+y)*z,r[9]=(m-_)*z,r[10]=(1-(f+p))*z,r[11]=0,r[12]=e[0],r[13]=e[1],r[14]=e[2],r[15]=1,r}function Xe(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=e+e,l=s+s,h=r+r,o=e*a,c=s*a,u=s*l,f=r*a,d=r*l,g=r*h,p=n*a,m=n*l,v=n*h;return i[0]=1-u-g,i[1]=c+v,i[2]=f-m,i[3]=0,i[4]=c-v,i[5]=1-o-g,i[6]=d+p,i[7]=0,i[8]=f+m,i[9]=d-p,i[10]=1-o-u,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}function qe(i,t,e,s,r){let n=1/Math.tan(t/2),a=1/(s-r);return i[0]=n/e,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=n,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=(r+s)*a,i[11]=-1,i[12]=0,i[13]=0,i[14]=2*r*s*a,i[15]=0,i}function Ne(i,t,e,s,r,n,a){let l=1/(t-e),h=1/(s-r),o=1/(n-a);return i[0]=-2*l,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=-2*h,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=2*o,i[11]=0,i[12]=(t+e)*l,i[13]=(r+s)*h,i[14]=(a+n)*o,i[15]=1,i}function $e(i,t,e,s){let r=t[0],n=t[1],a=t[2],l=s[0],h=s[1],o=s[2],c=r-e[0],u=n-e[1],f=a-e[2],d=c*c+u*u+f*f;d===0?f=1:(d=1/Math.sqrt(d),c*=d,u*=d,f*=d);let g=h*f-o*u,p=o*c-l*f,m=l*u-h*c;return d=g*g+p*p+m*m,d===0&&(o?l+=1e-6:h?o+=1e-6:h+=1e-6,g=h*f-o*u,p=o*c-l*f,m=l*u-h*c,d=g*g+p*p+m*m),d=1/Math.sqrt(d),g*=d,p*=d,m*=d,i[0]=g,i[1]=p,i[2]=m,i[3]=0,i[4]=u*m-f*p,i[5]=f*g-c*m,i[6]=c*p-u*g,i[7]=0,i[8]=c,i[9]=u,i[10]=f,i[11]=0,i[12]=r,i[13]=n,i[14]=a,i[15]=1,i}function Mt(i,t,e){return i[0]=t[0]+e[0],i[1]=t[1]+e[1],i[2]=t[2]+e[2],i[3]=t[3]+e[3],i[4]=t[4]+e[4],i[5]=t[5]+e[5],i[6]=t[6]+e[6],i[7]=t[7]+e[7],i[8]=t[8]+e[8],i[9]=t[9]+e[9],i[10]=t[10]+e[10],i[11]=t[11]+e[11],i[12]=t[12]+e[12],i[13]=t[13]+e[13],i[14]=t[14]+e[14],i[15]=t[15]+e[15],i}function St(i,t,e){return i[0]=t[0]-e[0],i[1]=t[1]-e[1],i[2]=t[2]-e[2],i[3]=t[3]-e[3],i[4]=t[4]-e[4],i[5]=t[5]-e[5],i[6]=t[6]-e[6],i[7]=t[7]-e[7],i[8]=t[8]-e[8],i[9]=t[9]-e[9],i[10]=t[10]-e[10],i[11]=t[11]-e[11],i[12]=t[12]-e[12],i[13]=t[13]-e[13],i[14]=t[14]-e[14],i[15]=t[15]-e[15],i}function Ue(i,t,e){return i[0]=t[0]*e,i[1]=t[1]*e,i[2]=t[2]*e,i[3]=t[3]*e,i[4]=t[4]*e,i[5]=t[5]*e,i[6]=t[6]*e,i[7]=t[7]*e,i[8]=t[8]*e,i[9]=t[9]*e,i[10]=t[10]*e,i[11]=t[11]*e,i[12]=t[12]*e,i[13]=t[13]*e,i[14]=t[14]*e,i[15]=t[15]*e,i}class Y extends Array{constructor(t=1,e=0,s=0,r=0,n=0,a=1,l=0,h=0,o=0,c=0,u=1,f=0,d=0,g=0,p=0,m=1){return super(t,e,s,r,n,a,l,h,o,c,u,f,d,g,p,m),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(t){this[12]=t}set y(t){this[13]=t}set z(t){this[14]=t}set w(t){this[15]=t}set(t,e,s,r,n,a,l,h,o,c,u,f,d,g,p,m){return t.length?this.copy(t):(Te(this,t,e,s,r,n,a,l,h,o,c,u,f,d,g,p,m),this)}translate(t,e=this){return Be(this,e,t),this}rotate(t,e,s=this){return Oe(this,s,t,e),this}scale(t,e=this){return Le(this,e,typeof t=="number"?[t,t,t]:t),this}add(t,e){return e?Mt(this,t,e):Mt(this,this,t),this}sub(t,e){return e?St(this,t,e):St(this,this,t),this}multiply(t,e){return t.length?e?yt(this,t,e):yt(this,this,t):Ue(this,this,t),this}identity(){return Fe(this),this}copy(t){return ze(this,t),this}fromPerspective({fov:t,aspect:e,near:s,far:r}={}){return qe(this,t,e,s,r),this}fromOrthogonal({left:t,right:e,bottom:s,top:r,near:n,far:a}){return Ne(this,t,e,s,r,n,a),this}fromQuaternion(t){return Xe(this,t),this}setPosition(t){return this.x=t[0],this.y=t[1],this.z=t[2],this}inverse(t=this){return Ie(this,t),this}compose(t,e,s){return Pe(this,t,e,s),this}decompose(t,e,s){return De(this,t,e,s),this}getRotation(t){return wt(t,this),this}getTranslation(t){return ke(t,this),this}getScaling(t){return bt(t,this),this}getMaxScaleOnAxis(){return Ge(this)}lookAt(t,e,s){return $e(this,t,e,s),this}determinant(){return xt(this)}fromArray(t,e=0){return this[0]=t[e],this[1]=t[e+1],this[2]=t[e+2],this[3]=t[e+3],this[4]=t[e+4],this[5]=t[e+5],this[6]=t[e+6],this[7]=t[e+7],this[8]=t[e+8],this[9]=t[e+9],this[10]=t[e+10],this[11]=t[e+11],this[12]=t[e+12],this[13]=t[e+13],this[14]=t[e+14],this[15]=t[e+15],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t[e+3]=this[3],t[e+4]=this[4],t[e+5]=this[5],t[e+6]=this[6],t[e+7]=this[7],t[e+8]=this[8],t[e+9]=this[9],t[e+10]=this[10],t[e+11]=this[11],t[e+12]=this[12],t[e+13]=this[13],t[e+14]=this[14],t[e+15]=this[15],t}}function Ye(i,t,e="YXZ"){return e==="XYZ"?(i[1]=Math.asin(Math.min(Math.max(t[8],-1),1)),Math.abs(t[8])<.99999?(i[0]=Math.atan2(-t[9],t[10]),i[2]=Math.atan2(-t[4],t[0])):(i[0]=Math.atan2(t[6],t[5]),i[2]=0)):e==="YXZ"?(i[0]=Math.asin(-Math.min(Math.max(t[9],-1),1)),Math.abs(t[9])<.99999?(i[1]=Math.atan2(t[8],t[10]),i[2]=Math.atan2(t[1],t[5])):(i[1]=Math.atan2(-t[2],t[0]),i[2]=0)):e==="ZXY"?(i[0]=Math.asin(Math.min(Math.max(t[6],-1),1)),Math.abs(t[6])<.99999?(i[1]=Math.atan2(-t[2],t[10]),i[2]=Math.atan2(-t[4],t[5])):(i[1]=0,i[2]=Math.atan2(t[1],t[0]))):e==="ZYX"?(i[1]=Math.asin(-Math.min(Math.max(t[2],-1),1)),Math.abs(t[2])<.99999?(i[0]=Math.atan2(t[6],t[10]),i[2]=Math.atan2(t[1],t[0])):(i[0]=0,i[2]=Math.atan2(-t[4],t[5]))):e==="YZX"?(i[2]=Math.asin(Math.min(Math.max(t[1],-1),1)),Math.abs(t[1])<.99999?(i[0]=Math.atan2(-t[9],t[5]),i[1]=Math.atan2(-t[2],t[0])):(i[0]=0,i[1]=Math.atan2(t[8],t[10]))):e==="XZY"&&(i[2]=Math.asin(-Math.min(Math.max(t[4],-1),1)),Math.abs(t[4])<.99999?(i[0]=Math.atan2(t[6],t[5]),i[1]=Math.atan2(t[8],t[0])):(i[0]=Math.atan2(-t[9],t[10]),i[1]=0)),i}const Ct=new Y;class Ve extends Array{constructor(t=0,e=t,s=t,r="YXZ"){super(t,e,s),this.order=r,this.onChange=()=>{},this._target=this;const n=["0","1","2"];return new Proxy(this,{set(a,l){const h=Reflect.set(...arguments);return h&&n.includes(l)&&a.onChange(),h}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this._target[0]=t,this.onChange()}set y(t){this._target[1]=t,this.onChange()}set z(t){this._target[2]=t,this.onChange()}set(t,e=t,s=t){return t.length?this.copy(t):(this._target[0]=t,this._target[1]=e,this._target[2]=s,this.onChange(),this)}copy(t){return this._target[0]=t[0],this._target[1]=t[1],this._target[2]=t[2],this.onChange(),this}reorder(t){return this._target.order=t,this.onChange(),this}fromRotationMatrix(t,e=this.order){return Ye(this._target,t,e),this.onChange(),this}fromQuaternion(t,e=this.order,s){return Ct.fromQuaternion(t),this._target.fromRotationMatrix(Ct,e),s||this.onChange(),this}fromArray(t,e=0){return this._target[0]=t[e],this._target[1]=t[e+1],this._target[2]=t[e+2],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t}}class We{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new Y,this.worldMatrix=new Y,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new P,this.quaternion=new Ee,this.scale=new P(1),this.rotation=new Ve,this.up=new P(0,1,0),this.rotation._target.onChange=()=>this.quaternion.fromEuler(this.rotation,!0),this.quaternion._target.onChange=()=>this.rotation.fromQuaternion(this.quaternion,void 0,!0)}setParent(t,e=!0){this.parent&&t!==this.parent&&this.parent.removeChild(this,!1),this.parent=t,e&&t&&t.addChild(this,!1)}addChild(t,e=!0){~this.children.indexOf(t)||this.children.push(t),e&&t.setParent(this,!1)}removeChild(t,e=!0){~this.children.indexOf(t)&&this.children.splice(this.children.indexOf(t),1),e&&t.setParent(null,!1)}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||t)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,t=!0);for(let e=0,s=this.children.length;e<s;e++)this.children[e].updateMatrixWorld(t)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(t){if(!t(this))for(let e=0,s=this.children.length;e<s;e++)this.children[e].traverse(t)}decompose(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(t,e=!1){e?this.matrix.lookAt(this.position,t,this.up):this.matrix.lookAt(t,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}}function je(i,t){return i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[4],i[4]=t[5],i[5]=t[6],i[6]=t[8],i[7]=t[9],i[8]=t[10],i}function Ze(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=e+e,l=s+s,h=r+r,o=e*a,c=s*a,u=s*l,f=r*a,d=r*l,g=r*h,p=n*a,m=n*l,v=n*h;return i[0]=1-u-g,i[3]=c-v,i[6]=f+m,i[1]=c+v,i[4]=1-o-g,i[7]=d-p,i[2]=f-m,i[5]=d+p,i[8]=1-o-u,i}function He(i,t){return i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],i[4]=t[4],i[5]=t[5],i[6]=t[6],i[7]=t[7],i[8]=t[8],i}function Qe(i,t,e,s,r,n,a,l,h,o){return i[0]=t,i[1]=e,i[2]=s,i[3]=r,i[4]=n,i[5]=a,i[6]=l,i[7]=h,i[8]=o,i}function Je(i){return i[0]=1,i[1]=0,i[2]=0,i[3]=0,i[4]=1,i[5]=0,i[6]=0,i[7]=0,i[8]=1,i}function Ke(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=t[4],l=t[5],h=t[6],o=t[7],c=t[8],u=c*a-l*o,f=-c*n+l*h,d=o*n-a*h,g=e*u+s*f+r*d;return g?(g=1/g,i[0]=u*g,i[1]=(-c*s+r*o)*g,i[2]=(l*s-r*a)*g,i[3]=f*g,i[4]=(c*e-r*h)*g,i[5]=(-l*e+r*n)*g,i[6]=d*g,i[7]=(-o*e+s*h)*g,i[8]=(a*e-s*n)*g,i):null}function At(i,t,e){let s=t[0],r=t[1],n=t[2],a=t[3],l=t[4],h=t[5],o=t[6],c=t[7],u=t[8],f=e[0],d=e[1],g=e[2],p=e[3],m=e[4],v=e[5],_=e[6],y=e[7],x=e[8];return i[0]=f*s+d*a+g*o,i[1]=f*r+d*l+g*c,i[2]=f*n+d*h+g*u,i[3]=p*s+m*a+v*o,i[4]=p*r+m*l+v*c,i[5]=p*n+m*h+v*u,i[6]=_*s+y*a+x*o,i[7]=_*r+y*l+x*c,i[8]=_*n+y*h+x*u,i}function ti(i,t,e){let s=t[0],r=t[1],n=t[2],a=t[3],l=t[4],h=t[5],o=t[6],c=t[7],u=t[8],f=e[0],d=e[1];return i[0]=s,i[1]=r,i[2]=n,i[3]=a,i[4]=l,i[5]=h,i[6]=f*s+d*a+o,i[7]=f*r+d*l+c,i[8]=f*n+d*h+u,i}function ei(i,t,e){let s=t[0],r=t[1],n=t[2],a=t[3],l=t[4],h=t[5],o=t[6],c=t[7],u=t[8],f=Math.sin(e),d=Math.cos(e);return i[0]=d*s+f*a,i[1]=d*r+f*l,i[2]=d*n+f*h,i[3]=d*a-f*s,i[4]=d*l-f*r,i[5]=d*h-f*n,i[6]=o,i[7]=c,i[8]=u,i}function ii(i,t,e){let s=e[0],r=e[1];return i[0]=s*t[0],i[1]=s*t[1],i[2]=s*t[2],i[3]=r*t[3],i[4]=r*t[4],i[5]=r*t[5],i[6]=t[6],i[7]=t[7],i[8]=t[8],i}function si(i,t){let e=t[0],s=t[1],r=t[2],n=t[3],a=t[4],l=t[5],h=t[6],o=t[7],c=t[8],u=t[9],f=t[10],d=t[11],g=t[12],p=t[13],m=t[14],v=t[15],_=e*l-s*a,y=e*h-r*a,x=e*o-n*a,w=s*h-r*l,b=s*o-n*l,z=r*o-n*h,I=c*p-u*g,B=c*m-f*g,T=c*v-d*g,L=u*m-f*p,F=u*v-d*p,O=f*v-d*m,M=_*O-y*F+x*L+w*T-b*B+z*I;return M?(M=1/M,i[0]=(l*O-h*F+o*L)*M,i[1]=(h*T-a*O-o*B)*M,i[2]=(a*F-l*T+o*I)*M,i[3]=(r*F-s*O-n*L)*M,i[4]=(e*O-r*T+n*B)*M,i[5]=(s*T-e*F-n*I)*M,i[6]=(p*z-m*b+v*w)*M,i[7]=(m*x-g*z-v*y)*M,i[8]=(g*b-p*x+v*_)*M,i):null}class ri extends Array{constructor(t=1,e=0,s=0,r=0,n=1,a=0,l=0,h=0,o=1){return super(t,e,s,r,n,a,l,h,o),this}set(t,e,s,r,n,a,l,h,o){return t.length?this.copy(t):(Qe(this,t,e,s,r,n,a,l,h,o),this)}translate(t,e=this){return ti(this,e,t),this}rotate(t,e=this){return ei(this,e,t),this}scale(t,e=this){return ii(this,e,t),this}multiply(t,e){return e?At(this,t,e):At(this,this,t),this}identity(){return Je(this),this}copy(t){return He(this,t),this}fromMatrix4(t){return je(this,t),this}fromQuaternion(t){return Ze(this,t),this}fromBasis(t,e,s){return this.set(t[0],t[1],t[2],e[0],e[1],e[2],s[0],s[1],s[2]),this}inverse(t=this){return Ke(this,t),this}getNormalMatrix(t){return si(this,t),this}}let ni=0;class ai extends We{constructor(t,{geometry:e,program:s,mode:r=t.TRIANGLES,frustumCulled:n=!0,renderOrder:a=0}={}){super(),t.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=t,this.id=ni++,this.geometry=e,this.program=s,this.mode=r,this.frustumCulled=n,this.renderOrder=a,this.modelViewMatrix=new Y,this.normalMatrix=new ri,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(t){return this.beforeRenderCallbacks.push(t),this}onAfterRender(t){return this.afterRenderCallbacks.push(t),this}draw({camera:t}={}){t&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=t.projectionMatrix,this.program.uniforms.cameraPosition.value=t.worldPosition,this.program.uniforms.viewMatrix.value=t.viewMatrix,this.modelViewMatrix.multiply(t.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t}));let e=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:e}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t}))}}const _t={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function Et(i){i.length===4&&(i=i[0]+i[1]+i[1]+i[2]+i[2]+i[3]+i[3]);const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i);return t||console.warn(`Unable to convert hex string ${i} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function li(i){return i=parseInt(i),[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}function Rt(i){return i===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(i)?i[0]==="#"?Et(i):_t[i.toLowerCase()]?Et(_t[i.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0]):li(i)}class C extends Array{constructor(t){return Array.isArray(t)?super(...t):super(...Rt(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(t){this[0]=t}set g(t){this[1]=t}set b(t){this[2]=t}set(t){return Array.isArray(t)?this.copy(t):this.copy(Rt(...arguments))}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this}}function hi(i,t){return i[0]=t[0],i[1]=t[1],i}function oi(i,t,e){return i[0]=t,i[1]=e,i}function zt(i,t,e){return i[0]=t[0]+e[0],i[1]=t[1]+e[1],i}function Tt(i,t,e){return i[0]=t[0]-e[0],i[1]=t[1]-e[1],i}function ci(i,t,e){return i[0]=t[0]*e[0],i[1]=t[1]*e[1],i}function ui(i,t,e){return i[0]=t[0]/e[0],i[1]=t[1]/e[1],i}function K(i,t,e){return i[0]=t[0]*e,i[1]=t[1]*e,i}function fi(i,t){var e=t[0]-i[0],s=t[1]-i[1];return Math.sqrt(e*e+s*s)}function di(i,t){var e=t[0]-i[0],s=t[1]-i[1];return e*e+s*s}function Ft(i){var t=i[0],e=i[1];return Math.sqrt(t*t+e*e)}function gi(i){var t=i[0],e=i[1];return t*t+e*e}function pi(i,t){return i[0]=-t[0],i[1]=-t[1],i}function mi(i,t){return i[0]=1/t[0],i[1]=1/t[1],i}function vi(i,t){var e=t[0],s=t[1],r=e*e+s*s;return r>0&&(r=1/Math.sqrt(r)),i[0]=t[0]*r,i[1]=t[1]*r,i}function xi(i,t){return i[0]*t[0]+i[1]*t[1]}function It(i,t){return i[0]*t[1]-i[1]*t[0]}function yi(i,t,e,s){var r=t[0],n=t[1];return i[0]=r+s*(e[0]-r),i[1]=n+s*(e[1]-n),i}function bi(i,t,e,s,r){const n=Math.exp(-s*r);let a=t[0],l=t[1];return i[0]=e[0]+(a-e[0])*n,i[1]=e[1]+(l-e[1])*n,i}function wi(i,t,e){var s=t[0],r=t[1];return i[0]=e[0]*s+e[3]*r+e[6],i[1]=e[1]*s+e[4]*r+e[7],i}function Mi(i,t,e){let s=t[0],r=t[1];return i[0]=e[0]*s+e[4]*r+e[12],i[1]=e[1]*s+e[5]*r+e[13],i}function Si(i,t){return i[0]===t[0]&&i[1]===t[1]}class tt extends Array{constructor(t=0,e=t){return super(t,e),this}get x(){return this[0]}get y(){return this[1]}set x(t){this[0]=t}set y(t){this[1]=t}set(t,e=t){return t.length?this.copy(t):(oi(this,t,e),this)}copy(t){return hi(this,t),this}add(t,e){return e?zt(this,t,e):zt(this,this,t),this}sub(t,e){return e?Tt(this,t,e):Tt(this,this,t),this}multiply(t){return t.length?ci(this,this,t):K(this,this,t),this}divide(t){return t.length?ui(this,this,t):K(this,this,1/t),this}inverse(t=this){return mi(this,t),this}len(){return Ft(this)}distance(t){return t?fi(this,t):Ft(this)}squaredLen(){return this.squaredDistance()}squaredDistance(t){return t?di(this,t):gi(this)}negate(t=this){return pi(this,t),this}cross(t,e){return e?It(t,e):It(this,t)}scale(t){return K(this,this,t),this}normalize(){return vi(this,this),this}dot(t){return xi(this,t)}equals(t){return Si(this,t)}applyMatrix3(t){return wi(this,this,t),this}applyMatrix4(t){return Mi(this,this,t),this}lerp(t,e){return yi(this,this,t,e),this}smoothLerp(t,e,s){return bi(this,this,t,e,s),this}clone(){return new tt(this[0],this[1])}fromArray(t,e=0){return this[0]=t[e],this[1]=t[e+1],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t}}class Ci extends ee{constructor(t,{attributes:e={}}={}){Object.assign(e,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(t,e)}}class Bt{constructor(t,e,s={}){this.canvas=t,this.#r=null,this.#n=0,this.#o=0,this.#a=!1,this.#h=null,this.loop=()=>{this.#a&&(this.render(),this.#r=requestAnimationFrame(this.loop))},this.#e=e;const r=s.pixelRatio??1,n=Math.max(.1,Math.min(4,r));this.#l=(s.renderScale??1)*n,this.#f=s.singleRender??!1;let a=s.width||300,l=s.height||300;if(!s.width||!s.height){const c=this.canvas.getBoundingClientRect();c.width>0&&(a=c.width),c.height>0&&(l=c.height)}this.#c=a,this.#u=l;const h=Math.max(1,Math.floor(a*this.#l)),o=Math.max(1,Math.floor(l*this.#l));this.#i=new he({canvas:this.canvas,width:h,height:o,alpha:!1,dpr:1}),this.gl=this.#i.gl,this.canvas.width=h,this.canvas.height=o,this.#i.setSize(h,o),this.canvas.style.width=`${a}px`,this.canvas.style.height=`${l}px`,this.init()}#i;#t;#s;#e;#r;#n;#o;#a;#l;#f;#c;#u;#h;init(){const t=new Ci(this.gl),e={uTime:{value:0},uResolution:{value:new tt(this.#c,this.#u)}};this.#s=new se(this.gl,{vertex:this.#e.vertexShader||Ai,fragment:this.#e.fragmentShader,uniforms:{...e,...this.#e.uniforms},depthTest:!1,cullFace:!1}),this.#t=new ai(this.gl,{geometry:t,program:this.#s}),this.#e.onInit&&this.#e.onInit(this.gl,this.#s)}start(){this.#a||(this.#a=!0,this.#n=performance.now(),this.#f?(this.render(),this.#a=!1):this.loop())}stop(){this.#a=!1,this.#r!==null&&(cancelAnimationFrame(this.#r),this.#r=null)}render(){if(this.#h){const{renderWidth:s,renderHeight:r}=this.#h;this.#h=null,this.canvas.width=s,this.canvas.height=r,this.#i.setSize(s,r),this.canvas.style.width=`${this.#c}px`,this.canvas.style.height=`${this.#u}px`}const t=performance.now(),e=t-this.#n;this.#n=t,this.#o+=e*.001,this.#s.uniforms.uTime.value=this.#o,this.#e.onRender&&this.#e.onRender(e,this.#o),this.#i.render({scene:this.#t})}resize(t,e){if(t===void 0||e===void 0){const n=this.canvas.getBoundingClientRect();t=Math.max(1,n.width),e=Math.max(1,n.height)}this.#c=t,this.#u=e;const s=Math.max(1,Math.floor(t*this.#l)),r=Math.max(1,Math.floor(e*this.#l));this.canvas.style.width=`${t}px`,this.canvas.style.height=`${e}px`,this.#f?this.#h={renderWidth:s,renderHeight:r}:(this.canvas.width=s,this.canvas.height=r,this.#i.setSize(s,r),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${e}px`),this.#s&&this.#s.uniforms.uResolution.value.set(t,e),this.#e.onResize&&this.#e.onResize(t,e)}dispose(){this.stop()}}const Ai=`
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`,G=class G{constructor(t,e={}){rt(this,A);rt(this,X);this.name="gradient-points",this.fragmentShader=`
    precision highp float;
    
    uniform float uTime;
    uniform vec2 uResolution;
    
    uniform int uPointCount;
    uniform vec2 uPoints[${G.MAX_POINTS}];
    uniform vec3 uColors[${G.MAX_POINTS}];
    
    varying vec2 vUv;

    void main() {
      // 1. Normalize UVs to preserve aspect ratio
      // This ensures points placed at (0.5, 0.5) look correct on rectangles
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv * 2.0 - 1.0; // Transform UV 0..1 to -1..1
      uv.x *= aspect;

      vec3 finalColor = vec3(0.0);
      float totalWeight = 0.0;

      for (int i = 0; i < ${G.MAX_POINTS}; i++) {
        if (i >= uPointCount) break;

        vec2 p = uPoints[i];
        p.x *= aspect; // Apply same aspect correction to point

        // Calculate Distance
        float dist = distance(uv, p);
        
        // Weight Function: 1 / (dist^power)
        // Power controls how "fat" the points are. 
        // 2.0 is standard (Gravity), lower (e.g. 1.5) is softer/fuzzier.
        float w = 1.0 / pow(dist, 2.0);
        
        // Clamp weight to avoid infinity at exact point location
        w = min(w, 1000.0);

        finalColor += uColors[i] * w;
        totalWeight += w;
      }

      // Avoid division by zero
      if (totalWeight > 0.0) {
        finalColor /= totalWeight;
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,nt(this,X,[]),t.length>G.MAX_POINTS&&(console.warn(`GradientPlugin: Max points is ${G.MAX_POINTS}. Truncating.`),t=t.slice(0,G.MAX_POINTS)),this.pointsConfig=t,this.defaultMotion=e.defaultMotion??{},nt(this,X,t.map(n=>(n.colors??[]).map(a=>{const l=new C(a);return[l.r,l.g,l.b]}))),this.colorStates=t.map(()=>({currentIdx:0,nextIdx:1%2,t:0})),this.motionStates=t.map(n=>R(this,A,Gt).call(this,n));const s=new Array(G.MAX_POINTS),r=new Array(G.MAX_POINTS);t.forEach((n,a)=>{s[a]=[n.x,n.y];const l=V(this,X)[a]?.[0]??[0,0,0];r[a]=[l[0],l[1],l[2]],n.colors.length<2?this.colorStates[a].nextIdx=0:this.colorStates[a].nextIdx=1});for(let n=t.length;n<G.MAX_POINTS;n++)s[n]=[0,0],r[n]=[0,0,0];this.uniforms={uPointCount:{value:t.length},uPoints:{value:s},uColors:{value:r}}}onRender(t){const e=this.uniforms.uPoints.value,s=this.uniforms.uColors.value;this.pointsConfig.forEach((r,n)=>{const a=this.motionStates[n];if(R(this,A,Dt).call(this,r,a,t),e[n][0]=a.x,e[n][1]=a.y,r.colors.length<=1)return;const l=this.colorStates[n],h=r.speed||1;l.t+=t*.001*h,l.t>=1&&(l.t=0,l.currentIdx=l.nextIdx,l.nextIdx=(l.nextIdx+1)%r.colors.length);const o=V(this,X)[n][l.currentIdx],c=V(this,X)[n][l.nextIdx],u=o[0]+(c[0]-o[0])*l.t,f=o[1]+(c[1]-o[1])*l.t,d=o[2]+(c[2]-o[2])*l.t;s[n][0]=u,s[n][1]=f,s[n][2]=d})}};X=new WeakMap,A=new WeakSet,D=function(t,e,s){return Math.max(e,Math.min(s,t))},$=function(t,e,s){return t+(e-t)*s},kt=function(t,e){const s=R(this,A,D).call(this,t,0,1);switch(e){case"linear":return s;case"easeInOutQuad":return s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;case"easeInOutCubic":return s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2;default:return s*s*(3-2*s)}},at=function(t){const e={...this.defaultMotion,...t.motion??{}},s={minX:-1,maxX:1,minY:-1,maxY:1,...e.bounds??{}};return s.minX>s.maxX&&([s.minX,s.maxX]=[s.maxX,s.minX]),s.minY>s.maxY&&([s.minY,s.maxY]=[s.maxY,s.minY]),{mode:e.mode??"none",path:e.path??[],duration:Math.max(.001,e.duration??3),easing:e.easing??"smoothstep",bounds:s,randomRadius:Math.max(0,e.randomRadius??0)}},W=function(t,e,s,r){if(r>0){const n=Math.random()*Math.PI*2,a=Math.sqrt(Math.random())*r,l=t+Math.cos(n)*a,h=e+Math.sin(n)*a;return{x:R(this,A,D).call(this,l,s.minX,s.maxX),y:R(this,A,D).call(this,h,s.minY,s.maxY)}}return{x:R(this,A,$).call(this,s.minX,s.maxX,Math.random()),y:R(this,A,$).call(this,s.minY,s.maxY,Math.random())}},Gt=function(t){const e=R(this,A,at).call(this,t),s={mode:e.mode,easing:e.easing,duration:e.duration,bounds:e.bounds,randomRadius:e.randomRadius,startX:t.x,startY:t.y,targetX:t.x,targetY:t.y,t:1,pathIndex:0,x:t.x,y:t.y};if(e.mode==="path"&&e.path.length>0)s.targetX=R(this,A,D).call(this,e.path[0].x,e.bounds.minX,e.bounds.maxX),s.targetY=R(this,A,D).call(this,e.path[0].y,e.bounds.minY,e.bounds.maxY),s.t=0;else if(e.mode==="random"){const r=R(this,A,W).call(this,t.x,t.y,e.bounds,e.randomRadius);s.targetX=r.x,s.targetY=r.y,s.t=0}return s},Dt=function(t,e,s){const r=R(this,A,at).call(this,t),n=e.mode!==r.mode,a=e.easing!==r.easing,l=e.duration!==r.duration,h=e.bounds.minX!==r.bounds.minX||e.bounds.maxX!==r.bounds.maxX||e.bounds.minY!==r.bounds.minY||e.bounds.maxY!==r.bounds.maxY,o=e.randomRadius!==r.randomRadius;if(n||a||l||h||o)if(e.mode=r.mode,e.easing=r.easing,e.duration=r.duration,e.bounds=r.bounds,e.randomRadius=r.randomRadius,e.startX=e.x,e.startY=e.y,e.t=0,e.pathIndex=0,r.mode==="path"&&r.path.length>0)e.targetX=R(this,A,D).call(this,r.path[0].x,r.bounds.minX,r.bounds.maxX),e.targetY=R(this,A,D).call(this,r.path[0].y,r.bounds.minY,r.bounds.maxY);else if(r.mode==="random"){const u=R(this,A,W).call(this,t.x,t.y,r.bounds,r.randomRadius);e.targetX=u.x,e.targetY=u.y}else e.targetX=t.x,e.targetY=t.y,e.t=1;if(r.mode==="none"){e.x=R(this,A,D).call(this,t.x,r.bounds.minX,r.bounds.maxX),e.y=R(this,A,D).call(this,t.y,r.bounds.minY,r.bounds.maxY),e.startX=e.x,e.startY=e.y,e.targetX=e.x,e.targetY=e.y,e.t=1;return}if(e.t+=s/(r.duration*1e3),e.t>=1)if(e.x=e.targetX,e.y=e.targetY,e.startX=e.x,e.startY=e.y,e.t=0,r.mode==="path"){if(r.path.length===0){e.targetX=e.x,e.targetY=e.y,e.t=1;return}e.pathIndex=(e.pathIndex+1)%r.path.length;const u=r.path[e.pathIndex];e.targetX=R(this,A,D).call(this,u.x,r.bounds.minX,r.bounds.maxX),e.targetY=R(this,A,D).call(this,u.y,r.bounds.minY,r.bounds.maxY)}else{const u=R(this,A,W).call(this,t.x,t.y,r.bounds,r.randomRadius);e.targetX=u.x,e.targetY=u.y}const c=R(this,A,kt).call(this,e.t,r.easing);e.x=R(this,A,$).call(this,e.startX,e.targetX,c),e.y=R(this,A,$).call(this,e.startY,e.targetY,c)},G.MAX_POINTS=16;let et=G;class _i{constructor(t){this.name="grainy-fog",this.fragmentShader=`
    precision highp float;
    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uBgColor;
    uniform float uGrain;
    uniform float uScale;
    uniform float uContrast;
    uniform int uOctaves;
    uniform float uLacunarity;
    uniform float uGain;
    
    varying vec2 vUv;

    // --- Value Noise / FBM ---
    float hash12(vec2 p) {
      // Dave Hoskins-ish: cheap, stable
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(in vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float freq = 1.0;

      // rotate to reduce axial bias
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

      for (int i = 0; i < 6; i++) {
        if (i >= uOctaves) break;
        value += amplitude * noise(st * freq);
        st = rot * st + 19.19;
        freq *= uLacunarity;
        amplitude *= uGain;
      }

      return value;
    }

    void main() {
      vec2 uv = vUv;

      // aspect-correct domain
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTimeInternal;

      // Two-layer flow field -> richer motion
      vec2 q;
      q.x = fbm(p * uScale + vec2(0.0, 0.12 * t));
      q.y = fbm(p * (uScale * 0.9) + vec2(3.1, -0.08 * t));

      vec2 r;
      r.x = fbm(p * (uScale * 1.2) + 1.7 * q + vec2(1.7, 9.2) + 0.15 * t);
      r.y = fbm(p * (uScale * 1.1) + 1.3 * q + vec2(8.3, 2.8) + 0.11 * t);

      float f = fbm(p * uScale + r);

      // Contrast curve (keeps highlights punchy)
      f = pow(clamp(f, 0.0, 1.0), 1.0 / max(0.001, uContrast));

      // Color mix
      vec3 col = uBgColor;
      col = mix(col, uColor1, smoothstep(0.10, 0.85, f));
      col = mix(col, uColor2, smoothstep(0.15, 0.95, length(q)));

      // Film grain in pixel space (stable-ish)
      vec2 px = uv * uResolution;
      float g = (hash12(px + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.firstColor),s=new C(t.secondColor),r=new C(t.backgroundColor);this.speed=t.speed??1,this.uniforms={uColor1:{value:[e.r,e.g,e.b]},uColor2:{value:[s.r,s.g,s.b]},uBgColor:{value:[r.r,r.g,r.b]},uGrain:{value:t.grainAmount??.12},uScale:{value:t.scale??2.25},uContrast:{value:t.contrast??1.25},uOctaves:{value:Math.max(1,Math.min(6,t.octaves??4))},uLacunarity:{value:t.lacunarity??2},uGain:{value:t.gain??.5},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Ei{constructor(t){this.name="retro-grid",this.fragmentShader=`
    precision highp float;
    uniform float uTime;
    uniform vec3 uGridColor;
    uniform vec3 uBgColor;
    uniform float uSpeed;

    varying vec2 vUv;

    void main() {
        // Normalize UV to -1 to 1
        vec2 uv = vUv * 2.0 - 1.0;
        
        // Hoziron offset
        float horizon = 0.0; 
        float fov = 0.5; 

        // 3D Projection Logic
        // We only care about the bottom half for the floor
        if (uv.y > horizon) {
            // Sky (simple gradient or solid)
            gl_FragColor = vec4(uBgColor, 1.0);
            return;
        }

        // Project the 2D pixel to 3D floor coordinates
        // x = uv.x / |y| to flare out perspective
        // z = 1.0 / |y| to simulate depth
        float floorY = abs(uv.y - horizon);
        vec3 coord = vec3(uv.x / floorY, floorY, 1.0 / floorY);
        
        // Move the grid by time
        coord.z += uTime * uSpeed;

        // Grid Logic
        vec2 gridUV = coord.xz * fov;
        vec2 grid = fract(gridUV) - 0.5;
        
        // Thickness of lines (derivative for anti-aliasing approximation or hard coded)
        float line = min(abs(grid.x), abs(grid.y));
        
        float gridVal = 1.0 - smoothstep(0.0, 0.05 * coord.z, line);

        // Fade out grid near horizon (fog)
        float fog = smoothstep(0.0, 1.5, floorY);

        vec3 color = mix(uBgColor, uGridColor, gridVal * fog);

        gl_FragColor = vec4(color, 1.0);
    }
  `;const e=new C(t.gridColor),s=new C(t.backgroundColor);this.uniforms={uGridColor:{value:[e.r,e.g,e.b]},uBgColor:{value:[s.r,s.g,s.b]},uSpeed:{value:t.speed??1}}}}const q=class q{constructor(t){this.name="liquid-orb",this.fragmentShader=`
    precision highp float;
    uniform vec2 uResolution;
    uniform vec3 uColor;
    uniform vec3 uBgColor;
    uniform float uGooeyness;
    uniform float uEdgeSoftness;
    
    uniform int uCount;
    uniform vec3 uOrbs[${q.MAX_ORBS}]; // x, y, radius

    varying vec2 vUv;

    // Smooth Minimum function (The "Goo" math)
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }

    void main() {
        float aspect = uResolution.x / uResolution.y;
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= aspect;

        // Calculate Signed Distance Field (SDF)
        // Start with a large distance
        float d = 100.0;

        for (int i = 0; i < ${q.MAX_ORBS}; i++) {
            if (i >= uCount) break;
            
            vec3 orb = uOrbs[i];
            vec2 pos = orb.xy;
            pos.x *= aspect; // Correct aspect for orb position too
            
            float radius = orb.z;
            
            // Distance from pixel to orb center minus radius
            float dist = length(uv - pos) - radius;
            
            // Smoothly blend distances
            d = smin(d, dist, uGooeyness);
        }

        // Render based on threshold
        // If d < 0.0, we are inside the goo
        // We use smoothstep for antialiasing the edge
        float alpha = 1.0 - smoothstep(0.0, max(0.0001, uEdgeSoftness), d);

        vec3 color = mix(uBgColor, uColor, alpha);

        gl_FragColor = vec4(color, 1.0);
    }
  `,this.orbs=[],this.orbData=[];const e=new C(t.color),s=new C(t.backgroundColor),r=Math.min(t.count??5,q.MAX_ORBS);this.speedMultiplier=t.speed??.5;for(let n=0;n<r;n++)this.orbs.push({x:(Math.random()*2-1)*.8,y:(Math.random()*2-1)*.8,vx:(Math.random()-.5)*.01,vy:(Math.random()-.5)*.01,radius:.2+Math.random()*.2});this.orbData=Array.from({length:q.MAX_ORBS},()=>[0,0,0]),this.uniforms={uColor:{value:[e.r,e.g,e.b]},uBgColor:{value:[s.r,s.g,s.b]},uCount:{value:r},uOrbs:{value:this.orbData},uGooeyness:{value:t.gooeyness??.3},uEdgeSoftness:{value:t.edgeSoftness??.02}}}onRender(t){let e=0;for(const s of this.orbs){s.x+=s.vx*this.speedMultiplier*(t/16),s.y+=s.vy*this.speedMultiplier*(t/16),(s.x<-1||s.x>1)&&(s.vx*=-1),(s.y<-1||s.y>1)&&(s.vy*=-1);const r=this.orbData[e];r[0]=s.x,r[1]=s.y,r[2]=s.radius,e++}}};q.MAX_ORBS=20;let it=q;class Ri{constructor(t){this.name="caustics",this.fragmentShader=`
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal; 
    uniform vec2 uResolution;
    uniform vec3 uColor;
    uniform vec3 uBgColor;
    uniform float uIntensity;
    uniform float uScale;
    uniform float uDistortion;
    uniform float uSharpness;
    uniform float uAA;
    
    varying vec2 vUv;

    float aawidth(float x) {
      #ifdef GL_OES_standard_derivatives
      return fwidth(x);
      #else
      // Fallback: approximate 1 pixel in normalized space.
      return 1.0 / max(1.0, min(uResolution.x, uResolution.y));
      #endif
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    // Textureless "caustics-ish" pattern: warped cells + exponential falloff
    float caustics(vec2 p, float t) {
      float c = 0.0;
      float a = 1.0;

      // Add a slow, large-scale warp so it doesn't look like static tiles
      p += uDistortion * vec2(
        sin(p.y * 1.7 + t * 0.8),
        sin(p.x * 1.3 - t * 0.7)
      );

      for (int i = 0; i < 4; i++) {
        // repeat + distance to nearest cell edge (0 at edges)
        vec2 q = abs(fract(p) - 0.5);
        float edgeDist = min(q.x, q.y);

        // Derivative-based AA: widen the transition as frequency increases
        float w = aawidth(edgeDist) * (1.0 + uAA * 2.0);

        // Bright lines near edges, with controllable sharpness
        float line = 1.0 - smoothstep(0.0, w, edgeDist);
        // Emphasize peaks without introducing harsh aliasing
        float web = pow(clamp(line, 0.0, 1.0), uSharpness);
        c += web * a;

        // zoom and drift
        p = p * 1.65 + vec2(0.12 * t, -0.10 * t);
        p += (hash12(p + float(i) * 7.7) - 0.5) * 0.25;
        a *= 0.72;
      }

      return c;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // scale in aspect-correct domain
      p *= uScale;

      float c = caustics(p, t);

      // shape + intensity
      float brightness = pow(clamp(c, 0.0, 2.0), 1.35) * uIntensity;

      vec3 col = uBgColor + uColor * brightness;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.color),s=new C(t.backgroundColor);this.speed=t.speed??.5,this.uniforms={uColor:{value:[e.r,e.g,e.b]},uBgColor:{value:[s.r,s.g,s.b]},uIntensity:{value:t.intensity??1},uScale:{value:t.scale??2.2},uDistortion:{value:t.distortion??.9},uSharpness:{value:t.sharpness??3.2},uAA:{value:t.antiAlias??1},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class zi{constructor(t){this.name="aurora-waves",this.fragmentShader=`
    precision highp float;
    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg;
    uniform vec3 uC1;
    uniform vec3 uC2;
    uniform float uIntensity;
    uniform float uScale;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.02 + 19.19;
        a *= 0.55;
      }
      return v;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTimeInternal;
      vec3 col = uBg;

      // Ribbon field: layered sin waves warped by fbm
      float warp = fbm(p * (uScale * 0.9) + vec2(0.0, 0.10 * t));
      float warp2 = fbm(p * (uScale * 1.3) + vec2(4.0, -0.07 * t));
      float y = p.y + (warp - 0.5) * 0.55 + (warp2 - 0.5) * 0.35;

      // Multiple ribbons at different heights
      float band1 = exp(-pow((y - 0.15 + 0.08 * sin(p.x * 1.2 + t * 0.6)), 2.0) * 18.0);
      float band2 = exp(-pow((y + 0.05 + 0.10 * sin(p.x * 0.9 - t * 0.5)), 2.0) * 14.0);
      float band3 = exp(-pow((y - 0.35 + 0.06 * sin(p.x * 1.6 + t * 0.4)), 2.0) * 22.0);

      float bands = clamp(band1 + 0.8 * band2 + 0.6 * band3, 0.0, 1.5);
      // Soft flicker-free shimmer via low-frequency fbm
      float shimmer = 0.65 + 0.35 * fbm(p * (uScale * 0.6) + vec2(2.0, t * 0.12));

      vec3 aur = mix(uC1, uC2, clamp(0.5 + 0.5 * sin(p.x * 0.7 + t * 0.25 + warp * 2.0), 0.0, 1.0));
      col += aur * (bands * shimmer) * uIntensity;

      // Gentle vertical fade (so content remains readable)
      float fade = smoothstep(-0.9, 0.2, p.y);
      col = mix(col, uBg, fade * 0.35);

      // Grain
      float g = (hash12(uv * uResolution + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.backgroundColor),s=new C(t.color1),r=new C(t.color2);this.speed=t.speed??.6,this.uniforms={uBg:{value:[e.r,e.g,e.b]},uC1:{value:[s.r,s.g,s.b]},uC2:{value:[r.r,r.g,r.b]},uIntensity:{value:t.intensity??.9},uScale:{value:t.scale??1.6},uGrain:{value:t.grainAmount??.05},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Ti{constructor(t){this.name="soft-starfield",this.fragmentShader=`
    precision highp float;
    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg0;
    uniform vec3 uBg1;
    uniform vec3 uStar;
    uniform vec3 uNebula;
    uniform float uDensity;
    uniform float uSize;
    uniform float uTwinkle;
    uniform float uNebulaAmt;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.02 + 19.19;
        a *= 0.55;
      }
      return v;
    }

    // Simple cell-star: one star candidate per cell, softly drawn.
    float starLayer(vec2 uv, float scale, float t) {
      vec2 p = uv * scale;
      vec2 i = floor(p);
      vec2 f = fract(p) - 0.5;
      float rnd = hash12(i);

      // place star within cell
      vec2 o = vec2(hash12(i + 13.1), hash12(i + 71.7)) - 0.5;
      vec2 d = f - o * 0.45;

      // size distribution: many small, few larger
      float sz = mix(0.012, 0.035, pow(rnd, 7.0)) * uSize;
      float core = exp(-dot(d, d) / (sz * sz));

      // twinkle: slow, subtle (avoid distracting flicker)
      float tw = 1.0 + (sin((rnd * 12.0) + t * 1.5) * 0.5 + 0.5) * uTwinkle;

      // probability via rnd threshold (density)
      float present = step(0.55, rnd) * clamp(uDensity, 0.0, 3.0);
      return core * tw * present;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Background gradient
      vec3 col = mix(uBg0, uBg1, smoothstep(-0.6, 0.8, p.y));

      // Nebula: soft, low-contrast clouds
      float n = fbm(p * 1.35 + vec2(-0.05 * t, 0.02 * t));
      float n2 = fbm(p * 2.10 + vec2(0.03 * t, -0.04 * t));
      float neb = smoothstep(0.25, 0.85, n * 0.75 + n2 * 0.35);
      col += uNebula * neb * uNebulaAmt;

      // Stars: 3 layers parallax-ish
      float s1 = starLayer(uv + vec2(-0.010 * t, 0.006 * t), 55.0, t);
      float s2 = starLayer(uv + vec2(-0.020 * t, 0.010 * t), 90.0, t + 7.7) * 0.8;
      float s3 = starLayer(uv + vec2(-0.035 * t, 0.016 * t), 140.0, t + 13.3) * 0.6;
      float stars = clamp(s1 + s2 + s3, 0.0, 1.75);
      col += uStar * stars;

      // Grain
      float g = (hash12(uv * uResolution + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.backgroundBottom),s=new C(t.backgroundTop),r=new C(t.starColor??"#ffffff"),n=new C(t.nebulaColor??"#6a5cff");this.speed=t.speed??.2,this.uniforms={uBg0:{value:[e.r,e.g,e.b]},uBg1:{value:[s.r,s.g,s.b]},uStar:{value:[r.r,r.g,r.b]},uNebula:{value:[n.r,n.g,n.b]},uDensity:{value:t.density??1},uSize:{value:t.size??1},uTwinkle:{value:t.twinkle??.35},uNebulaAmt:{value:t.nebula??.35},uGrain:{value:t.grainAmount??.04},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Fi{constructor(t){this.name="contour-lines",this.fragmentShader=`
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg;
    uniform vec3 uLine;
    uniform vec3 uAccent;
    uniform float uDensity;
    uniform float uThickness;
    uniform float uWarp;
    uniform float uGlow;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.02 + 19.19;
        a *= 0.55;
      }
      return v;
    }

    float aawidth(float x) {
      #ifdef GL_OES_standard_derivatives
      return fwidth(x);
      #else
      return 1.0 / max(1.0, min(uResolution.x, uResolution.y));
      #endif
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Height field
      vec2 flow = vec2(0.10 * t, -0.06 * t);
      float h = fbm(p * 1.25 + flow);
      float h2 = fbm(p * 2.10 + vec2(-0.05 * t, 0.08 * t));
      float height = h + 0.55 * h2;

      // Warp the domain so contours bend naturally
      vec2 w = vec2(
        fbm(p * 1.2 + vec2(2.0, 0.15 * t)),
        fbm(p * 1.2 + vec2(7.0, -0.12 * t))
      );
      p += (w - 0.5) * uWarp;

      // Contour function: periodic bands
      float c = fract((height + 0.35 * fbm(p * 1.75 + 4.0)) * uDensity);
      float distToLine = min(c, 1.0 - c);
      float wAA = aawidth(distToLine) * 1.4;
      float line = 1.0 - smoothstep(uThickness, uThickness + wAA, distToLine);

      // Glow around lines
      float glow = smoothstep(0.45, 0.0, distToLine) * uGlow;

      vec3 col = uBg;
      col += uLine * line;
      col += uAccent * glow;

      // Grain
      float g = (hash12(uv * uResolution + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.backgroundColor),s=new C(t.lineColor),r=new C(t.accentColor??t.lineColor);this.speed=t.speed??.35,this.uniforms={uBg:{value:[e.r,e.g,e.b]},uLine:{value:[s.r,s.g,s.b]},uAccent:{value:[r.r,r.g,r.b]},uDensity:{value:t.density??12},uThickness:{value:t.thickness??.075},uWarp:{value:t.warp??.9},uGlow:{value:t.glow??.35},uGrain:{value:t.grainAmount??.04},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Ii{constructor(t){this.name="dreamy-bokeh",this.fragmentShader=`
    precision highp float;

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg0;
    uniform vec3 uBg1;
    uniform vec3 uA;
    uniform vec3 uB;
    uniform vec3 uC;
    uniform float uDensity;
    uniform float uSize;
    uniform float uBlur;
    uniform float uVignette;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    vec2 hash22(vec2 p) {
      float n = hash12(p);
      return vec2(n, hash12(p + n + 19.19));
    }

    float softCircle(vec2 d, float r, float blur) {
      float dist = length(d);
      // inside -> 1, outside -> 0, with soft falloff
      // NOTE: smoothstep requires edge0 < edge1.
      float b = max(0.0001, blur);
      float a = 1.0 - smoothstep(max(0.0, r - b), r, dist);
      return a * a;
    }

    vec3 palette3(float h) {
      // Smoothly mix between 3 user colors
      float t0 = smoothstep(0.0, 1.0, h);
      vec3 ab = mix(uA, uB, smoothstep(0.0, 0.65, t0));
      return mix(ab, uC, smoothstep(0.35, 1.0, t0));
    }

    vec3 bokehLayer(vec2 uv, float scale, float t, float seed, float weight) {
      vec2 p = uv * scale;
      vec2 ip = floor(p);
      vec2 fp = fract(p);

      vec3 col = vec3(0.0);
      float acc = 0.0;

      // Look at neighboring cells so circles crossing boundaries still render.
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 cell = ip + vec2(float(i), float(j));
          float r0 = hash12(cell + seed);

          // density gate: fewer circles when density is low
          float present = step(0.18, r0) * clamp(uDensity, 0.0, 3.0);
          if (present <= 0.0) continue;

          vec2 o = hash22(cell + seed * 1.7);

          // Slow drift to avoid looking tiled/static.
          // Drift amplitude intentionally small for background usage.
          vec2 drift = 0.08 * vec2(
            sin(t * 0.25 + r0 * 6.2831),
            cos(t * 0.21 + r0 * 4.9132)
          );

          // Center in this cell (0..1), then shift to neighbor offset
          vec2 c = vec2(float(i), float(j)) + o + drift;
          vec2 d = fp - c;

          float radius = mix(0.10, 0.44, pow(r0, 2.3)) * uSize;
          float blur = mix(0.05, 0.18, hash12(cell + seed + 7.7)) * uBlur;

          float a = softCircle(d, radius, blur);

          // Add a soft “lens glow” lobe (subtle)
          float glow = exp(-dot(d, d) / max(0.0001, radius * radius) * 1.9);
          a = a * 0.72 + glow * 0.28;

          // Color per circle, slightly biased to highlight variety
          vec3 ccol = palette3(hash12(cell + seed + 3.3));

          // Gentle twinkle (avoid flicker)
          float tw = 1.0 + 0.12 * sin(t * 1.1 + r0 * 10.0);

          col += ccol * a * tw;
          acc += a;
        }
      }

      // Normalize by accumulated alpha to keep brightness stable.
      col *= weight / (1.0 + acc * 0.85);
      return col;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Background gradient with a slight vertical curve.
      float g = smoothstep(-0.7, 0.85, p.y + 0.08 * sin(p.x * 0.7));
      vec3 col = mix(uBg0, uBg1, g);

      // Multi-scale bokeh (parallax-ish via slight offsets).
      col += bokehLayer(uv + vec2(-0.010 * t, 0.006 * t), 10.0, t, 11.0, 1.0);
      col += bokehLayer(uv + vec2(-0.018 * t, 0.010 * t), 16.0, t + 3.7, 37.0, 0.9);
      col += bokehLayer(uv + vec2(-0.030 * t, 0.016 * t), 26.0, t + 9.1, 83.0, 0.7);

      // Vignette
      float v = 1.0 - smoothstep(0.25, 1.15, length(p * vec2(1.0, 0.9)));
      col *= mix(1.0, v, clamp(uVignette, 0.0, 1.0));

      // Grain
      float gr = (hash12(uv * uResolution + t * 61.0) - 0.5) * 2.0;
      col += gr * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.backgroundBottom),s=new C(t.backgroundTop),r=new C(t.colorA??"#ffd1f3"),n=new C(t.colorB??"#8be9ff"),a=new C(t.colorC??"#b7ff9b");this.speed=t.speed??.25,this.uniforms={uBg0:{value:[e.r,e.g,e.b]},uBg1:{value:[s.r,s.g,s.b]},uA:{value:[r.r,r.g,r.b]},uB:{value:[n.r,n.g,n.b]},uC:{value:[a.r,a.g,a.b]},uDensity:{value:t.density??1},uSize:{value:t.size??1},uBlur:{value:t.blur??1},uVignette:{value:t.vignette??.35},uGrain:{value:t.grainAmount??.03},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Bi{constructor(t){this.name="ink-wash",this.fragmentShader=`
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uPaper;
    uniform vec3 uInk;
    uniform float uScale;
    uniform float uFlow;
    uniform float uContrast;
    uniform float uGran;
    uniform float uVignette;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 6; i++) {
        v += a * noise(p);
        p = rot * p * 2.02 + 17.17;
        a *= 0.55;
      }
      return v;
    }

    vec2 flowField(vec2 p, float t) {
      // Curl-ish flow from two fbm samples
      float n1 = fbm(p * 1.10 + vec2(0.0,  t * 0.12));
      float n2 = fbm(p * 1.10 + vec2(13.1, -t * 0.10));
      vec2 f = vec2(n1 - 0.5, n2 - 0.5);
      return f;
    }

    float aawidth(float x) {
      #ifdef GL_OES_standard_derivatives
      return fwidth(x);
      #else
      return 1.0 / max(1.0, min(uResolution.x, uResolution.y));
      #endif
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Base paper tone + subtle fiber texture
      float fiber = noise(uv * vec2(uResolution.x, uResolution.y) * 0.0025);
      float fiber2 = noise(uv * vec2(uResolution.x, uResolution.y) * 0.0060 + 19.19);
      vec3 col = uPaper + (fiber - 0.5) * 0.05 + (fiber2 - 0.5) * 0.03;

      // Domain-warped pigment field
      vec2 q = p * uScale;
      vec2 f = flowField(q, t) * (0.55 * uFlow);
      vec2 r = flowField(q + f * 1.35, t + 7.7) * (0.55 * uFlow);
      vec2 w = f + r;

      float base = fbm(q + w);
      float detail = fbm(q * 2.10 - w * 0.70 + vec2(-0.07 * t, 0.05 * t));
      float field = base * 0.72 + detail * 0.35;

      // Contrast shaping
      field = clamp(field, 0.0, 1.0);
      field = pow(field, 1.0 / max(0.001, uContrast));

      // Pigment coverage (soft threshold)
      float edgeW = 0.08 + 0.06 * (1.0 - uFlow);
      float ink = smoothstep(0.38 - edgeW, 0.68 + edgeW, field);

      // “Tide lines”: emphasize places where the field changes quickly
      float grad = 0.0;
      #ifdef GL_OES_standard_derivatives
      grad = (abs(dFdx(field)) + abs(dFdy(field))) * 6.0;
      #else
      grad = aawidth(field) * 120.0;
      #endif
      float tide = smoothstep(0.20, 0.95, grad);
      tide *= (1.0 - ink) * 0.55 + ink * 0.25; // strongest near transitions

      // Pigment granulation: high-frequency noise visible where ink exists
      float gran = noise(q * 10.0 + vec2(31.2, 17.8)) - 0.5;
      float gran2 = noise(q * 18.0 + vec2(9.7, 53.1)) - 0.5;
      float granTex = gran * 0.8 + gran2 * 0.6;
      float granAmt = uGran * (0.35 + 0.65 * ink);

      float pigment = clamp(ink + tide * 0.35 + granTex * granAmt, 0.0, 1.0);

      // Mix ink into paper
      col = mix(col, mix(col, uInk, 0.92), pigment);

      // Vignette
      float v = 1.0 - smoothstep(0.25, 1.15, length(p * vec2(1.0, 0.95)));
      col *= mix(1.0, v, clamp(uVignette, 0.0, 1.0));

      // Grain
      float g = (hash12(uv * uResolution + t * 61.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.paperColor),s=new C(t.inkColor);this.speed=t.speed??.18,this.uniforms={uPaper:{value:[e.r,e.g,e.b]},uInk:{value:[s.r,s.g,s.b]},uScale:{value:t.scale??1.4},uFlow:{value:t.flow??.85},uContrast:{value:t.contrast??1.15},uGran:{value:t.granulation??.35},uVignette:{value:t.vignette??.35},uGrain:{value:t.grainAmount??.03},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Li{constructor(t){this.name="stained-glass",this.fragmentShader=`
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg;
    uniform vec3 uLead;
    uniform vec3 uA;
    uniform vec3 uB;
    uniform vec3 uC;
    uniform vec3 uD;
    uniform float uScale;
    uniform float uSeed;
    uniform float uJitter;
    uniform float uRotate;
    uniform int uVariant;
    uniform float uEdgeW;
    uniform float uEdgeSharp;
    uniform float uGlow;
    uniform float uDist;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    vec2 hash22(vec2 p) {
      float n = hash12(p);
      return vec2(n, hash12(p + n + 19.19));
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    vec3 palette4(float h) {
      // Blend 4 colors in a loop-friendly way.
      vec3 ab = mix(uA, uB, smoothstep(0.0, 0.50, h));
      vec3 cd = mix(uC, uD, smoothstep(0.50, 1.0, h));
      return mix(ab, cd, smoothstep(0.25, 0.85, h));
    }

    mat2 rot2(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    // Returns:
    // x: distance to nearest site
    // y: border metric (small near borders)
    // z: random id
    vec3 voronoi(vec2 x) {
      vec2 n = floor(x);
      vec2 f = fract(x);

      float md = 8.0;
      float md2 = 8.0;
      vec2 mr = vec2(0.0);
      vec2 seed2 = vec2(uSeed, uSeed * 1.618);

      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = hash22(n + g + seed2);
          // Jitter controls how "random" the site is inside the cell.
          o = mix(vec2(0.5), o, clamp(uJitter, 0.0, 1.0));
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < md) {
            md2 = md;
            md = d;
            mr = n + g + o;
          } else if (d < md2) {
            md2 = d;
          }
        }
      }

      float d1 = sqrt(md);
      float d2 = sqrt(md2);
      float border = d2 - d1; // small at edges
      return vec3(d1, border, hash12(mr + seed2));
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Subtle low-frequency warp to avoid static mosaic vibe
      vec2 warp = vec2(
        noise(p * 1.5 + vec2(0.07 * t, -0.03 * t)) - 0.5,
        noise(p * 1.5 + vec2(-0.05 * t, 0.06 * t) + 19.19) - 0.5
      );
      p += warp * (0.30 * uDist);

      // Variant transforms (changes the cell character)
      vec2 g = p;
      g = rot2(uRotate) * g;
      if (uVariant == 1) {
        // Crystal: anisotropic scaling for more "shard-like" cells
        g *= mat2(1.35, 0.35, -0.10, 0.85);
      } else if (uVariant == 2) {
        // Radial-ish twist: mild angular warp
        float ang = atan(g.y, g.x);
        float rad = length(g);
        g += 0.15 * vec2(cos(ang * 3.0 + rad * 2.0), sin(ang * 2.0 - rad * 2.4));
      }
      g *= uScale;
      vec3 v = voronoi(g);

      float border = v.y;
      float id = v.z;

      // Lead line mask (1 at borders)
      float w = max(0.0005, uEdgeW);
      float aa = 0.0015;
      #ifdef GL_OES_standard_derivatives
      aa = fwidth(border) / max(0.0001, uEdgeSharp);
      #endif
      float lead = 1.0 - smoothstep(w - aa, w + aa, border);

      // Cell color from palette + gentle variation
      vec3 cell = palette4(id);
      float tint = (noise(g * 0.85 + id * 11.7) - 0.5) * 0.18;
      cell *= (1.0 + tint);

      // Faux “glass thickness” / caustic-y highlight
      float highlight = smoothstep(0.02, 0.30, noise(g * 2.2 + vec2(0.0, t * 0.6)));
      highlight *= (1.0 - lead);

      // Edge glow
      float glow = exp(-border * border / max(0.00001, (w * w) * 0.35));
      glow *= uGlow;

      // Compose
      vec3 col = mix(uBg, cell, 0.92);
      col += cell * highlight * 0.10;

      // Lead overrides + glow on top
      col = mix(col, uLead, lead);
      col += (cell * 0.55 + vec3(1.0) * 0.25) * glow;

      // Subtle vignette
      float vig = 1.0 - smoothstep(0.35, 1.15, length(p * vec2(1.0, 0.95)));
      col *= 0.90 + 0.10 * vig;

      // Grain
      float gr = (hash12(uv * uResolution + t * 61.0) - 0.5) * 2.0;
      col += gr * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;const e=new C(t.backgroundColor),s=new C(t.leadColor??"#0b0b10"),r=new C(t.colorA??"#38bdf8"),n=new C(t.colorB??"#a78bfa"),a=new C(t.colorC??"#fb7185"),l=new C(t.colorD??"#fbbf24");this.speed=t.speed??.12,this.uniforms={uBg:{value:[e.r,e.g,e.b]},uLead:{value:[s.r,s.g,s.b]},uA:{value:[r.r,r.g,r.b]},uB:{value:[n.r,n.g,n.b]},uC:{value:[a.r,a.g,a.b]},uD:{value:[l.r,l.g,l.b]},uScale:{value:t.scale??3.2},uSeed:{value:t.seed??0},uJitter:{value:t.jitter??1},uRotate:{value:t.rotation??0},uVariant:{value:t.variant??0},uEdgeW:{value:t.edgeWidth??.08},uEdgeSharp:{value:t.edgeSharpness??1.25},uGlow:{value:t.edgeGlow??.45},uDist:{value:t.distortion??.55},uGrain:{value:t.grainAmount??.02},uTimeInternal:{value:0}}}onRender(t){this.uniforms.uTimeInternal.value+=t*.001*this.speed}}class Lt extends HTMLElement{#i;#t=null;#s;#e=null;#r=1;#n=!1;constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
      }
      canvas {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        /* Pixelated rendering for crisp upscaling of low-res buffers */
        image-rendering: pixelated;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
      ::slotted(*) {
        position: relative;
        z-index: 1;
      }
    `,this.shadowRoot.appendChild(t),this.#i=document.createElement("canvas"),this.#i.setAttribute("part","canvas"),this.shadowRoot.appendChild(this.#i);const e=document.createElement("slot");this.shadowRoot.appendChild(e),this.#s=new ResizeObserver(s=>{if(this.#t&&s.length>0){const{width:r,height:n}=s[0].contentRect;this.#t.resize(r,n)}})}connectedCallback(){const t=this.getAttribute("render-scale");if(t){const s=parseFloat(t);isNaN(s)||(this.#r=Math.max(.1,Math.min(2,s)))}const e=this.getAttribute("single-render");if(e&&(this.#n=e==="true"||e===""),this.#s.observe(this),this.#e&&this.init(),this.#t){const s=this.getBoundingClientRect();this.#t.resize(s.width,s.height)}}disconnectedCallback(){this.#s.disconnect(),this.#t&&(this.#t.dispose(),this.#t=null)}set plugin(t){this.#e=t,this.#t&&(this.#t.stop(),this.#t.dispose(),this.#t=null),this.init()}get plugin(){if(!this.#e)throw new Error("Plugin is required");return this.#e}set renderScale(t){this.#r=Math.max(.1,Math.min(2,t)),this.#t&&(this.#t.stop(),this.#t.dispose(),this.#t=null),this.init()}get renderScale(){return this.#r}get canvas(){return this.#i}set singleRender(t){this.#n=t,this.#t&&(this.#t.stop(),this.#t.dispose(),this.#t=null),this.init()}get singleRender(){return this.#n}render(){this.#t&&this.#n&&this.#t.render()}init(){if(!this.#e)return;this.#t&&(this.#t.stop(),this.#t.dispose(),this.#t=null);const t=this.getBoundingClientRect(),e=t.width>0?t.width:300,s=t.height>0?t.height:300;this.#t=new Bt(this.#i,this.#e,{width:e,height:s,renderScale:this.#r,singleRender:this.#n}),this.#t.start()}static get observedAttributes(){return["render-scale","single-render"]}attributeChangedCallback(t,e,s){if(e!==s)switch(t){case"render-scale":{const r=parseFloat(s);isNaN(r)||(this.renderScale=r);break}case"single-render":this.singleRender=s==="true"||s==="";break}}}customElements.define("shader-background",Lt),S.AuroraWavesPlugin=zi,S.CausticsPlugin=Ri,S.ContourLinesPlugin=Fi,S.DreamyBokehPlugin=Ii,S.GradientPlugin=et,S.GrainyFogPlugin=_i,S.InkWashPlugin=Bi,S.LiquidOrbPlugin=it,S.RetroGridPlugin=Ei,S.ShaderBackgroundElement=Lt,S.ShaderCanvas=Bt,S.SoftStarfieldPlugin=Ti,S.StainedGlassPlugin=Li,Object.defineProperty(S,Symbol.toStringTag,{value:"Module"})}));
