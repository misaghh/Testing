if (document.getElementsByClassName("titletext")[0].innerHTML == " " || document.getElementsByClassName("titletext")[0].innerHTML == "&nbsp;")
{
document.getElementsByClassName("titletext")[0].innerHTML = document.getElementsByTagName("title")[0].innerHTML;}