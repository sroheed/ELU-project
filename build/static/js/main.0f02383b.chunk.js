(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{117:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),o=n.n(c),i=(n(84),n(85),n(51)),l=n(11),u=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Homepage"))},s=n(35),m=n(67),d=n.n(m),f={name:"concentric",fit:!0,padding:30,startAngle:1.5*Math.PI,sweep:void 0,clockwise:!0,equidistant:!1,minNodeSpacing:10,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,height:void 0,width:void 0,spacingFactor:void 0,concentric:function(e){return e.degree()},levelWidth:function(e){return e.maxDegree()/4},animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,t){return!0},ready:void 0,stop:void 0,transform:function(e,t){return t}},g=n(163),p=n(183),E=n(47),h=n(180),v=n(167),b=n(169),O=n(52),y=n.n(O);function j(e,t){return t=t||2,(new Array(t).join("0")+e).slice(-t)}var w=function(){var e=Object(a.useRef)(),t=Object(a.useRef)(!0),n=Object(a.useState)(!1),c=Object(s.a)(n,2),o=c[0],i=c[1],l=Object(a.useState)(""),u=Object(s.a)(l,2),m=u[0],O=u[1],w=Object(a.useState)(10),S=Object(s.a)(w,2),k=S[0],x=S[1];Object(a.useEffect)((function(){t.current&&(e.current=d()({container:document.getElementById("cy")}),t.current=!1,N())}));var N=function(){Object.entries(localStorage).forEach((function(e){I(JSON.parse(e[1]))}))},I=function(t){var n=t[0];C(n),F(n,function(e){if(0===e.indexOf("#")&&(e=e.slice(1)),3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),6!==e.length)throw new Error("Invalid HEX color.");var t=(255-parseInt(e.slice(0,2),16)).toString(16),n=(255-parseInt(e.slice(2,4),16)).toString(16),a=(255-parseInt(e.slice(4,6),16)).toString(16);return"#"+j(t)+j(n)+j(a)}(y()(n)));for(var a=1;a<t.length;a++){var r=t[a].author;C(r),F(r,y()(n)),_(n,r)}e.current.layout(f).run()},C=function(t){e.current.add([{group:"nodes",data:{id:t}}])},_=function(t,n){e.current.add([{group:"edges",data:{id:t+"__"+n,source:t,target:n}}])},F=function(t,n){e.current.getElementById(t).style("background-color",n)};return r.a.createElement(r.a.Fragment,null,o&&r.a.createElement("div",{className:"loading-spinner"},r.a.createElement(g.a,{color:"secondary",size:50})),r.a.createElement("div",{className:"scrape-controls__div"},r.a.createElement(v.a,{container:!0,spacing:2,alignItems:"baseline"},r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(E.a,{id:"slider",variant:"body2"},"Post Count"),r.a.createElement(p.a,{defaultValue:10,min:1,max:100,valueLabelDisplay:"on","aria-labelledby":"slider",onChangeCommitted:function(e,t){return x(t)}})),r.a.createElement(v.a,{item:!0,xs:2},r.a.createElement("div",{className:"line-high"},r.a.createElement(h.a,{id:"standard-basic",label:"Subreddit Name","aria-labelledby":"subredditName",onChange:function(e){return O(e.target.value)}}))),r.a.createElement(v.a,{item:!0,xs:1},r.a.createElement("div",{className:"line-high"},r.a.createElement(b.a,{variant:"contained",color:"primary",onClick:function(){m&&(i(!0),fetch("/api/graph?subreddit=".concat(m,"&post_count=").concat(k),{}).then((function(e){return e.json()})).then((function(e){200===e.code?(I(e.data),localStorage.setItem(e.data[0],JSON.stringify(e.data))):console.log(e.message),i(!1)})).catch((function(e){console.log("ERROR!!!",e),i(!1)})))}},"Generate"),r.a.createElement(b.a,{variant:"contained",color:"secondary",onClick:function(){return localStorage.clear()}},"Delete"))))),r.a.createElement("div",{id:"cy",className:"cytoscape__div"}))},S=n(170),k=n(171),x=n(172),N=n(68),I=n.n(N),C=n(69),_=n.n(C),F=n(56),R=(n(108),function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"info-images-title"},r.a.createElement(E.a,{id:"slider",variant:"h5"},"Subreddit Connections")),r.a.createElement("div",{className:"info-images__div"},r.a.createElement(S.a,{cols:2},r.a.createElement(k.a,null,r.a.createElement(F.a,null,r.a.createElement("img",{src:I.a,alt:"Gamedev connections"})),r.a.createElement(x.a,{title:"Gamedev connections"})),r.a.createElement(k.a,null,r.a.createElement(F.a,null,r.a.createElement("img",{src:_.a,alt:"Devblogs connections"})),r.a.createElement(x.a,{title:"Devblogs connections"})))))}),B=[{path:"/",name:"Home Page"},{path:"/graph-without-posts",name:"Graph Without Posts"},{path:"/info",name:"Info"}],D=n(182),G=n(168),P=n(177),W=n(178),H=n(179),J=n(174),L=n(175),A=n(176),M=n(71),q=n.n(M),z=n(173),T=n(184),V=Object(z.a)((function(e){return Object(T.a)({root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}})})),X=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(a.useRef)(!1),i=Object(a.useRef)(null),u=V(),m=Object(l.f)(),d=Object(a.useCallback)((function(e){i.current.contains(e.target)||o.current&&(c(!1),console.log("clicked"))}),[i.current]);return Object(a.useEffect)((function(){setTimeout((function(){o.current=n}),255)})),Object(a.useEffect)((function(){return document.addEventListener("click",d),function(){document.removeEventListener("click",d)}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(J.a,{position:"static"},r.a.createElement(L.a,null,r.a.createElement(A.a,{edge:"start",className:u.menuButton,color:"inherit","aria-label":"menu",onClick:function(){return c(!0)}},r.a.createElement(q.a,null)),r.a.createElement(E.a,{variant:"h6",className:u.title},function(e){switch(e){case"/":return"Home Page";case"/graph-without-posts":return"Graph Without Posts";case"/info":return"Information"}}(window.location.pathname)))),r.a.createElement(D.a,{anchor:"left",open:n,variant:"persistent",ref:i},r.a.createElement(G.a,null,B.map((function(e){return r.a.createElement(r.a.Fragment,{key:e.name},r.a.createElement(P.a,{button:!0,onClick:function(){c(!1),m.push(e.path)}},r.a.createElement(W.a,{primary:e.name})),r.a.createElement(H.a,null))})))))},$=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,null,r.a.createElement(l.a,{path:"/",component:X}),r.a.createElement(l.c,null,r.a.createElement(l.a,{path:"/",exact:!0,component:u}),r.a.createElement(l.a,{path:"/graph-without-posts",exact:!0,component:w}),r.a.createElement(l.a,{path:"/info",exact:!0,component:R}))))};var K=function(){return r.a.createElement($,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},68:function(e,t,n){e.exports=n.p+"static/media/reddit1.dfe2644d.png"},69:function(e,t,n){e.exports=n.p+"static/media/reddit2.35007479.png"},79:function(e,t,n){e.exports=n(117)},84:function(e,t,n){},85:function(e,t,n){}},[[79,1,2]]]);
//# sourceMappingURL=main.0f02383b.chunk.js.map