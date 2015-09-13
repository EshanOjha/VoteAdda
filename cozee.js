var ax=null;
var userLogin=0;
function createForm()
{
var my_form=document.createElement('FORM');
my_form.name='myForm';
my_form.method='POST';
my_form.align='center';
var newlabel2 = document.createElement("Label");
newlabel2.innerHTML = "Please Login Here";
my_form.appendChild(newlabel2);
var line1=document.createElement("br");
my_form.appendChild(line1);
var line12=document.createElement("br");
my_form.appendChild(line12);
var newlabel = document.createElement("Label");
newlabel.innerHTML = "Enter Your Name";
my_form.appendChild(newlabel);
var my_tb1=document.createElement('INPUT');
my_tb1.type='TEXT';
my_tb1.name='myInput';
my_tb1.id='username';
my_form.appendChild(my_tb1);
var line=document.createElement("br");
my_form.appendChild(line);
var newlabel1 = document.createElement("Label");
newlabel1.innerHTML = "Enter Your Email";
my_form.appendChild(newlabel1);
var my_tb3=document.createElement('INPUT');
my_tb3.type='TEXT';
my_tb3.name='myInput';
my_tb3.id='email';
my_form.appendChild(my_tb3);
var buttonnode=document.createElement('input');
buttonnode.setAttribute('type','button');
buttonnode.setAttribute('name','Login');
buttonnode.setAttribute('value','Login');
buttonnode.addEventListener("click", Hi);
var line1=document.createElement("br");
my_form.appendChild(line1);
my_form.appendChild(buttonnode);
var t1=document.getElementById('loginSpan');
t1.appendChild(my_form);
}
function saveQuestion()
{
var q=document.getElementById('question').value;
ax=getReference();
var params={
question:q
};
var url="./saveQuestion?";
var urlParams=Object.keys(params).map(function(key){
return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');
url+=urlParams;
ax.open("GET",url,true);
ax.onreadystatechange=function(){
if(ax.readyState===4 && ax.status===200)
{
var answer=ax.responseText.split(",");
if(answer=='NotLogin')
{
alert('Not Login. please login fist and add Question');
createForm();
}
if(answer=='Login')
{
clearEmployeeTable();
getQuestions();
}
}
};
ax.send();
}
function Hi()
{
var n=document.getElementById('username').value;
var em=document.getElementById('email').value;
var params={
name:n,
email:em
};
var url="./loginInformation?";
var urlParams=Object.keys(params).map(function(key){
return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');
url+=urlParams;
ax.open("GET",url,true);
ax.onreadystatechange=function(){
if(ax.readyState===4 && ax.status===200)
{
userLogin=1;
var ans=ax.responseText;
var t1=document.getElementById('forbutton');
t1.innerHTML=" ";
var newlabel2 = document.createElement("Label");
newlabel2.innerHTML = "HI   "+ans;
newlabel2.className="label-name";
t1.appendChild(newlabel2);
var r1=document.getElementById('loginSpan');
r1.innerHTML=" ";
}
};
ax.send();
}
function setName()
{
var firstName= '<%= session.getAttribute("name")%>';
if(firstName)
{
var t=document.getElementById('forbutton');
NewButton = document.createElement('input');
NewButton.type = 'button';
NewButton.value = 'Login';
NewButton.id = 'loginbutton';
NewButton.className = 'rightbutton'; // added a class name here
NewButton.onclick = function () {
createForm();
};
t.appendChild(NewButton);
}
else
{
var t1=document.getElementById('forname');
var newlabel2 = document.createElement("Label");
newlabel2.innerHTML = "HI   "+firstName;
newlabel2.className="label-name";
t1.appendChild(newlabel2);
}
}
function getData()
{
setName();
getQuestions();
}
function getReference()
{
if(window.XMLHttpRequest)
{
ax=new XMLHttpRequest();
}
return ax;
}
function getQuestions()
{
ax=getReference();
ax.open('GET','GetQuestions',true);
ax.onreadystatechange=questionsReceived;
ax.send();
}
function cellClicked(value,q)
{
if(userLogin==0)
{
alert('You are not login please Login before vote');
createForm();
}
else
{
var v=q;
if(value=='upvote')
{
ax=getReference();
var params={
question:v
};
var url="./updateUpvote?";
var urlParams=Object.keys(params).map(function(key){
return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');
url+=urlParams;
ax.open("GET",url,true);
ax.onreadystatechange=function(){
if(ax.readyState===4 && ax.status===200)
{
clearEmployeeTable();
getQuestions();
}
};
ax.send();
}
if(value=='downvote')
{
var v=q;
ax=getReference();
var params={
question:v
};
var url="./updateDownvote?";
var urlParams=Object.keys(params).map(function(key){
return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');
url+=urlParams;
ax.open("GET",url,true);
ax.onreadystatechange=function(){
if(ax.readyState===4 && ax.status===200)
{
clearEmployeeTable();
getQuestions();
}
};
ax.send();
}
}
}
function questionsReceived()
{
if(ax.readyState===4 && ax.status===200)
{
clearEmployeeTable();
var et=document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
var data=ax.responseText.split(',');
var x=0;
var serialNumber=1;
var row=null;
var cell=null;
var index=1;
while(x<data.length-1)
{
row=et.insertRow(serialNumber-1);
row.innerHTML=data[x];
serialNumber++;
row1=et.insertRow(serialNumber-1);
cell=row1.insertCell(0);
cell.innerHTML="<img src='/cozee.com/icons/upvote.png'/>";
(function(xx,zz){
cell.addEventListener("click",function(){
cellClicked(xx,zz);
});
})('upvote',data[x]);
cell=row1.insertCell(1);
cell.innerHTML=data[x+1];
cell.id='upvote_'+index;
index++;
cell=row1.insertCell(2);
cell.innerHTML="<img src='/cozee.com/icons/downvote.png'/>";
(function(xx,yy){
cell.addEventListener("click",function(){
cellClicked(xx,yy);
});
})('downvote',data[x]);
cell=row1.insertCell(3);
cell.innerHTML=data[x+2];
cell.id='downvote_'+index;
index++;
serialNumber++;
x=x+3;
}
}
}
function clearEmployeeTable()
{
var et=document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
while(et.rows.length>0)
{ 
et.deleteRow(0);
}
}
