"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[2138],{81035:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var r=a(96540),n=a(44586),l=a(31402),s=a(5260),c=a(75489),o=a(21312);const u=["zero","one","two","few","many","other"];function m(e){return u.filter((t=>e.includes(t)))}const h={locale:"en",pluralForms:m(["one","other"]),select:e=>1===e?"one":"other"};function i(){const{i18n:{currentLocale:e}}=(0,n.A)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:m(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),h}}),[e])}function p(){const e=i();return{selectMessage:(t,a)=>function(e,t,a){const r=e.split("|");if(1===r.length)return r[0];r.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const n=a.select(t),l=a.pluralForms.indexOf(n);return r[Math.min(l,r.length-1)]}(a,t,e)}}var g=a(5391),d=a(56347),f=a(38193);const y=function(){const e=(0,d.W6)(),t=(0,d.zy)(),{siteConfig:{baseUrl:a}}=(0,n.A)(),r=f.default.canUseDOM?new URLSearchParams(t.search):null,l=(null==r?void 0:r.get("q"))||"",s=(null==r?void 0:r.get("ctx"))||"",c=(null==r?void 0:r.get("version"))||"",o=e=>{const a=new URLSearchParams(t.search);return e?a.set("q",e):a.delete("q"),a};return{searchValue:l,searchContext:s,searchVersion:c,updateSearchPath:t=>{const a=o(t);e.replace({search:a.toString()})},updateSearchContext:a=>{const r=new URLSearchParams(t.search);r.set("ctx",a),e.replace({search:r.toString()})},generateSearchPageLink:e=>{const t=o(e);return`${a}search?${t.toString()}`}}};var E=a(5891),C=a(32384),S=a(86841),v=a(43810),x=a(27674),I=a(2849),w=a(4471),R=a(11088);const A={searchContextInput:"searchContextInput_mXoe",searchQueryInput:"searchQueryInput_CFBF",searchResultItem:"searchResultItem_U687",searchResultItemPath:"searchResultItemPath_uIbk",searchResultItemSummary:"searchResultItemSummary_oZHr",searchQueryColumn:"searchQueryColumn_q7nx",searchContextColumn:"searchContextColumn_oWAF"};function P(){const{siteConfig:{baseUrl:e}}=(0,n.A)(),{selectMessage:t}=p(),{searchValue:a,searchContext:l,searchVersion:c,updateSearchPath:u,updateSearchContext:m}=y(),[h,i]=(0,r.useState)(a),[d,f]=(0,r.useState)(),[S,v]=(0,r.useState)(),x=`${e}${c}`,w=(0,r.useMemo)((()=>h?(0,o.T)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:h}):(0,o.T)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})),[h]);(0,r.useEffect)((()=>{u(h),d&&(h?d(h,(e=>{v(e)})):v(void 0))}),[h,d]);const P=(0,r.useCallback)((e=>{i(e.target.value)}),[]);return(0,r.useEffect)((()=>{a&&a!==h&&i(a)}),[a]),(0,r.useEffect)((()=>{!async function(){const{wrappedIndexes:e,zhDictionary:t}=await(0,E.Z)(x,l);f((()=>(0,C.m)(e,t,100)))}()}),[l,x]),r.createElement(r.Fragment,null,r.createElement(s.A,null,r.createElement("meta",{property:"robots",content:"noindex, follow"}),r.createElement("title",null,w)),r.createElement("div",{className:"container margin-vert--lg"},r.createElement("h1",null,w),r.createElement("div",{className:"row"},r.createElement("div",{className:(0,g.A)("col",{[A.searchQueryColumn]:Array.isArray(R.Hg),"col--9":Array.isArray(R.Hg),"col--12":!Array.isArray(R.Hg)})},r.createElement("input",{type:"search",name:"q",className:A.searchQueryInput,"aria-label":"Search",onChange:P,value:h,autoComplete:"off",autoFocus:!0})),Array.isArray(R.Hg)?r.createElement("div",{className:(0,g.A)("col","col--3","padding-left--none",A.searchContextColumn)},r.createElement("select",{name:"search-context",className:A.searchContextInput,id:"context-selector",value:l,onChange:e=>m(e.target.value)},r.createElement("option",{value:""},R.dz?(0,o.T)({id:"theme.SearchPage.searchContext.everywhere",message:"everywhere"}):""),R.Hg.map((e=>r.createElement("option",{key:e,value:e},e))))):null),!d&&h&&r.createElement("div",null,r.createElement(I.A,null)),S&&(S.length>0?r.createElement("p",null,t(S.length,(0,o.T)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:S.length}))):r.createElement("p",null,(0,o.T)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"}))),r.createElement("section",null,S&&S.map((e=>r.createElement(_,{key:e.document.i,searchResult:e}))))))}function _(e){let{searchResult:{document:t,type:a,page:n,tokens:l,metadata:s}}=e;const o=0===a,u=2===a,m=(o?t.b:n.b).slice(),h=u?t.s:t.t;o||m.push(n.t);let i="";if(R.CU&&l.length>0){const e=new URLSearchParams;for(const t of l)e.append("_highlight",t);i=`?${e.toString()}`}return r.createElement("article",{className:A.searchResultItem},r.createElement("h2",null,r.createElement(c.A,{to:t.u+i+(t.h||""),dangerouslySetInnerHTML:{__html:u?(0,S.Z)(h,l):(0,v.C)(h,(0,x.g)(s,"t"),l,100)}})),m.length>0&&r.createElement("p",{className:A.searchResultItemPath},(0,w.$)(m)),u&&r.createElement("p",{className:A.searchResultItemSummary,dangerouslySetInnerHTML:{__html:(0,v.C)(t.t,(0,x.g)(s,"t"),l,100)}}))}const b=function(){return r.createElement(l.A,null,r.createElement(P,null))}}}]);