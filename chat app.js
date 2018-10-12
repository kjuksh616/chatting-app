loadScriptTag("https://www.gstatic.com/firebasejs/5.3.0/firebase.js",onLoadFirebase);
var database;    

function onLoadFirebase(){

  var config = {
    apiKey: "AIzaSyBEPA7ZauB5SBVNW0p2ukspmqWBUe5VZEg",
    authDomain: "oh-yeah-first-project.firebaseapp.com",
    databaseURL: "https://oh-yeah-first-project.firebaseio.com",
    projectId: "oh-yeah-first-project",
    storageBucket: "",
    messagingSenderId: "469992225588"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  
  
//  seonghyeon.name = "성현";
//  seonghyeon.height = 171;
//  seonghyeon.mental = "증발";
//  database.ref('myInfo').set(seonghyeon);
    database.ref('myInfo').on('value',function(snapshot){
    });

};


var chatbx = box().append().size(300,40).border(2).editable();
var enter = box().append().size(40,40).text("입력").textSize('auto').border(2).borderRadius(10).marginLeft(5).click(onClick);
function onClick(){
    var d = new Date();
    database.ref('msg').push().set({content:chatbx.text(), date: d.getFullYear()+"-"+(d.getMonth()+1)+"-"+ d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" ", id : myid});
}
function maketx(){ 
    box().append().size(400,50).text(chatbx.text());
}

var parent  = box().append();

function loadMsgs(){
    database.ref('msg').on('value', function(snapshot){
        parent.clear();
        snapshot.forEach(function(childSnapshot){
            box().appendTo(parent).text(childSnapshot.val().content + childSnapshot.val().date + childSnapshot.val().id);
        });
    } );
    
}

var login1 = box().append().size(270,200).borderRadius(5).color('white').text('로그인').shadow(0,0,0,2).positionFixed().center();
var id1 = box().appendTo(login1).size(240,30).editable().marginBottom(6).marginTop(6);
var login2 = box().appendTo(login1).size(240,30).editable().marginBottom(6).marginTop(6);
var id2 = box().appendTo(login1).size(240,30).button().text('로그인').marginBottom(6).marginTop(6).click(login);
var password = box().appendTo(login1).size(240,30).button().text('회원가입').click(join);
function join(){
    var ids = [];
    // if(datastore().get('ids')){
    //     ids = datastore().get('ids');
    //     var user = false;
    //     for(var i = 0; i<ids.length; i++){
    //         if(ids[i]==id1.text()){
    //             user = true;
    //             break;
    //         }
    //     }
    //     if(user){
    //         alert('이미 가입된 회원입니다.');
    //         return;
    //     }
    // }
    
    // ids.push(id1.text());
    

    database.ref('log/'+id1.text()).set({id: id1.text() , pw : login2.text()});
    // datastore().put('id'+id1.text(),login2.text());
    
    id1.text('');
    login2.text('');
    alert('회원가입이 완료 되었습니다');
}
    
    var myid="";
function login(){
    database.ref('log/'+id1.text()).on('value', callback);
    function callback(id12){
        if(id12.val()){
            if(id12.val().pw== login2.text()){
                loadMsgs();
                login1.hide()
                if(id2.text()=="로그인"){
                alert("로그인됬습니다")
                id2.text('로그아웃');
                myid = id1.text()
                id1.text('');
                login2.text('');
                
                }
                
            }else{
          alert('패스워드가 틀렸습니다')
            }
        }else{
        alert('아이디가 없읍니다')
        }    
    } 
}

function logout(){
    if(id2.text()== "로그아웃"){
        id2.text("로그인")
        alert("로그아웃 됬습니다")
        id1.text('');
    login2.text('');
    }
}

