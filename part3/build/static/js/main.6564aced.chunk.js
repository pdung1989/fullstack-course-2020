(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),l=function(e){var n=e.person,t=e.deleteMode;return r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(e){e.preventDefault(),t(n)}},"delete"))},i=function(e){var n=e.filterPersons,t=e.deleteMode;return r.a.createElement("div",null,n.map((function(e,n){return r.a.createElement(l,{key:n,person:e,deleteMode:t})})))},m=function(e){var n=e.filterText,t=e.handleFilter;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},d=function(e){var n=e.addPerson,t=e.newName,a=e.handleAddName,o=e.newNumber,c=e.handleAddNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:o,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=t(3),s=t.n(f),h="http://localhost:3001/persons",b=function(){return s.a.get(h).then((function(e){return e.data}))},v=function(e){return s.a.post(h,e).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){var n=e.message,t=e.classCss;return null===n?null:r.a.createElement("div",{className:t},n)},w=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),l=Object(u.a)(c,2),f=l[0],s=l[1],h=Object(a.useState)(""),w=Object(u.a)(h,2),j=w[0],g=w[1],N=Object(a.useState)(""),C=Object(u.a)(N,2),k=C[0],S=C[1],A=Object(a.useState)(t),R=Object(u.a)(A,2),T=R[0],x=R[1],P=Object(a.useState)(null),y=Object(u.a)(P,2),M=y[0],D=y[1],I=Object(a.useState)(null),F=Object(u.a)(I,2),J=F[0],L=F[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);return Object(a.useEffect)((function(){var e=k.length>0?t.filter((function(e){return e.name.toLowerCase().indexOf(k.toLowerCase())>=0})):t;x(e)}),[t,k]),r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(O,{message:M,classCss:"success"}),r.a.createElement(O,{message:J,classCss:"error"}),r.a.createElement(m,{filterText:k,handleFilter:function(e){S(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(d,{addPerson:function(e){e.preventDefault();var n={name:f,number:j};if(t.map((function(e){return e.name})).indexOf(n.name)>-1){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with the new one"))){var a=t.filter((function(e){return e.name===n.name}));p(a[0].id,n).then((function(e){o(t.filter((function(e){return e.name!==n.name})).concat(e))})).then((function(e){console.log("number added"),D("Added new number ".concat(j," to ").concat(f)),setTimeout((function(){D(null)}),5e3)})).catch((function(e){console.log("ERROR"),L("Information of '".concat(f,"' has been removed from the server.")),setTimeout((function(){L(null)}),5e3)}))}}else v(n).then((function(e){o(t.concat(e))})).then((function(e){D("Added ".concat(f)),setTimeout((function(){D(null)}),5e3)})).catch((function(e){console.log("ERROR"),L("Information of '".concat(f,"' has been removed from the server.")),setTimeout((function(){L(null)}),5e3)}))},newName:f,handleAddName:function(e){s(e.target.value)},newNumber:j,handleAddNumber:function(e){g(e.target.value)}}),r.a.createElement("h1",null,"Numbers"),r.a.createElement(i,{filterPersons:T,deleteMode:function(e){window.confirm("Delete "+e.name)&&E(e.id).then((function(){o(t.filter((function(n){return n.id!==e.id})))}))}}))};t(36);c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.6564aced.chunk.js.map