
(function(){


var searchLink = document.querySelector('#pthdrSrchHref');var actionlistSearch = document.querySelector('#pthdr2actionlistsearch');var navBarWidgetDiv = document.querySelector('#pthdr2addtowidget_div') ;flagForshiftTabKeyPress = 0;if(navBarWidgetDiv)
navBarWidgetDiv.setAttribute("role","presentation");if(searchLink && actionlistSearch)
{
 var searchUrl = searchLink.getAttribute("data-searchurl"); actionlistSearch.setAttribute("onclick","DoSearch('BASIC','"+searchUrl+"')"); actionlistSearch.setAttribute("href","#");}
else
{
 ptUtil.addClass(actionlistSearch, 'hideActionMenuSearchLink');}


var headerIconsList = document.querySelectorAll("#pthdr2navbarlinks a");for (var index = 0; index < headerIconsList.length; index++)
{
 var currentElement = headerIconsList[index]; var style = window.getComputedStyle(currentElement); if(style.display === 'block' || style.display === 'inline' )
 { 
 var onKeyDownAttr = currentElement.getAttribute("onkeydown"); if(!onKeyDownAttr)
 {
 currentElement.setAttribute("onkeydown","registerHeaderKeyPress(event)"); }
 }
}


var actionListLinks = document.querySelectorAll("#ACTION_LINK_CONTAINER a.PSHYPERLINK");for (var index = 0; index < actionListLinks.length; index++)
{
 var currentElement = actionListLinks[index]; var roleAttr = currentElement.getAttribute("role"); if(!roleAttr)
 {
 var currentElementRole = currentElement.getElementsByTagName("a")[0] ; if(currentElementRole)
 currentElementRole.setAttribute("role","menuitem"); else
 currentElement.setAttribute("role","menuitem"); }
}

}());function registerHeaderKeyPress(event) {
 var currentTarget = event.currentTarget || event.srcElement; if(isActionListShown())
 {
 switch (event.keyCode)
 {
 case 27: hideActionListMenu();  break; case 9 : event.preventDefault(); onTabKeyPress();  break;  case 38: focusPrevElement(currentTarget); event.preventDefault();  break; case 40: focusNextElement(currentTarget); event.preventDefault();  break; case 16: onKeyPressShiftTab(currentTarget); event.preventDefault();  break; }
 }
 else
 {
 switch (event.keyCode)
 {
 case 32: event.preventDefault();  currentTarget.onclick();  break; }
 }

 return true;}


function isActionListShown() {
 var actionListContainerClass = document.getElementById("pthdr2actionListcontainerfluid").className ; if(actionListContainerClass.indexOf("showActionListMenu") >= 0)
 return true ; else
 return false ;}


function findLastLinkOfActionList(obj) {

 var actionListLinks = new Array(); actionListLinks = findListOfLinksInMenu() ; if(actionListLinks.length > 0)
 lastElementOfActionlist = actionListLinks[actionListLinks.length-1].id; if(obj.id && lastElementOfActionlist && (obj.id == lastElementOfActionlist))
 return true; else
 return false;}


function focusIntoActionList() {
 var actionListTitle = document.getElementById('actionListTitle'); var actionlistheader = document.getElementById('actionListHeader'); var style = window.getComputedStyle(actionlistheader); if(actionListTitle && style.display === 'block')
 actionListTitle.focus(); else
 focusFirstLinkOfActionList(); return true;}


function loopBackFocusIntoActionList() {
 var actionlistCloseIcon = document.getElementById('closeAnchor'); var actionlistheader = document.getElementById('actionListHeader'); var style = window.getComputedStyle(actionlistheader); if(actionlistCloseIcon && style.display === 'block')
 closeAnchor.focus(); else
 focusFirstLinkOfActionList(); return true;}


function focusFirstLinkOfActionList() {
 var actionmenu = document.getElementById("ACTION_LINK_CONTAINER"); if(actionmenu) 
 var nodeList = actionmenu.querySelectorAll("a.ps-link, a.PSHYPERLINK"); for (var index = 0; index < nodeList.length; index++)
 {
 var currentActionListItem = nodeList[index]; var style = window.getComputedStyle(currentActionListItem); if(style.display === 'block') { 
 nodeList[index].focus();  break;  }
 }
 return true;}


function closeActionList(event) {
 var currentTarget = event.currentTarget || event.srcElement; switch (event.keyCode)
  {
 case 27: hideActionListMenu();  break; case 32: event.preventDefault();  hideActionListMenu();  break; case 13: event.preventDefault();  hideActionListMenu();  break; }
 return true;}


function registerSearchTrayKeyPress(event) {
 var currentTarget = event.currentTarget || event.srcElement; switch (event.keyCode)
  {
 case 27: hideSearchContainer();  document.getElementById('pthdr2Search').focus();  break; }
 return true;}


function focusNextElement(currentTarget) {

 var actionListLinks = new Array(); actionListLinks = findListOfLinksInMenu(); if(actionListLinks.length > 0)
 {
 var nodeNumber = actionListLinks.indexOf(currentTarget); if(actionListLinks[nodeNumber+1])
 { actionListLinks[nodeNumber+1].focus(); }
 else
 { focusFirstLinkOfActionList(); }
 }

 return true;}


function focusPrevElement(currentTarget) {

 var actionListLinks = new Array(); actionListLinks = findListOfLinksInMenu(); if(actionListLinks.length > 0)
 {
 var nodeNumber = actionListLinks.indexOf(currentTarget); if(actionListLinks[nodeNumber-1])
 { actionListLinks[nodeNumber-1].focus(); }
 else
 { actionListLinks[actionListLinks.length-1].focus(); }
 }

 return true;}


function findListOfLinksInMenu()
{
 var actionListLinks = new Array(); var actionmenu = document.getElementById("ACTION_LINK_CONTAINER"); if(actionmenu) 
 { var nodeList = actionmenu.querySelectorAll("a.ps-link, a.PSHYPERLINK"); }

 for (var index = 0; index < nodeList.length; index++)
 {
 var currentActionListItem = nodeList[index]; var style = window.getComputedStyle(currentActionListItem); if(style.display === 'block')
 {
 actionListLinks.push(currentActionListItem); }
 }

 return actionListLinks ;}


function onTabKeyPress()
{
 var actionListMask = document.getElementById("actionListContainerMask"); if(actionListMask)
 { actionListMask.style.width = "0%"; }

 var menuObj = document.getElementById("pthdr2actionListcontainerfluid"); ptUtil.removeClass(menuObj, "showActionListMenu");  ptUtil.addClass(menuObj, "hideActionListMenu"); var navBarIcon = document.getElementById("pthdr2navbar"); var notifyWidgetIcon = document.getElementById("pthdr2notify");  var searchWidgetIcon = document.getElementById("pthdr2Search");  if(flagForshiftTabKeyPress)
 { 
 if(notifyWidgetIcon)
 { 
 notifyWidgetIcon.focus();  }
 else if(searchWidgetIcon)
 { 
 searchWidgetIcon.focus();  }
 }
 
 else if(navBarIcon)
 { 
 navBarIcon.focus();  }

 
 flagForshiftTabKeyPress = 0; return true;}


function onKeyPressShiftTab(currentTarget)
{
 flagForshiftTabKeyPress = 1; setTimeout(function(){ flagForshiftTabKeyPress=0; }, 500); return true;}
