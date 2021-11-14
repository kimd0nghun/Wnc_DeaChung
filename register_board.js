// const { default: firebase } = require("firebase");

let save = document.getElementById("save");
let cancel = document.getElementById("cancel");

let title = document.getElementById("title");
let recruitment_number = document.getElementById("recruitment_number");
let author = document.getElementById("author");
// let date = document.getElementById("date");
let term = document.getElementById("term");
let text = document.getElementById("text");

function format(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "." + month + "." + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}
function click_save() {
    let userId = localStorage.getItem("id"); //id
    let userClassfication = localStorage.getItem("classfication"); //student, teacher, manager
    let userName = localStorage.getItem("name");
    let tempDate = new Date();
    let userDate = format(tempDate);
    let black = false;
    alert(userId);
    db.collection("teachers")
        .doc(userId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                black = doc.data().blacklist;
                alert(doc.data());
            });
        });

    alert(black);
    if (black == true) {
        console.log("!!");
        alert("블랙리스트에 올랐습니다. 게시물작성불가");
        return;
    }

    let userTitle = title.value;
    let userRecruitment_number = recruitment_number.value;
    let userAuthor = author.value;
    let userTerm = term.value;
    let userText = text.value;
    let userTimestamp = new Date().getTime();
    let docData = {
        id: userId,
        classfication: userClassfication,
        title: userTitle,
        author: userAuthor,
        date: userDate,
        recruitment_number: userRecruitment_number,
        term: userTerm,
        text: userText,
        timestamp: userTimestamp,
        count: 0,
    };
    // let now = new Date().getTime();
    // console.log(now);
    db.collection("board")
        .doc("main")
        .collection("boards")
        .doc(userTimestamp.toString())
        .set(docData)
        .then(() => {
            console.log(`doc main writtend`);
        });
    db.collection("board")
        .doc(userId)
        .collection("register_board")
        .doc(userTimestamp.toString())
        .set(docData)
        .then(() => {
            console.log(`doc user writtend`);
            opener.document.location.reload();
            close();
        });
}
function click_cancel() {
    close();
}
cancel.addEventListener("click", click_cancel);
save.addEventListener("click", click_save);
