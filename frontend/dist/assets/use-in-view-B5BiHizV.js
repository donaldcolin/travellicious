import{c as p,r as g}from"./index-DZyqTsT1.js";import{b as h}from"./vendor-BPdbrf5m.js";/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],b=p("ChevronDown",w),I={some:0,all:1};function v(s,o,{root:i,margin:a,amount:n="some"}={}){const u=g(s),t=new WeakMap,f=c=>{c.forEach(e=>{const l=t.get(e.target);if(e.isIntersecting!==!!l)if(e.isIntersecting){const d=o(e.target,e);typeof d=="function"?t.set(e.target,d):r.unobserve(e.target)}else typeof l=="function"&&(l(e),t.delete(e.target))})},r=new IntersectionObserver(f,{root:i,rootMargin:a,threshold:typeof n=="number"?n:I[n]});return u.forEach(c=>r.observe(c)),()=>r.disconnect()}function C(s,{root:o,margin:i,amount:a,once:n=!1,initial:u=!1}={}){const[t,f]=h.useState(u);return h.useEffect(()=>{if(!s.current||n&&t)return;const r=()=>(f(!0),n?void 0:()=>f(!1)),c={root:o&&o.current||void 0,margin:i,amount:a};return v(s.current,r,c)},[o,s,i,n,a]),t}export{b as C,C as u};
//# sourceMappingURL=use-in-view-B5BiHizV.js.map
