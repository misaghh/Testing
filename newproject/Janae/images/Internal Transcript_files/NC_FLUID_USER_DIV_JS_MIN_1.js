if (typeof jQuery !== "undefined") {
 $( document ).ready(function() { 
 pageOnLoads(); });} 
else {
 pageOnLoads();}

function pageOnLoads(){
 
 
 

 
 var ologo = document.getElementById("NC_WELCOME_USER");  if(ologo != null) { 
 ologo.innerHTML = ologo.innerHTML.split("</div>")[0] + " " + getCPName(window.location.href) + "</div>";  } 
 
}


function getCPName(sURL) {
 var aParms = sURL.split("/"); var sSite = aParms[4]; var sNode = aParms[6]; var cpName; if(sNode == "SA") {
 sSite = sSite.replace("pa91", "cs92"); sSite = sSite.replace("paprd", "csprd"); cpName = sSite; }
 else if(sNode == "HRMS") {
 sSite = sSite.replace("pa91", "hc92"); sSite = sSite.replace("paprd", "hcprd"); cpName = sSite; }
 else if(sNode == "ERP") {
 sSite = sSite.replace("pa91", "fs92"); sSite = sSite.replace("paprd", "fsprd"); cpName = sSite; }
 else {
 cpName = sSite; }

 var retcpname = cpName.split("_"); return retcpname[0].toUpperCase();}
