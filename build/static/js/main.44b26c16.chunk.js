(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{51:function(e,t,n){e.exports=n(70)},56:function(e,t,n){},57:function(e,t,n){},70:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(7),r=n.n(o),l=(n(56),n(57),n(34)),i=n(6),u=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",null,"Homepage"))},m=n(35),s=n(44),f=n.n(s),p=n(101),d=function(){var e=null,t=Object(a.useState)(!1),n=Object(m.a)(t,2),o=n[0];n[1];Object(a.useEffect)((function(){(e=f()({container:document.getElementById("cy"),elements:[{data:{id:"a"}},{data:{id:"b"}}]})).layout({name:"breadthfirst"}).run()}),[]);return c.a.createElement(c.a.Fragment,null,o&&c.a.createElement("div",{className:"loading-spinner"},c.a.createElement(p.a,{color:"secondary",size:50})),c.a.createElement("button",{onClick:function(){e.add([{group:"nodes",data:{id:"n0"}},{group:"nodes",data:{id:"n1"}}])}},"Add elements"),c.a.createElement("button",{onClick:function(){return console.log(window.origin),void fetch("/api/graph",{}).then((function(e){return e.json()})).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},"Log"),c.a.createElement("div",{id:"cy",className:"cytoscape__div",onClick:function(e){return console.log(e.screenX,e.screenY)}}))},E=[{path:"/",name:"Home Page"},{path:"/graph-without-posts",name:"Graph w/o Posts"}],h=n(111),g=n(108),b=n(113),w=n(109),v=n(110),k=n(105),j=n(106),y=n(37),O=n(107),C=n(45),x=n.n(C),B=n(104),F=n(112),N=Object(B.a)((function(e){return Object(F.a)({root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}})})),G=function(){var e=Object(a.useState)(!1),t=Object(m.a)(e,2),n=t[0],o=t[1],r=Object(a.useRef)(!1),i=Object(a.useRef)(null),u=N(),s=Object(a.useCallback)((function(e){i.current.contains(e.target)||r.current&&o(!1)}),[i.current]);return Object(a.useEffect)((function(){setTimeout((function(){r.current=n}),255)})),Object(a.useEffect)((function(){return document.addEventListener("click",s),function(){document.removeEventListener("click",s)}}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(k.a,{position:"static"},c.a.createElement(j.a,null,c.a.createElement(O.a,{edge:"start",className:u.menuButton,color:"inherit","aria-label":"menu",onClick:function(){return o(!0)}},c.a.createElement(x.a,null)),c.a.createElement(y.a,{variant:"h6",className:u.title},function(e){switch(e){case"/":return"Home Page";case"/graph-without-posts":return"Graph w/o Posts"}}(window.location.pathname)))),c.a.createElement(h.a,{anchor:"left",open:n,variant:"persistent",ref:i},c.a.createElement(g.a,null,E.map((function(e){return c.a.createElement(c.a.Fragment,{key:e.name},c.a.createElement(b.a,{button:!0,onClick:function(){o(!1)}},c.a.createElement(l.b,{to:e.path,className:"link"},c.a.createElement(w.a,{primary:e.name}))),c.a.createElement(v.a,null))})))))},P=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(l.a,null,c.a.createElement(i.a,{path:"/",component:G}),c.a.createElement(i.c,null,c.a.createElement(i.a,{path:"/",exact:!0,component:u}),c.a.createElement(i.a,{path:"/graph-without-posts",exact:!0,component:d}))))};var H=function(){return c.a.createElement(P,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[51,1,2]]]);
//# sourceMappingURL=main.44b26c16.chunk.js.map