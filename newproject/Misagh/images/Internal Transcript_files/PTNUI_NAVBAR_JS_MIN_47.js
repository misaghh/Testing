
if (!(typeof removeClass == 'function')) {
 removeClass = function (obj, sClass0) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" " + sClass0, ""); sClass = sClass.replace(sClass0, ""); obj.setAttribute("class", sClass); }
}

if (!(typeof addClass == 'function')) {
 addClass = function (obj, sClass0) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" "+sClass0) != -1) return; obj.setAttribute("class", sClass + " "+sClass0); }
}

if (!(typeof toggleClass == 'function')) {
 toggleClass = function (obj, sClass0) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" "+sClass0) != -1)
 removeClass(obj, sClass0); else
 addClass(obj, sClass0); }
}

if (!(typeof DoNavBar == 'function')) {
 DoNavBar = function (url) {
 PTNavBar.Toggle(url); }
}

function getThemePortal() {
 var re = /portal:([\w]+)/; var tPortal = re.exec(getCookie("ps_theme")); if (tPortal != null && tPortal.length > 1)
 return tPortal[1]; else
 return "";}

var PTNavBar = {
 Url: "",
 CurTileEl: null,
 OpenState: "",
 StartPersState: "",
 IsOpen: false,
 IsLoaded: false,
 IframeDoc: null,
 IsSFF: false,
 IsAccessible: false,
 Delay: 1000,
 bDirty: false,
 unmruCref: "false", 
 hasMRU : false, 
 nMaxMRU : 5, 
 ptBaseURI : "",
 CurPortal : "",
 backMenuClicked: false,
 backMenuEl: "",
 Load: function() {
 var psNBMask = document.createElement("div"); psNBMask.id = "psNavBarMask"; psNBMask.setAttribute('onclick', 'javascript:DoNavBar();'); var navBarEl = document.createElement("div"); navBarEl.id = "psNavBar"; navBarEl.setAttribute("class", "psNavBar PTNavBarModal"); var nBifel = document.createElement("iframe"); nBifel.id = "psNavBarIFrame"; nBifel.name = "psNavBarIFrame"; nBifel.onload = PTNavBar.FirstLoad; nBifel.title = "NavBar"; nBifel.frameBorder = "0"; nBifel.setAttribute("onmousewheel", "");  PTNavBar.CurPortal = getThemePortal(); if (typeof(sessionStorage) != "undefined") {
 var CachedUrl = sessionStorage.getItem("NavBarUrl_" + PTNavBar.CurPortal); if (CachedUrl != null)
 PTNavBar.Url = CachedUrl; }

 if (typeof(bFMode) == "undefined")
 bFMode = false; nBifel.src = encodeURI(PTNavBar.Url); navBarEl.appendChild(nBifel); var el = document.querySelector('body'); el.appendChild(psNBMask); el.appendChild(navBarEl); var sScript = "processing_empty"; if (eval ("typeof " + sScript + " !== 'function'")) {
 if (document.forms.length > 0)
 sScript = "processing_" + document.forms[0].name; if (bFMode == false) {
 if (typeof ptLoadingStatus_empty === 'function')
 sScript = "ptLoadingStatus_empty"; else {
 var tcFrame = "window.frames['TargetContent']"; if (typeof(window.frames['TargetContent']) !== 'undefined')
 if (window.frames['TargetContent'].document.forms.length > 0)
 sScript = tcFrame + ".processing_" + eval(tcFrame + ".document.forms[0].name"); }
 }
 }
 if (eval ("typeof " + sScript + " === 'function'")) {
 eval(sScript + "(1,1000);"); var rcTimeOutId = setInterval( function() {
 if (PTNavBar.IsLoaded == true) {
 eval(sScript + "(0,1000);"); clearInterval(rcTimeOutId); }
 }, 100); }
 PTNavBar.bDirty = false; PTNavBar.ptBaseURI = getptBaseURI(); },
 Refresh: function() {
 var el = document.querySelector('.PTNavBarModal'); if (el != null) {
 var elIF = el.querySelector('#psNavBarIFrame'); elIF.src = PTNavBar.IframeDoc.document.location.href; if (PTNavBar.IframeDoc.document.getElementById("PTNB$PTNUI_NB_MRU"))
 PTNavBar.hasMRU = true;  }
 PTNavBar.bDirty = false; },
 FirstLoad: function() {
 var el = document.querySelector('.PTNavBarModal'); removeClass(el, PTNavBar.OpenState); if (PTNavBar.IsOpen)
 addClass(el, PTNavBar.OpenState); PTNavBar.Delay = 0; var nbFrame = window.frames['psNavBarIFrame']; if (typeof nbFrame != 'undefined') {
 PTNavBar.IframeDoc = nbFrame; nbFrame.PTNavBar.SetHeaderLabel(''); }
 if (nbFrame.document.getElementById("PTNB$PTNUI_NB_MRU")) {
 PTNavBar.hasMRU = true;  PTNavBar.synchHNAVMRU(); }

 try {
 if (typeof(sessionStorage) != "undefined")
 sessionStorage.setItem("NavBarUrl_" + PTNavBar.CurPortal, nbFrame.location.href); } catch(ex) {
 }
 },
 Toggle: function(navBarUrl) {
 if (typeof(navBarUrl) != 'undefined') {
 PTNavBar.Url = navBarUrl; }

 var el = document.querySelector('.PTNavBarModal'); if (el == null) {
 this.Load(); el = document.querySelector('.PTNavBarModal'); }else if (PTNavBar.bDirty) {
 PTNavBar.Refresh(); }else {
 
 PTNavBar.synchHNAVMRU(); }
 this.IsOpen = !this.IsOpen; this.IsSFF = (document.querySelector('html').getAttribute('class') != null && document.querySelector('html').getAttribute('class').indexOf('psc_form-small') >= 0); this.IsAccessible = (getCookieValue('ps_theme').indexOf('accessibility:A') != -1); if (this.OpenState == '') {
 if (this.CurTileEl == null || this.IsSFF)
 this.OpenState = 'slidein'; else {
 this.OpenState = 'slidein_full'; }
 }

 var elBody = document.querySelector('body'); var nbMask = document.querySelector('#psNavBarMask'); var nbIF = document.querySelector('#psNavBarIFrame'); if (this.IsOpen) {
 nbMask.style.cssText = "display:block"; elBody.style.cssText = "position: fixed; width: 100%; height: 100%; overflow: hidden; -webkit-backface-visibility: hidden; -webkit-transform: translateZ(0);"; if (this.IsAccessible) {
 elBody.style.cssText = elBody.style.cssText + " visibility: hidden;"; if (typeof hidePtWrapper == "function") hidePtWrapper(); addClass(nbMask, 'acs_mode'); addClass(el, 'acs_mode'); }
 this.SetFocus(); nbIF.tabIndex = 0; elBody.tabIndex = -1; }
 else {
 nbMask.style.cssText = "display:none"; elBody.style.cssText = ""; if (this.IsAccessible) {
 if (typeof unhidePtWrapper == "function") unhidePtWrapper(); removeClass(nbMask, 'acs_mode'); removeClass(el, 'acs_mode'); }
 nbIF.tabIndex = -1; elBody.tabIndex = -1; this.SetBlur(); }

 if (this.Delay == 0)
 toggleClass(el, this.OpenState); if (this.IframeDoc != null) {
 PTNavBar.ToggleAriaShowHide(); }

 
 if (this.IframeDoc != null && this.IsOpen && this.OpenState == 'slidein') {
 this.IframeDoc.PTNavBar.SelectTile(this.IframeDoc.PTNavBar.CurTileEl); }

 
 if (typeof(doCloseLocalModals) == 'function') {
 doCloseLocalModals(); if (this.IsSFF && this.IsAccessible && this.IsOpen) {
 if (typeof hidePtWrapper == "function") hidePtWrapper(); }
 if (this.IframeDoc != null && typeof(this.IframeDoc.doCloseLocalModals) == 'function')
 this.IframeDoc.doCloseLocalModals(); }
 },
 OpenInContentArea: function(url, cacheId) {
 
 var sNavItemID = cacheId;  var cacheHTML = null; var prevFldr = null; var backMenuPrevEl = PTNavBar.backMenuEl; if (typeof(cacheId) == "string" && typeof(sessionStorage) != "undefined") {
 var tCacheId = "psNavBarCont_" + top.PTNavBar.CurPortal + "_" + cacheId + "_" + top.document.documentElement.lang; cacheHTML = sessionStorage.getItem(tCacheId); }
 var nbContEl = document.querySelector('.nbcontarea'); if (cacheHTML == null) {
 LaunchURL(null, url,3,'bGrouplet@1;','NB_CONTENT_TGT'); } else {
 if (url.indexOf("PTNUI_MENU_COMP") > -1){
 if (PTNavBar.backMenuClicked == true || document.activeElement.id == "PTNUI_MENU_BACKBTN") {
 PTNavBar.backMenuClicked = false; prevFldr = sessionStorage.getItem("psNavBar_lastFolder"); }
 PTNavBarNavigator.SetLastNavFolder(cacheId); }
 nbContEl.innerHTML = cacheHTML; if (prevFldr != null) {
 var pos = prevFldr.indexOf(":");  if (pos != -1) prevFldr = prevFldr.substring(pos + 1); var listItems = document.querySelectorAll('.lplistitem.fldr a'); var listFldr=null; for (var i = 0; i < listItems.length; i++) {
 listFldr= listItems[i].getAttribute("ptfid"); if (pos != -1) { 
 pos = listFldr.indexOf("_PTUN");  listFldr = listFldr.substring(0, pos); }
 if (listFldr == "fldra_" + prevFldr) {
 if (i > 0) { 
  listItems[i].setAttribute("sfocus",""); listItems[i].setAttribute("tabindex","0"); listItems[0].removeAttribute('sfocus'); listItems[0].setAttribute("tabindex","-1"); }
 break; }
 }
 }

 
 PTNavBar.SetContentFocus();  PTNavBar.buildFluidBreadCrumbs();  }
 if (top.PTNavBar.IsAccessible) {
 var t2 = setTimeout(function() {
 PTNavBar.backMenuEl = document.querySelector(".ptnui_menu_back a"); if (!backMenuPrevEl && PTNavBar.backMenuEl != null)
 PTNavBar.SetAnnounceText("The back to parent and back to root buttons are available to use."); if (backMenuPrevEl != null && PTNavBar.backMenuEl == null)
 PTNavBar.SetAnnounceText("The back to parent and back to root buttons are no longer available."); clearTimeout(t2);},1000);  }
 },
 OpenInWindow: function(url, crefID, crefLabel) {
 if ((typeof crefID != "undefined") && window.top.PTNavBar.hasMRU){
 PTNavBar.saveMRU(crefID, crefLabel, url);  }
 LaunchURL(null, url, 4); },
 saveMRU: function (crefID, crefLabel, url) {
 if (top.PTNavBar.ptBaseURI === "")
 top.PTNavBar.ptBaseURI = getptBaseURI(); var ajaxUrl = top.PTNavBar.ptBaseURI + "s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_MRU_Update"; var isUnav = "false";  var sVal = "", s = ptUtil.id("PTNUI_NB_WRK_PTNUI_SSID"); if (s) { 
 if (!/ptnbsid/.test(s.value))
 sVal = "&ptnbsid=" + s.value; else
 sVal = "&" + s.value;  } 

 if (top.PTNavBar.unmruCref == "false"){
 if((String(url).indexOf("cmd=uninav&Rnode=") != -1) || (String(url).indexOf("?tab=REMOTEUNIFIEDDASHBOARD") != -1 )){
 
 
 var isUnav = "true"; var Unavcref = "DUMMY_PTUN"; var Unavcreflbl = "DUMMY OBJECT";  if (top.PTNavBar.ptBaseURI != "" && String(top.PTNavBar.ptBaseURI).indexOf("/psc/") != -1) 
 {
 ajaxUrl = getptBaseURI()+ "s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_MRU_Update"; }
 
 
 
 var url1 = decodeURIComponent(url);  var PtunStr = url1.substring(url1.indexOf("{PTUN_")); PtunStr = PtunStr.substring(1,PtunStr.indexOf(","));  var pairs = url1.split("}."); if(pairs.length > 0)
 {
 
 var pair = pairs[pairs.length-1]; Unavcreflbl = String(pair).substring(0,pair.indexOf("{"));  Unavcref = String(pair).substring(pair.indexOf("{")+1,pair.indexOf("}")); Unavcref = Unavcref + "_" +PtunStr; }
 
 top.PTNavBar.unmruCref = Unavcref + "$$$" + Unavcreflbl;  top.PTNavBar.unmruCrefhref = url; crefID = top.PTNavBar.unmruCref;  }
 } 

 var params = "mrulist=" + encodeURIComponent(crefID) + "&mruAction=ptmruinst&maxMRU="+ top.PTNavBar.nMaxMRU + sVal; if (isUnav == "true") 
 params = params + "&unmruCref=" + encodeURIComponent(top.PTNavBar.unmruCref) + "&unmruCrefhref=" + encodeURIComponent(top.PTNavBar.unmruCrefhref);  if (typeof crefLabel != "undefined") 
 {
 var urlArray = PTNavBar.URLToArray(url); params = params + "&unfromNavBar=true&unmruCref=" + crefLabel + "&" + PTNavBar.ArrayToURL(urlArray); }
 
 var mruLoader = new net2.ContentLoader(ajaxUrl,null,null,"post",function(){},
 null,params,"application/x-www-form-urlencoded",1,0,null,false); mruLoader = null; },

 URLToArray: function (url) {
 var request = {}; var arr = [];  var pairs =url.split('&'); for (var i = 0; i < pairs.length; i++) {
 var pair = []; if (i === 0 )
 {
 pair[0] = "unnavbarUrl"; pair[1] = pairs[0]; } 
 else
 pair = pairs[i].split('=');  if(PTNavBar.endsWith(decodeURIComponent(pair[0]), '[]') ) {
 var arrName = decodeURIComponent(pair[0]).substring(0, decodeURIComponent(pair[0]).length - 2); if(!(arrName in arr)) {
 arr.push(arrName); arr[arrName] = []; }

 arr[arrName].push(decodeURIComponent(pair[1])); request[arrName] = arr[arrName]; } else {
 request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]); }
 }
 return request; },

 endsWith: function (str, suffix) {
 return str.indexOf(suffix, str.length - suffix.length) !== -1; },

 ArrayToURL: function (array) {
 var pairs = []; for (var key in array)
 if (array.hasOwnProperty(key))
 pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key])); return pairs.join('&');},
 synchHNAVMRU: function() { 
 if (!PTNavBar.hasMRU)
 return;   if ((typeof top.pthNav != "undefined") && top.pthNav.mruRoot && !top.pthNav.mru.dbSaved && top.pthNav.mruRoot.childNodes.length > 0) { 
 top.pthNav.mru.save();  } 
 },
 
 SetContentAreaCache: function(cacheId) {

 
 var sNaveItemID = cacheId
 

 try {
 if (typeof(sessionStorage) == "object") {
 
 sNaveItemID = cacheId;  cacheId = "psNavBarCont_" + top.PTNavBar.CurPortal + "_" + cacheId + "_" + top.document.documentElement.lang; var nbContEl = document.querySelector('.nbcontarea'); sessionStorage.setItem(cacheId, nbContEl.innerHTML);  PTNavBar.buildFluidBreadCrumbs(sNaveItemID);  }
 } catch(ex) {
 }
 },
 SetHeaderLabel: function(lbl) {
 var nbHdrLabelEl = document.querySelector('.nbhdr .nbhdr_lbl > span'); if (nbHdrLabelEl) {
 var nbHdrLabel = nbHdrLabelEl.innerHTML; var needle = ": "; var lblArr = nbHdrLabel.split(needle); if (lbl == "")
 nbHdrLabel = lblArr[0]; else
 nbHdrLabel = lblArr[0] + needle + lbl; nbHdrLabelEl.innerHTML = nbHdrLabel; if (nbHdrLabel == lblArr[0]) {
 if (top.PTNavBar.IsAccessible && top.PTNavBar.OpenState == 'slidein') {
 addClass(nbHdrLabelEl, 'psc_hidden-readable'); } else {
 removeClass(nbHdrLabelEl, 'psc_hidden-readable'); }
 } else {
 removeClass(nbHdrLabelEl, 'psc_hidden-readable'); }
 }
 },
 SelectTile: function(el) {
 if (PTNavBar.CurTileEl != null) {
 toggleClass(PTNavBar.CurTileEl, 'sel'); PTNavBar.CurTileEl.removeAttribute("aria-current"); PTNavBar.CurTileEl.setAttribute("aria-expanded", "false");  PTNavBar.CurTileEl.removeAttribute("aria-controls"); PTNavBar.CurTileEl.setAttribute("aria-haspopup", "true"); if (PTNavBar.CurTileEl != el)
 
 PTNavBar.CurTileEl.setAttribute("tabindex", "-1"); } else {
 
 if (el != null) {
 var nbtiles = el.parentNode.parentNode.children; for (var i = 0; i < nbtiles.length; i++) {
 if (nbtiles[i].lastElementChild.tabIndex == "0") {
 nbtiles[i].lastElementChild.removeAttribute("aria-current"); nbtiles[i].lastElementChild.setAttribute("tabindex", "-1"); break; }
 }
 }
 }

 window.top.PTNavBar.IframeDoc = window.self; if (PTNavBar.CurTileEl == el || el == null) {
 PTNavBar.CurTileEl = null; PTNavBar.HideContentArea(); PTNavBar.SetHeaderLabel(''); if (el != null)
 el.focus();  } else {
 var label = el.querySelector('.ps_groupleth .ps-label'); if (label) {
 PTNavBar.SetHeaderLabel(label.innerHTML); }
 this.CurTileEl = el; toggleClass(PTNavBar.CurTileEl, 'sel'); PTNavBar.CurTileEl.setAttribute("aria-current", "true"); PTNavBar.CurTileEl.setAttribute("aria-expanded", "true"); PTNavBar.CurTileEl.setAttribute("aria-haspopup", "true"); PTNavBar.CurTileEl.setAttribute("tabindex", "0"); var nbContEl = document.querySelector(".nbcontarea"); if (nbContEl != null) {
 PTNavBar.CurTileEl.setAttribute("aria-controls", nbContEl.id);  }; if (top.PTNavBar.IsAccessible && PTNavBar.CurTileEl.id == "PTNB$PTNUI_NB_MRU" && document.querySelectorAll('.lplistgrid').length == 0) {
 var setControlNoData = function() {
 nbContEl = document.querySelector(".nbcontempty a"); if (nbContEl != null)
 PTNavBar.CurTileEl.setAttribute("aria-controls", nbContEl.id);  }; var t1 = setTimeout(function() {setControlNoData();clearTimeout(t1);},1000); }; PTNavBar.ShowContentArea(); }; },
 ShowContentArea: function() {
 if (top.PTNavBar.OpenState != 'slidein_full') {
 var el = top.document.querySelector('.PTNavBarModal'); if (window.top != window.self) {
 window.top.PTNavBar.OpenState = 'slidein_full'; PTNavBar.OpenState = 'slidein_full'; var hdr_el = document.querySelector('.ptnavbar'); removeClass(hdr_el, 'nbmin'); var nbcont_el = document.querySelector('.nbcacont'); removeClass(nbcont_el, 'psc_hidden');  PTNavBar.SetContentFocus(); PTNavBar.ToggleAriaShowHide(); }; replaceClass(el, 'slidein', this.OpenState); }; },
 HideContentArea: function() {
 if (top.PTNavBar.OpenState != 'slidein_full') {
 
 return; }; if (window.top != window.self) {
 window.top.PTNavBar.OpenState = 'slidein'; PTNavBar.OpenState = 'slidein'; var hdr_el = document.querySelector('.ptnavbar'); addClass(hdr_el, 'nbmin'); var nbcont_el = document.querySelector('.nbcacont'); addClass(nbcont_el, 'psc_hidden');  PTNavBar.ToggleAriaShowHide(); }; var el = top.document.querySelector('.PTNavBarModal'); replaceClass(el, 'slidein_full', this.OpenState); },
 StartPersonalization: function() {
 window.top.PTNavBar.StartPersState = PTNavBar.OpenState; PTNavBar.ShowContentArea(); setPSTouchHandlerDraggbles(); },
 StopPersonalization: function() {
 if (window.top.PTNavBar.StartPersState == 'slidein')
 PTNavBar.HideContentArea(); window.top.PTNavBar.StartPersState = ''; window.top.PTNavBar.IsLoaded = true; },
 InitDefaultTile: function() {
 var hdr_el = document.querySelector('.ptnavbar'); if (window.top.PTNavBar.OpenState == 'slidein_full')
 removeClass(hdr_el, 'nbmin'); else
 addClass(hdr_el, 'nbmin'); this.HideContentArea(); var listItems = document.querySelectorAll('.nuinb'); listItems[0].tabIndex = 0; for (var i = 1; i < listItems.length; i++) {
 listItems[i].tabIndex = -1; }
 },
 SetBlur: function() {
 var el = top.document.querySelector('#PT_NAVBAR'); if (el == null)
 el = top.document.querySelector('#pthdr2navbar'); if (el != null)
 el.focus(); },
 SetFocus: function() {
 var fInterval = setInterval(function() {
 try {
 var fEl = window.frames['psNavBarIFrame'].document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_NB_ACTION'); if (!fEl)
 {
 
 fEl = PTNavBar.IframeDoc.document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_ACTION_LINK2'); if (!fEl || fEl && fEl.parentElement.parentElement.offsetParent == null)
 {
 var objs = window.frames['psNavBarIFrame'].document.querySelectorAll('[tabindex="0"]'); for (var i = 0, j = 0; i < objs.length; i++, j++) 
 {
 if (objs[i].offsetParent == null) continue; fEl = objs[i]; if (j > 0)
 break; }
 }
 }
 if (fEl) 
 {
 clearInterval(fInterval); fEl.focus(); }
 } 
 catch(e) {}; }, 200); },
 kbHandler: function(e) {
 var kbSetFocus = function(el, e) {
 if (el) {
 el.focus(); e.preventDefault(); e.stopPropagation(); }
 }; var e = window.event || e;  var fEl = document.activeElement; if (typeof fEl == "undefined" || fEl == null) return; var nbContEl = document.querySelector(".nbcacont"); if (nbContEl == null) return; var fElClass = fEl.getAttribute("class"); if (typeof fElClass == "undefined" || fElClass == null) return; var isTile = (fElClass.indexOf("nuinb") > -1); var isTilePers = (fElClass.indexOf("nbtile-row") > -1 && window.top.PTNavBar.StartPersState != null); var inCont = (nbContEl.compareDocumentPosition(fEl) & Node.DOCUMENT_POSITION_CONTAINED_BY); var isListItem = false; var isFolder = false; var menuRowEl; if (inCont > 0) {
 menuRowEl = fEl.parentElement.parentElement; isListItem = (menuRowEl.getAttribute("class").indexOf("lplistitem") > -1); isFolder = ((menuRowEl.getAttribute("class").indexOf("fldr") > -1) || (menuRowEl.getAttribute("class").indexOf("categorylist") > -1));  }


 switch (e.keyCode) {
 case 9: 
 var winName = ((typeof document.forms != "undefined") && (document.forms.length > 0)) ? document.forms[0].name : "win1"; if ((e.target.id == "ICLastAnchor_" + winName) || (e.target.id == "ICFirstAnchor_" + winName)) {
 var elGear = document.getElementById("PTNUI_NB_HDRWRK_PTNUI_NB_ACTION"); var elClose = document.getElementById("PTNUI_NB_HDRWRK_PTNUI_ACTION_LINK2"); var elCancel = null; if (nbContEl.getAttribute("class").indexOf("addtilecontainer") > -1)
 elCancel = document.getElementById("PTUN_GSRC_N_WRK_CANCEL_BTN");  else
 elCancel = document.getElementById("PTNUI_NB_HDRWRK_PTNUI_BACK_BTN");  if (elGear && elGear.offsetParent != null)
 kbSetFocus(elGear,e);  else if (elClose && elClose.offsetParent != null)
 kbSetFocus(elClose,e);  else if (elCancel && elCancel.offsetParent != null)
 kbSetFocus(elCancel, e); else {
 var firstElem = document.getElementById("PTNUI_DOCK_REC$0_row_0"); if ((typeof firstElem != "undefined") && (firstElem!= null) && (firstElem.childNodes.length >= 3))
 kbSetFocus(firstElem.childNodes[2],e);  }
 } 

 break; case 27: 
 if (isFolder || isListItem) {
 var nextEl = document.querySelector(".ptnui_menu_back a"); if (nextEl) {
 PTNavBar.backMenuClicked = true; nextEl.click(); break; }
 }
 top.PTNavBar.Toggle(); PTNavBar.SetBlur(); e.preventDefault(); break; case 35: 
 var nextEl = null; if (isListItem) {
 var nextRowEl = fEl.parentElement.parentElement.parentElement.parentElement.querySelector("li:last-child"); if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".lplistitem a"); }
 }
 if (isTile) {
 nextEl = document.querySelector(".nbtilegrid .ps_grid-body>li:last-child .nuinb"); }
 if (nextEl) {
 nextEl.focus(); e.preventDefault(); e.stopPropagation(); }
 break; case 36: 
 var nextEl = null; if (isListItem) {
 var nextRowEl = fEl.parentElement.parentElement.parentElement.parentElement.querySelector("li:first-child"); if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".lplistitem a"); }
 }
 if (isTile) {
 nextEl = document.querySelector(".nbtilegrid .ps_grid-body>li:first-child .nuinb"); }
 kbSetFocus(nextEl,e); break; case 37: 
 var nextEl = document.querySelector(".ptnui_menu_back a"); if (nextEl) {
 PTNavBar.backMenuClicked = true; nextEl.click(); break; }
 break; case 38: 
 var nextEl = null; if (isTile) {
 var nextRowEl = fEl.parentElement.previousElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".nuinb"); }
 } else if (isListItem) {
 var nextRowEl = menuRowEl.parentElement.parentElement.previousElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".lplistitem a"); }
 }
 kbSetFocus(nextEl,e); break; case 39: 
 if (isFolder) fEl.click(); break; case 40: 
 var nextEl = null; if (isTile) {
 var nextRowEl = fEl.parentElement.nextElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".nuinb"); }
 } else if (isListItem) {
 var nextRowEl = menuRowEl.parentElement.parentElement.nextElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".lplistitem a"); }
 }
 kbSetFocus(nextEl,e); break; default:
 break; }
 },
 SetContentFocus : function() {
 var currURL = null; if(typeof window != 'undefined' && window && typeof window.location != 'undefined' && window.location) 
 currURL = window.location.href; if(typeof currURL != 'undefined' && currURL && currURL.indexOf("ptreqfrom=rc") != -1)
 return; var fEl = document.querySelector("a[sfocus]"); if (fEl)
 fEl.focus(); },
 ToggleAriaShowHide : function() {
 var showhide = !top.PTNavBar.IsOpen; var nbshowhide = showhide; if (top.PTNavBar.IsSFF && top.PTNavBar.IsAccessible)
 nbshowhide = !(top.PTNavBar.IsOpen && top.PTNavBar.OpenState == 'slidein'); var nbtiles = top.PTNavBar.IframeDoc.document.querySelectorAll(".nbtilegrid .nuinb"); for (var i = 0; i < nbtiles.length; i++) {
 nbtiles[i].setAttribute("aria-hidden", nbshowhide); }; var persEl = top.PTNavBar.IframeDoc.document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_NB_ACTION'); if (persEl)
 persEl.setAttribute("aria-hidden", showhide);  var closeEl = top.PTNavBar.IframeDoc.document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_ACTION_LINK2'); if (closeEl)
 closeEl.setAttribute("aria-hidden", showhide); },
 SetAnnounceText : function(str) {
 var ariaLiveEl = document.querySelector(".ps_box-announce.ps_alert-normal"); if (ariaLiveEl) {
 var originalStr = unescape(str); var t = document.createTextNode(originalStr); if (!t) return; while (ariaLiveEl.firstChild) {
 ariaLiveEl.removeChild(ariaLiveEl.firstChild); }
 ariaLiveEl.appendChild(t); }
 },

 
 buildFluidBreadCrumbs : function (sNavItemID) {

 var aBreadCrumbs = []; var oBreadCrumbs = ""; var oBreadCrumbs = "";  var oBreadCrumbDiv = document.querySelector(".BreadCrumb"); if(oBreadCrumbDiv == null) {
 var oBreadCrumbDiv = document.createElement("div"); var parentDiv = document.querySelector(".ps_mid_section"); var childDiv = parentDiv.childNodes[1]; oBreadCrumbDiv.setAttribute("class", "BreadCrumb"); parentDiv.insertBefore(oBreadCrumbDiv, childDiv); } 

 if (typeof sNavItemID !== "undefined" & sNavItemID != null & sNavItemID != "") {
 var oNavItem = PTNavBar.getCacheDetails(sNavItemID); aBreadCrumbs.push(oNavItem); sBreadCrumbs = JSON.stringify(aBreadCrumbs); oBreadCrumbs = JSON.parse(sBreadCrumbs); } else {
 if(oBreadCrumbDiv != null) {
 while (oBreadCrumbDiv.firstChild) {
  oBreadCrumbDiv.removeChild(oBreadCrumbDiv.firstChild); }
 }
 oBreadCrumbs = PTNavBar.getBreadCrumbTrail(); }


 for ( i= oBreadCrumbs.length;i > 0; i--) {
 sLabel = oBreadCrumbs[i - 1].Label; sName = oBreadCrumbs[i - 1].Name; sURL = oBreadCrumbs[i - 1].URL; sParent = oBreadCrumbs[i - 1].Parent; sNavItemID = sName.replace(":", "-"); sParent = sParent.replace(":", "-"); var oChildDiv = document.querySelector("#" + sNavItemID);  if(oChildDiv !== null) {
 oChildDiv.innerHTML = sLabel; } else {
 var baseElem = document.createElement("a"); baseElem.setAttribute("href", "#"); baseElem.setAttribute("style", "color:#000; pointer-events: none;cursor: default;text-decoration:none !important;"); baseElem.setAttribute("id", sNavItemID); baseElem.innerHTML = sLabel; oBreadCrumbDiv.appendChild(baseElem); }

 if(sParent != "") {
 
 var oParentDiv = document.querySelector("#" + sParent);  if(oParentDiv != null) {
 oParentDiv.setAttribute("style", ""); oParentDiv.setAttribute("href", sURL);  oParentDiv.setAttribute("style", "color:#2e6596;text-decoration:underline !important;padding-right: 10px; !important;"); }
 }
 }
 }, 
 getBreadCrumbTrail : function () {
 var aBreadCrumbs = []; var sNavItemID = sessionStorage.getItem("psNavBar_lastFolder")

 var sJSON = ""; var oJSON = ""; if (typeof sNavItemID !== "undefined" & sNavItemID != null & sNavItemID != "") {
 do {
 var oNavItem = PTNavBar.getCacheDetails(sNavItemID); aBreadCrumbs.push(oNavItem); sJSON = JSON.stringify(aBreadCrumbs); oJSON = JSON.parse(sJSON); sNavItemID = oJSON[oJSON.length - 1].Parent; } while (oJSON[oJSON.length - 1].Parent != ""); }

 return oJSON; }, 
 getCacheDetails : function (sNavItemID) {
 var sCacheID = "psNavBarCont_" + top.PTNavBar.CurPortal + "_" + sNavItemID + "_" + top.document.documentElement.lang; var aFold = [];  var sUrlRaw = ""; var sParentFolderID = ""; var sFolderName = ""; if(sCacheID.indexOf("PORTAL_ROOT_OBJECT") == -1) {

 var oNavItem = document.createElement("div"); oNavItem.innerHTML = sessionStorage.getItem(sCacheID); var oFolder = oNavItem.getElementsByClassName("ps_box-value");  if(typeof(oFolder) != "undefined" & oFolder.length > 0) {
 var sFolderName = oFolder[0].innerHTML; var oParentFolder = oNavItem.getElementsByClassName("ps-button"); var sUrlRaw = oParentFolder[0].getAttribute("href");   var sUrl = decodeURIComponent(sUrlRaw);   var re = /(.*\'\, \')(.*)(\'\).*)/; var sParentFolderID = sUrl.replace(re, "$2"); } else {
  sParentFolderID = "";  sFolderName = "" 
 }
 } else {
 sParentFolderID = ""; sFolderName = "Home";  }

 var oBreadCrumb = new BreadCrumb(sNavItemID,sFolderName,sParentFolderID, sUrlRaw ); return oBreadCrumb; }
 
};var PTNavBarNavigator = {
 SetLastNavFolder : function(fldr) {
 try {
 if (typeof(sessionStorage) == "object") {
 sessionStorage.setItem("psNavBar_lastFolder", fldr); }
 } catch(ex) {
 }
 }
};function BreadCrumb(sName, sLabel, sParent, sURL) {
 this.Name = sName; this.Label = sLabel; this.Parent = sParent; this.URL = sURL;}
