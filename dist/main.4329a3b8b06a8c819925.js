(()=>{"use strict";var e,t,n,r={59:(e,t,n)=>{n.r(t),n.d(t,{URL_CLIENT:()=>r,URL_CLIENT_GAMES:()=>o,URL_PLACEHOLDER:()=>s,URL_SERVER:()=>i,URL_SERVER_API:()=>c,URL_SERVER_AVATARS:()=>a});var r="https://igropoisk.up.railway.app/",o="".concat(r,"games/"),i="https://igropoisk-server.up.railway.app/",a="".concat(i,"avatars/"),c="".concat(i,"api/"),s="assets/user-placeholder.jpg"},493:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(7813),o=n(59),i=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},a=function(e,t){var n,r,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=c(0),a.throw=c(1),a.return=c(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}};const c=new(function(){function e(){this.games=[],this.pages=null,(0,r.l_)(this)}return e.prototype.getGet=function(e){return i(this,void 0,void 0,(function(){var t=this;return a(this,(function(n){return(0,r.h5)((function(){t.games=e.games,t.pages=e.pages})),[2]}))}))},e.prototype.search=function(e){return i(this,void 0,void 0,(function(){return a(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(o.URL_SERVER_API,"getSearch?query=").concat(e))];case 1:return[4,t.sent().json()];case 2:return[2,t.sent()]}}))}))},e}())},847:e=>{e.exports=JSON.parse('[{"id":1,"description":"Экшены"},{"id":2,"description":"Стратегии"},{"id":3,"description":"Ролевые игры"},{"id":4,"description":"Казуальные игры"},{"id":9,"description":"Гонки"},{"id":18,"description":"Спорт"},{"id":23,"description":"Инди"},{"id":25,"description":"Приключенческие игры"},{"id":28,"description":"Симуляторы"},{"id":29,"description":"Многопользовательские игры"},{"id":37,"description":"Бесплатные"},{"id":50,"description":"Бухгалтерия"},{"id":51,"description":"Анимация и моделирование"},{"id":52,"description":"Работа со звуком"},{"id":53,"description":"Дизайн и иллюстрация"},{"id":54,"description":"Образование"},{"id":55,"description":"Обработка фото"},{"id":56,"description":"Обучение работе с ПО"},{"id":57,"description":"Утилиты"},{"id":58,"description":"Создание видео"},{"id":59,"description":"Веб-разработка"},{"id":60,"description":"Разработка игр"},{"id":70,"description":"Ранний доступ"},{"id":71,"description":"Сексуальный контент"},{"id":72,"description":"Нагота"},{"id":73,"description":"Насилие"},{"id":74,"description":"Мясо"},{"id":80,"description":"Фильм"},{"id":81,"description":"Документальные"},{"id":82,"description":"Сериал"},{"id":83,"description":"Короткометражный фильм"},{"id":84,"description":"Обучающий фильм"},{"id":85,"description":"Панорамное видео"}]')},1042:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(6540);function o(e,t){var n=(0,r.useRef)(null),o=(0,r.useCallback)((function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];n.current&&clearTimeout(n.current),n.current=setTimeout((function(){e.apply(void 0,r)}),t)}),[e,t]);return o}},1712:(e,t,n)=>{n.d(t,{o:()=>I,A:()=>O});var r=n(4848),o=n(6540),i=n(3443),a=n(1987),c=n(7813),s=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},u=function(e,t){var n,r,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=c(0),a.throw=c(1),a.return=c(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}};const l=function(){function e(){this.user=null,this.firstime=!1,(0,c.l_)(this)}return e.prototype.registration=function(e){return s(this,void 0,void 0,(function(){var t,n,r,o,i=this;return u(this,(function(s){switch(s.label){case 0:return[4,a.A.post("/registration",e)];case 1:return t=s.sent(),n=t.data,r=n[0],o=n[1],localStorage.setItem("accessToken",o.accessToken),(0,c.h5)((function(){return i.user=r})),console.log("РЕГИСТРАТИОН"),[2]}}))}))},e.prototype.login=function(e){return s(this,void 0,void 0,(function(){var t,n,r,o,i=this;return u(this,(function(s){switch(s.label){case 0:return[4,a.A.post("/login",e)];case 1:return t=s.sent(),n=t.data,r=n[0],o=n[1],localStorage.setItem("accessToken",o.accessToken),(0,c.h5)((function(){return i.user=r})),console.log(this.user),[2]}}))}))},e.prototype.logout=function(){return s(this,void 0,void 0,(function(){var e=this;return u(this,(function(t){switch(t.label){case 0:return[4,a.A.get("/logout")];case 1:return t.sent(),localStorage.removeItem("accessToken"),console.log("ЛОГАУТ"),(0,c.h5)((function(){return e.user=null})),[2]}}))}))},e.prototype.refresh=function(){return s(this,void 0,void 0,(function(){var e,t,n,r,o,i=this;return u(this,(function(s){switch(s.label){case 0:return[4,localStorage.getItem("accessToken")];case 1:return e=s.sent(),[4,a.A.post("/refresh",{accessToken:e})];case 2:return t=s.sent(),n=t.data,r=n[0],o=n[1],console.log(r,o),r&&o?((0,c.h5)((function(){return i.user=r})),[4,localStorage.setItem("accessToken",o.accessToken)]):[3,4];case 3:s.sent(),s.label=4;case 4:return[2]}}))}))},e.prototype.refreshAccessToken=function(){return s(this,void 0,void 0,(function(){var e,t;return u(this,(function(n){switch(n.label){case 0:return[4,a.A.get("/refreshAccess")];case 1:return e=n.sent(),t=e.data,console.log(t),t?[4,localStorage.setItem("accessToken",t)]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))},e}(),d=n.p+"assets/logo.png";var f=n(3175),h=n(2433),p=n(493),v=n(1042),m=n(59);const y=n.p+"assets/logoshort.png";var b=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},g=function(e,t){var n,r,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=c(0),a.throw=c(1),a.return=c(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}};const x=(0,o.memo)((0,i.PA)((function(){var e=this,t=(0,o.useContext)(I),i=n(847),a=(0,o.useState)([]),c=a[0],s=a[1],u=(0,o.useState)(!1),l=u[0],x=u[1],j=(0,o.useState)(!1),w=j[0],k=j[1],E=(0,o.useState)("dark"==localStorage.getItem("theme")),S=E[0],_=E[1],A=(0,o.useMemo)((function(){return t.user}),[t.user]),C=(0,f.Zp)();(0,o.useEffect)((function(){p.A.search("")}),[]),document.body.className=S?"dark":"light";var T,L=(0,v.A)((function(e){x(e),k(e)}),300),N=(0,o.useMemo)((function(){return(0,r.jsx)("button",{onClick:function(){return _(!S),void localStorage.setItem("theme",S?"light":"dark")},className:"theme",children:S?"Тёмный":"Светлый"})}),[S]),R=(0,v.A)((function(t){return b(e,void 0,void 0,(function(){var e;return g(this,(function(n){switch(n.label){case 0:return e=s,[4,p.A.search(t)];case 1:return e.apply(void 0,[n.sent().slice(0,100)]),[2]}}))}))}),500),O=(0,o.useMemo)((function(){return(0,r.jsx)("input",{type:"text",placeholder:"Поиск...",onChange:function(t){return b(e,void 0,void 0,(function(){return g(this,(function(e){return R(t.target.value),[2]}))}))},onClick:function(){c&&x(!0),k(!0)}})}),[c,l,w]);return(0,r.jsxs)(r.Fragment,{children:[l&&(0,r.jsx)(h.A,{setModal:x,setShowGameList:k}),w&&(0,r.jsx)("div",{className:"search-game",children:(T=c,T.map((function(e,t){return(0,r.jsxs)("div",{children:[(0,r.jsx)("img",{src:e.capsule_image}),(0,r.jsxs)("span",{children:[(0,r.jsx)("p",{children:(0,r.jsx)(f.N_,{onClick:function(){return L(!1)},to:"".concat(m.URL_CLIENT_GAMES).concat(e.steam_id),children:e.name})}),(0,r.jsxs)("p",{children:["Год выхода: ",(0,r.jsx)(f.N_,{onClick:function(){return L(!1)},to:"".concat(m.URL_CLIENT_GAMES,"?release_date=").concat(e.release_date),children:e.release_date})]}),(0,r.jsxs)("p",{children:["Жанры: ",e.genres.map((function(e,t){var n=i.find((function(t){return t.id==e}));return(0,r.jsxs)(f.N_,{onClick:function(){return L(!1)},to:"".concat(m.URL_CLIENT_GAMES,"?genre=").concat(n.id),children:[n.description,", "]},t)}))]}),(0,r.jsxs)("p",{children:["Издатель: ",(0,r.jsx)(f.N_,{onClick:function(){return L(!1)},to:"".concat(m.URL_CLIENT_GAMES,"?publisher=").concat(e.publishers),children:e.publishers})]}),(0,r.jsxs)("p",{children:["Разработчик: ",(0,r.jsx)(f.N_,{onClick:function(){return L(!1)},to:"".concat(m.URL_CLIENT_GAMES,"?developer=").concat(e.developers),children:e.developers})]})]})]},t)})))}),(0,r.jsxs)("header",{children:[(0,r.jsx)(f.N_,{to:"/games",className:"img-wrapper",children:(0,r.jsxs)("picture",{children:[(0,r.jsx)("source",{media:"(max-width: 650px)",srcSet:y}),(0,r.jsx)("img",{src:d})]})}),(0,r.jsxs)("select",{onChange:function(e){return t=e.target.value,void C(t);var t},children:[(0,r.jsx)("option",{value:"/games",children:"GAMES"}),(0,r.jsx)("option",{value:"/users",children:"USERS"})]}),O,(0,r.jsxs)("span",{className:"avatar-nickname",children:[A&&(0,r.jsx)(f.N_,{to:"/users/".concat(A.nickname),children:(0,r.jsx)("img",{className:"avatar br-50",onError:function(e){return e.currentTarget.src=m.URL_PLACEHOLDER},src:"".concat(m.URL_SERVER_AVATARS).concat(A.avatar)})}),A?(0,r.jsx)(f.N_,{to:"/users/".concat(A.nickname),className:"avatar-nick",children:A.nickname}):(0,r.jsx)(f.N_,{to:"/login",children:"Вход"})]}),N]})]})})));var j,w=n(5192),k=(j=function(e,t){return j=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},j(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}j(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});const E=function(e){function t(){var t=e.call(this)||this;return t.resetError=function(){t.setState({hasError:!1,error:null,errorInfo:null})},t.state={hasError:!1,error:null,errorInfo:null},t}return k(t,e),t.prototype.componentDidCatch=function(e,t){this.setState({hasError:!0,error:e,errorInfo:t})},t.prototype.componentDidMount=function(){var e=this;window.addEventListener("popstate",this.resetError);var t=history.pushState,n=history.replaceState;history.pushState=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];t.apply(history,n),e.resetError()},history.replaceState=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];n.apply(history,t),e.resetError()}},t.prototype.componentWillUnmount=function(){window.removeEventListener("popstate",this.resetError)},t.prototype.render=function(){return this.state.hasError?(0,r.jsx)(w.default,{children:this.state.error.message}):this.props.children},t}(o.Component);var S=(0,o.lazy)((function(){return Promise.all([n.e(785),n.e(347)]).then(n.bind(n,4347))})),_=(0,o.lazy)((function(){return Promise.all([n.e(785),n.e(311)]).then(n.bind(n,5311))})),A=(0,o.lazy)((function(){return n.e(183).then(n.bind(n,5183))})),C=(0,o.lazy)((function(){return Promise.all([n.e(785),n.e(641)]).then(n.bind(n,9220))})),T=(0,o.lazy)((function(){return n.e(870).then(n.bind(n,4870))})),L=(0,o.lazy)((function(){return n.e(622).then(n.bind(n,2622))})),N=(0,o.lazy)((function(){return Promise.resolve().then(n.bind(n,5192))})),R=(0,o.lazy)((function(){return n.e(931).then(n.bind(n,6931))})),I=(0,o.createContext)(null);const O=(0,i.PA)((function(){var e=this,t=(0,o.useState)(new l)[0],n=(0,o.useState)(!1),i=n[0],a=n[1];return(0,o.useEffect)((function(){var n,r,o,i;n=e,r=void 0,i=function(){return function(e,t){var n,r,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=c(0),a.throw=c(1),a.return=c(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}}(this,(function(e){switch(e.label){case 0:return[4,t.refresh()];case 1:return e.sent(),a(!0),[2]}}))},new((o=void 0)||(o=Promise))((function(e,t){function a(e){try{s(i.next(e))}catch(e){t(e)}}function c(e){try{s(i.throw(e))}catch(e){t(e)}}function s(t){var n;t.done?e(t.value):(n=t.value,n instanceof o?n:new o((function(e){e(n)}))).then(a,c)}s((i=i.apply(n,r||[])).next())}))}),[]),i?(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)("main",{style:{backgroundColor:"white"},children:"Загрузка приложения..."}),children:(0,r.jsx)(I.Provider,{value:t,children:(0,r.jsxs)(f.Kd,{children:[(0,r.jsx)(x,{}),(0,r.jsx)(E,{children:(0,r.jsxs)(f.BV,{children:[(0,r.jsx)(f.qh,{path:"/login",element:(0,r.jsx)(S,{})}),(0,r.jsx)(f.qh,{path:"/registration",element:(0,r.jsx)(_,{})}),(0,r.jsx)(f.qh,{path:"/games",element:(0,r.jsx)(A,{})}),(0,r.jsx)(f.qh,{path:"/games/:id",element:(0,r.jsx)(C,{})}),(0,r.jsx)(f.qh,{path:"/users/:nickname",element:(0,r.jsx)(T,{})}),(0,r.jsx)(f.qh,{path:"/test",element:(0,r.jsx)(R,{})}),(0,r.jsx)(f.qh,{path:"/users",element:(0,r.jsx)(L,{})}),(0,r.jsx)(f.qh,{index:!0,element:(0,r.jsx)(f.C5,{to:"/games"})}),(0,r.jsx)(f.qh,{path:"*",element:(0,r.jsx)(N,{})})]})})]})})}):(0,r.jsx)("main",{style:{backgroundColor:"white"},children:"Загрузка приложения..."})}))},1987:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(1083),o=n(59),i=r.A.create({withCredentials:!0,baseURL:"".concat(o.URL_SERVER_API)});i.interceptors.request.use((function(e){var t=localStorage.getItem("accessToken");return t&&(e.headers.Authorization="Bearer ".concat(t)),e}));const a=i},2433:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(4848);const o=(0,n(6540).memo)((function(e){var t=e.setModal,n=e.children,o=e.setShowGameList;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"modal",onClick:function(){t(!1),o&&o(!1)},children:n})})}))},3900:(e,t,n)=>{var r=n(4848),o=n(5338),i=n(1712),a=n(6540),c=n(5942),s=document.getElementById("root");if(!s)throw new Error("root not found");var u=(0,o.H)(s),l=new c.QueryClient;u.render((0,r.jsx)(a.StrictMode,{children:(0,r.jsx)(c.QueryClientProvider,{client:l,children:(0,r.jsx)(i.A,{})})}))},5192:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var r=n(4848),o=n(3175);const i=function(e){var t=e.children;return(0,r.jsx)("main",{className:"error-boundary",children:(0,r.jsxs)("div",{children:[t,(0,r.jsx)("br",{}),(0,r.jsx)(o.N_,{to:"/games",children:"перейти на главную"})]})})}}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={exports:{}};return r[e](n,n.exports,i),n.exports}i.m=r,e=[],i.O=(t,n,r,o)=>{if(!n){var a=1/0;for(l=0;l<e.length;l++){for(var[n,r,o]=e[l],c=!0,s=0;s<n.length;s++)(!1&o||a>=o)&&Object.keys(i.O).every((e=>i.O[e](n[s])))?n.splice(s--,1):(c=!1,o<a&&(a=o));if(c){e.splice(l--,1);var u=r();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[n,r,o]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,n)=>(i.f[n](e,t),t)),[])),i.u=e=>e+"."+{183:"785398a28d07beaeee02",311:"52ee361ddbc5b47b3f0f",347:"584ff06a2d97df7e9423",622:"6806148b16712162dd31",641:"ca474f5041f595cc9b5a",785:"4e125e55714f9d6148c9",870:"358223988f4e7946748a",931:"891c1b62399a68548be0"}[e]+".js",i.miniCssF=e=>"css/"+e+"."+{183:"41d12cb7",311:"5d3198cb",347:"a4ed0191",622:"4bc49d91",641:"36b8f714",870:"cb39f656"}[e]+".css",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},n="slot-machine:",i.l=(e,r,o,a)=>{if(t[e])t[e].push(r);else{var c,s;if(void 0!==o)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==n+o){c=d;break}}c||(s=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",n+o),c.src=e),t[e]=[r];var f=(n,r)=>{c.onerror=c.onload=null,clearTimeout(h);var o=t[e];if(delete t[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(r))),n)return n(r)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),s&&document.head.appendChild(c)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="/",(()=>{if("undefined"!=typeof document){var e={792:0};i.f.miniCss=(t,n)=>{e[t]?n.push(e[t]):0!==e[t]&&{183:1,311:1,347:1,622:1,641:1,870:1}[t]&&n.push(e[t]=(e=>new Promise(((t,n)=>{var r=i.miniCssF(e),o=i.p+r;if(((e,t)=>{for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=(a=n[r]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){var a;if((o=(a=i[r]).getAttribute("data-href"))===e||o===t)return a}})(r,o))return t();((e,t,n,r,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",i.nc&&(a.nonce=i.nc),a.onerror=a.onload=n=>{if(a.onerror=a.onload=null,"load"===n.type)r();else{var i=n&&n.type,c=n&&n.target&&n.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+i+": "+c+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=c,a.parentNode&&a.parentNode.removeChild(a),o(s)}},a.href=t,document.head.appendChild(a)})(e,o,0,t,n)})))(t).then((()=>{e[t]=0}),(n=>{throw delete e[t],n})))}}})(),(()=>{var e={792:0};i.f.j=(t,n)=>{var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=o);var a=i.p+i.u(t),c=new Error;i.l(a,(n=>{if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,r[1](c)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[a,c,s]=n,u=0;if(a.some((t=>0!==e[t]))){for(r in c)i.o(c,r)&&(i.m[r]=c[r]);if(s)var l=s(i)}for(t&&t(n);u<a.length;u++)o=a[u],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(l)},n=self.webpackChunkslot_machine=self.webpackChunkslot_machine||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=i.O(void 0,[826],(()=>i(3900)));a=i.O(a)})();