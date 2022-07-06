import{BufferAttribute,BufferGeometry,Float32BufferAttribute,InstancedBufferAttribute,InterleavedBuffer,InterleavedBufferAttribute,MathUtils,TriangleFanDrawMode,TriangleStripDrawMode,TrianglesDrawMode,Vector3}from"./three.module.js";function computeTangents(){throw new Error("BufferGeometryUtils: computeTangents renamed to computeMikkTSpaceTangents.")}function computeMikkTSpaceTangents(e,t,r=!0){if(!t||!t.isReady)throw new Error("BufferGeometryUtils: Initialized MikkTSpace library required.");if(!e.hasAttribute("position")||!e.hasAttribute("normal")||!e.hasAttribute("uv"))throw new Error('BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.');function o(e){if(e.normalized||e.isInterleavedBufferAttribute){const t=e.isInterleavedBufferAttribute?e.data.array:e.array,r=new Float32Array(e.getCount()*e.itemSize);for(let o=0,n=0;o<e.getCount();o++)r[n++]=MathUtils.denormalize(e.getX(o),t),r[n++]=MathUtils.denormalize(e.getY(o),t),e.itemSize>2&&(r[n++]=MathUtils.denormalize(e.getZ(o),t));return r}return e.array instanceof Float32Array?e.array:new Float32Array(e.array)}const n=e.index?e.toNonIndexed():e,i=t.generateTangents(o(n.attributes.position),o(n.attributes.normal),o(n.attributes.uv));if(r)for(let e=3;e<i.length;e+=4)i[e]*=-1;return n.setAttribute("tangent",new BufferAttribute(i,4)),e!==n&&e.copy(n),e}function mergeBufferGeometries(e,t=!1){const r=null!==e[0].index,o=new Set(Object.keys(e[0].attributes)),n=new Set(Object.keys(e[0].morphAttributes)),i={},s={},u=e[0].morphTargetsRelative,a=new BufferGeometry;let l=0;for(let f=0;f<e.length;++f){const m=e[f];let c=0;if(r!==(null!==m.index))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const e in m.attributes){if(!o.has(e))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+e+'" attribute exists among all geometries, or in none of them.'),null;void 0===i[e]&&(i[e]=[]),i[e].push(m.attributes[e]),c++}if(c!==o.size)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(u!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const e in m.morphAttributes){if(!n.has(e))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;void 0===s[e]&&(s[e]=[]),s[e].push(m.morphAttributes[e])}if(a.userData.mergedUserData=a.userData.mergedUserData||[],a.userData.mergedUserData.push(m.userData),t){let e;if(r)e=m.index.count;else{if(void 0===m.attributes.position)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;e=m.attributes.position.count}a.addGroup(l,e,f),l+=e}}if(r){let t=0;const r=[];for(let o=0;o<e.length;++o){const n=e[o].index;for(let e=0;e<n.count;++e)r.push(n.getX(e)+t);t+=e[o].attributes.position.count}a.setIndex(r)}for(const e in i){const t=mergeBufferAttributes(i[e]);if(!t)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+e+" attribute."),null;a.setAttribute(e,t)}for(const e in s){const t=s[e][0].length;if(0===t)break;a.morphAttributes=a.morphAttributes||{},a.morphAttributes[e]=[];for(let r=0;r<t;++r){const t=[];for(let o=0;o<s[e].length;++o)t.push(s[e][o][r]);const o=mergeBufferAttributes(t);if(!o)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+e+" morphAttribute."),null;a.morphAttributes[e].push(o)}}return a}function mergeBufferAttributes(e){let t,r,o,n=0;for(let i=0;i<e.length;++i){const s=e[i];if(s.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(void 0===t&&(t=s.array.constructor),t!==s.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(void 0===r&&(r=s.itemSize),r!==s.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(void 0===o&&(o=s.normalized),o!==s.normalized)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;n+=s.array.length}const i=new t(n);let s=0;for(let t=0;t<e.length;++t)i.set(e[t].array,s),s+=e[t].array.length;return new BufferAttribute(i,r,o)}function interleaveAttributes(e){let t,r=0,o=0;for(let n=0,i=e.length;n<i;++n){const i=e[n];if(void 0===t&&(t=i.array.constructor),t!==i.array.constructor)return console.error("AttributeBuffers of different types cannot be interleaved"),null;r+=i.array.length,o+=i.itemSize}const n=new InterleavedBuffer(new t(r),o);let i=0;const s=[],u=["getX","getY","getZ","getW"],a=["setX","setY","setZ","setW"];for(let t=0,r=e.length;t<r;t++){const r=e[t],o=r.itemSize,l=r.count,f=new InterleavedBufferAttribute(n,o,i,r.normalized);s.push(f),i+=o;for(let e=0;e<l;e++)for(let t=0;t<o;t++)f[a[t]](e,r[u[t]](e))}return s}export function deinterleaveAttribute(e){const t=e.data.array.constructor,r=e.count,o=e.itemSize,n=e.normalized,i=new t(r*o);let s;s=e.isInstancedInterleavedBufferAttribute?new InstancedBufferAttribute(i,o,n,e.meshPerAttribute):new BufferAttribute(i,o,n);for(let t=0;t<r;t++)s.setX(t,e.getX(t)),o>=2&&s.setY(t,e.getY(t)),o>=3&&s.setZ(t,e.getZ(t)),o>=4&&s.setW(t,e.getW(t));return s}export function deinterleaveGeometry(e){const t=e.attributes,r=e.morphTargets,o=new Map;for(const e in t){const r=t[e];r.isInterleavedBufferAttribute&&(o.has(r)||o.set(r,deinterleaveAttribute(r)),t[e]=o.get(r))}for(const e in r){const t=r[e];t.isInterleavedBufferAttribute&&(o.has(t)||o.set(t,deinterleaveAttribute(t)),r[e]=o.get(t))}}function estimateBytesUsed(e){let t=0;for(const r in e.attributes){const o=e.getAttribute(r);t+=o.count*o.itemSize*o.array.BYTES_PER_ELEMENT}const r=e.getIndex();return t+=r?r.count*r.itemSize*r.array.BYTES_PER_ELEMENT:0,t}function mergeVertices(e,t=1e-4){t=Math.max(t,Number.EPSILON);const r={},o=e.getIndex(),n=e.getAttribute("position"),i=o?o.count:n.count;let s=0;const u=Object.keys(e.attributes),a={},l={},f=[],m=["getX","getY","getZ","getW"];for(let t=0,r=u.length;t<r;t++){const r=u[t];a[r]=[];const o=e.morphAttributes[r];o&&(l[r]=new Array(o.length).fill().map((()=>[])))}const c=Math.log10(1/t),g=Math.pow(10,c);for(let t=0;t<i;t++){const n=o?o.getX(t):t;let i="";for(let t=0,r=u.length;t<r;t++){const r=u[t],o=e.getAttribute(r),s=o.itemSize;for(let e=0;e<s;e++)i+=~~(o[m[e]](n)*g)+","}if(i in r)f.push(r[i]);else{for(let t=0,r=u.length;t<r;t++){const r=u[t],o=e.getAttribute(r),i=e.morphAttributes[r],s=o.itemSize,f=a[r],c=l[r];for(let e=0;e<s;e++){const t=m[e];if(f.push(o[t](n)),i)for(let e=0,r=i.length;e<r;e++)c[e].push(i[e][t](n))}}r[i]=s,f.push(s),s++}}const d=e.clone();for(let t=0,r=u.length;t<r;t++){const r=u[t],o=e.getAttribute(r),n=new o.array.constructor(a[r]),i=new BufferAttribute(n,o.itemSize,o.normalized);if(d.setAttribute(r,i),r in l)for(let t=0;t<l[r].length;t++){const o=e.morphAttributes[r][t],n=new o.array.constructor(l[r][t]),i=new BufferAttribute(n,o.itemSize,o.normalized);d.morphAttributes[r][t]=i}}return d.setIndex(f),d}function toTrianglesDrawMode(e,t){if(t===TrianglesDrawMode)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(t===TriangleFanDrawMode||t===TriangleStripDrawMode){let r=e.getIndex();if(null===r){const t=[],o=e.getAttribute("position");if(void 0===o)return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e;for(let e=0;e<o.count;e++)t.push(e);e.setIndex(t),r=e.getIndex()}const o=r.count-2,n=[];if(t===TriangleFanDrawMode)for(let e=1;e<=o;e++)n.push(r.getX(0)),n.push(r.getX(e)),n.push(r.getX(e+1));else for(let e=0;e<o;e++)e%2==0?(n.push(r.getX(e)),n.push(r.getX(e+1)),n.push(r.getX(e+2))):(n.push(r.getX(e+2)),n.push(r.getX(e+1)),n.push(r.getX(e)));n.length/3!==o&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const i=e.clone();return i.setIndex(n),i.clearGroups(),i}return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),e}function computeMorphedAttributes(e){if(!0!==e.geometry.isBufferGeometry)return console.error("THREE.BufferGeometryUtils: Geometry is not of type BufferGeometry."),null;const t=new Vector3,r=new Vector3,o=new Vector3,n=new Vector3,i=new Vector3,s=new Vector3,u=new Vector3,a=new Vector3,l=new Vector3;function f(e,f,m,c,g,d,h,b){t.fromBufferAttribute(f,g),r.fromBufferAttribute(f,d),o.fromBufferAttribute(f,h);const p=e.morphTargetInfluences;if(m&&p){u.set(0,0,0),a.set(0,0,0),l.set(0,0,0);for(let e=0,f=m.length;e<f;e++){const f=p[e],b=m[e];0!==f&&(n.fromBufferAttribute(b,g),i.fromBufferAttribute(b,d),s.fromBufferAttribute(b,h),c?(u.addScaledVector(n,f),a.addScaledVector(i,f),l.addScaledVector(s,f)):(u.addScaledVector(n.sub(t),f),a.addScaledVector(i.sub(r),f),l.addScaledVector(s.sub(o),f)))}t.add(u),r.add(a),o.add(l)}e.isSkinnedMesh&&(e.boneTransform(g,t),e.boneTransform(d,r),e.boneTransform(h,o)),b[3*g+0]=t.x,b[3*g+1]=t.y,b[3*g+2]=t.z,b[3*d+0]=r.x,b[3*d+1]=r.y,b[3*d+2]=r.z,b[3*h+0]=o.x,b[3*h+1]=o.y,b[3*h+2]=o.z}const m=e.geometry,c=e.material;let g,d,h;const b=m.index,p=m.attributes.position,A=m.morphAttributes.position,y=m.morphTargetsRelative,B=m.attributes.normal,w=m.morphAttributes.position,T=m.groups,E=m.drawRange;let x,G,M,v,I,S,U;const z=new Float32Array(p.count*p.itemSize),R=new Float32Array(B.count*B.itemSize);if(null!==b)if(Array.isArray(c))for(x=0,M=T.length;x<M;x++)for(I=T[x],S=Math.max(I.start,E.start),U=Math.min(I.start+I.count,E.start+E.count),G=S,v=U;G<v;G+=3)g=b.getX(G),d=b.getX(G+1),h=b.getX(G+2),f(e,p,A,y,g,d,h,z),f(e,B,w,y,g,d,h,R);else for(S=Math.max(0,E.start),U=Math.min(b.count,E.start+E.count),x=S,M=U;x<M;x+=3)g=b.getX(x),d=b.getX(x+1),h=b.getX(x+2),f(e,p,A,y,g,d,h,z),f(e,B,w,y,g,d,h,R);else if(Array.isArray(c))for(x=0,M=T.length;x<M;x++)for(I=T[x],S=Math.max(I.start,E.start),U=Math.min(I.start+I.count,E.start+E.count),G=S,v=U;G<v;G+=3)g=G,d=G+1,h=G+2,f(e,p,A,y,g,d,h,z),f(e,B,w,y,g,d,h,R);else for(S=Math.max(0,E.start),U=Math.min(p.count,E.start+E.count),x=S,M=U;x<M;x+=3)g=x,d=x+1,h=x+2,f(e,p,A,y,g,d,h,z),f(e,B,w,y,g,d,h,R);return{positionAttribute:p,normalAttribute:B,morphedPositionAttribute:new Float32BufferAttribute(z,3),morphedNormalAttribute:new Float32BufferAttribute(R,3)}}function mergeGroups(e){if(0===e.groups.length)return console.warn("THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge."),e;let t=e.groups;if(t=t.sort(((e,t)=>e.materialIndex!==t.materialIndex?e.materialIndex-t.materialIndex:e.start-t.start)),null===e.getIndex()){const t=e.getAttribute("position"),r=[];for(let e=0;e<t.count;e+=3)r.push(e,e+1,e+2);e.setIndex(r)}const r=e.getIndex(),o=[];for(let e=0;e<t.length;e++){const n=t[e],i=n.start,s=i+n.count;for(let e=i;e<s;e++)o.push(r.getX(e))}e.dispose(),e.setIndex(o);let n=0;for(let e=0;e<t.length;e++){const r=t[e];r.start=n,n+=r.count}let i=t[0];e.groups=[i];for(let r=1;r<t.length;r++){const o=t[r];i.materialIndex===o.materialIndex?i.count+=o.count:(i=o,e.groups.push(i))}return e}export{computeTangents,computeMikkTSpaceTangents,mergeBufferGeometries,mergeBufferAttributes,interleaveAttributes,estimateBytesUsed,mergeVertices,toTrianglesDrawMode,computeMorphedAttributes,mergeGroups};