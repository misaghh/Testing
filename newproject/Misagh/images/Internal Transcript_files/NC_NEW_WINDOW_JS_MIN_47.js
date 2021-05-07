if (typeof jQuery !== "undefined") {
 $( document ).ready(function() { 
 pageOnLoads(); });} 
else {
 window.onload = pageOnLoads();}

function pageOnLoads(){
 
 addMenuLink("New Window", "javascript:openPSNewWindow();"); addMenuLink("Print", "javascript:printCurrentWindow();");}

function openPSNewWindow() {
 var href = window.location.href; var parts = (!!frames["TargetContent"] ? !!frames["TargetContent"].strCurrUrl ? frames["TargetContent"].strCurrUrl : href : href).match(/(.+?\/ps[pc])\/(.+?)(?:_\d+?)*?\/(.*)/);  var qrystr = parts[3].split("?")[0];  if(qrystr.indexOf("NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI.GBL") > 0 || qrystr.indexOf("PT_FLDASHBOARD.PT_FLDASHBOARD.GBL") > 0) {
 
 window.open(parts[1] + '/' + parts[2] + '_newwin/' + parts[3] + '&skipcnav=1', '_blank'); }
 else if(qrystr.indexOf("PORTAL_ADMIN.PORTAL_CREF_ADM.GBL") > 0 || qrystr.indexOf("PORTAL_ADMIN.PORTAL_FLDR_ADM.GBL") > 0 || qrystr.indexOf("PORTAL_ADMIN.PORTAL_CREF_LNK.GBL") > 0 ) {
 qrystr =qrystr.replace("PORTAL_CREF_ADM", "PORTAL_OBJ_LIST"); qrystr = qrystr.replace("PORTAL_FLDR_ADM", "PORTAL_OBJ_LIST"); qrystr = qrystr.replace("PORTAL_CREF_LNK", "PORTAL_OBJ_LIST"); window.open(parts[1] + '/' + parts[2] + '_newwin/' + qrystr + '?&skipcnav=1', '_blank'); }
 else {
  
 window.open(parts[1] + '/' + parts[2] + '_newwin/' + qrystr + '?&skipcnav=1', '_blank'); }
}
function printCurrentWindow() {
 window.print();}

function addMenuLink(sLabel, sHREF) {
 var oSibling = document.getElementById("pthdr2signout");  var sName = sLabel.replace(/ /g, "");  if(oSibling != null) { 
 var parentDiv = oSibling.parentNode;  var oPrintDiv = parent.document.createElement("a");  oPrintDiv.setAttribute("class", "listitem");  oPrintDiv.setAttribute("href", sHREF);  oPrintDiv.setAttribute("id", sName );  oPrintDiv.setAttribute("title", sLabel);  oPrintDiv.innerHTML = "<span role='listitem'>" + sLabel + "</span>";  parentDiv.insertBefore(oPrintDiv, oSibling); } 
 
 else {
 if(sLabel != "New Window") {
 
 var sessionnum = findSessionNumberRegExp(); var eid = "win" + sessionnum + "hdrdivPT_SYSACT_LOGOUT";   var oSibling = document.getElementById(eid);  if(oSibling != null) { 
 var parentDiv = oSibling.parentNode;  var oPrintDiv = parent.document.createElement("li");  oPrintDiv.setAttribute("role", 'listitem');  oPrintDiv.setAttribute("class", 'ps_box-group psc_layout ps_menuitem');  oPrintDiv.setAttribute("id", "li" + sName );  oPrintDiv.innerHTML = "<div class='ps_box-link' id='div'" + sName + "'><span class='ps-link-wrapper' id='" + sName + "$span'><a class='ps-link' href='" + sHREF + "' ptlinktgt='pt_peoplecode' id='" + sName + "'>" + sLabel + "</a></span></div>";  } 
 }
 } 
 
 if(parentDiv != null) { 
 parentDiv.insertBefore(oPrintDiv, oSibling);  }
}

function findSessionNumber() {
 var chref = window.location.href; var pspindex = chref.indexOf("/psp/"); var psstarthome = 0; if(pspindex == -1) {
 var pscindex = chref.indexOf("/psc/"); psstarthome = pscindex + 5; }
 else {
 psstarthome = pspindex + 5; }
 var phref = chref.substring(psstarthome); var psendhome = phref.indexOf("/"); var sitename = phref.substring(0, psendhome); var sessionindex = sitename.indexOf("_"); if(sessionindex == -1) {
 return "0"; }
 else {
 return sitename.substring(sessionindex + 1); }
}

function findSessionNumberRegExp() {
 var chref = window.location.href; var res = chref.match(/(.+?\/ps[pc])\/(.+?)(\_\d+?)*?\/(.*)/); if(typeof res[3] === "undefined") {
 return "0"; }
 else {
 return res[3].substring(1); }
}