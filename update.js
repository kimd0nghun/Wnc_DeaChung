document.getElementById("manage").addEventListener("click", main);
function main() {
    open("./managerPage.html", "_self");
}

let classfication = localStorage.getItem("classfication");

let collection = classfication + "s";
console.log(collection);
let id = localStorage.getItem("id");
let name = localStorage.getItem("name");

let array = new Array();

document.getElementById("id").innerHTML = id;

var pwtext = document.getElementById("pw");
var pwnode = "";

var nametext = document.getElementById("name");
nametext.placeholder = name;

document.getElementById("out").addEventListener("click", out);

function out() {
    alert("회원을 탈퇴합니다.");
    localStorage.clear();

    db.collection(collection)
        .doc(id)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
            open("./index.html", "_self");
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
}

if (classfication == "student") {
    var radio = (document.getElementById("student").checked = true);
    db.collection("students")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (id == `${doc.data().id}`) {
                    pw = `${doc.data().pw}`;
                }
            });
        })
        .then(() => {
            for (var i = 0; i < pw.length; i++) {
                pwnode += "*";
            }
            console.log(pw.length);
            pwtext.placeholder = pwnode;
        });
} else if (classfication == "manager") {
    var radio = (document.getElementById("manager").checked = true);
    db.collection("managers")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (id == `${doc.data().id}`) {
                    pw = `${doc.data().pw}`;
                }
            });
        })
        .then(() => {
            for (var i = 0; i < pw.length; i++) {
                pwnode += "*";
            }
            pwtext.placeholder = pwnode;
        });
} else if (classfication == "teacher") {
    var radio = (document.getElementById("teacher").checked = true);
    db.collection("teachers")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (id == `${doc.data().id}`) {
                    pw = `${doc.data().pw}`;
                    imgpath = `${doc.data().imgpath}`;
                    console.log(imgpath);
                    career = `${doc.data().career}`;
                    field = `${doc.data().field}`;
                    console.log(career);
                }
            });
        })
        .then(() => {
            for (var i = 0; i < pw.length; i++) {
                pwnode += "*";
            }
            pwtext.placeholder = pwnode;
            array = career.split(",");
            console.log(array);
            var subjecttext = document.getElementById("subject");
            subjecttext.placeholder = field;
            var schooltext = document.getElementById("school");
            schooltext.placeholder = array[0];
            var awardtext = document.getElementById("award");
            awardtext.placeholder = array[1];
            var careertext = document.getElementById("career");
            careertext.placeholder = array[2];
        });

    document.getElementById("img").disabled = false;
    document.getElementById("subject").disabled = false;
    document.getElementById("school").disabled = false;
    document.getElementById("award").disabled = false;
    document.getElementById("career").disabled = false;
}
var pw;
var imgpath;
var career;
var field;
document.getElementById("update").addEventListener("click", update);

function update() {
    var updatepw = document.getElementById("pw").value;
    var updatename = document.getElementById("name").value;

    console.log(updatepw);

    if (pw !== updatepw) {
        if (updatepw == "") {
        } else {
            db.collection(collection).doc(id).update({
                pw: updatepw,
            });
            console.log(updatepw);
        }
    }

    if (name !== updatename) {
        if (updatename == "") {
        } else {
            //localStorage.setItem("classfication", classfication);
            localStorage.setItem("name", updatename);
            db.collection(collection).doc(id).update({
                name: updatename,
            });
            console.log(updatename);
        }
    }

    var length = document.getElementsByName("member").length;
    for (var i = 0; i < length; i++) {
        if (document.getElementsByName("member")[i].checked == true) {
            var classfication = document.getElementsByName("member")[i].value;
        }
    }

    if (classfication == "teacher") {
        var updatesubject = document.getElementById("subject").value;
        var updateschool = document.getElementById("school").value;
        var updateaward = document.getElementById("award").value;
        var updatecareer = document.getElementById("career").value;

        if (field !== updatesubject) {
            if (updatesubject == "") {
            } else {
                db.collection(collection).doc(id).update({
                    field: updatesubject,
                });
                console.log(updatesubject);
            }
        }

        if (array[0] !== updateschool) {
            if (updateschool == "") {
            } else {
                array[0] = updateschool;
            }
        }
        if (array[1] !== updateaward) {
            if (updateaward == "") {
            } else {
                array[1] = updateaward;
            }
        }
        if (array[2] !== updatecareer) {
            if (updatecareer == "") {
            } else {
                array[2] = updatecareer;
            }
        }
        console.log(array);

        db.collection(collection).doc(id).update({
            career: array,
        });

        if (file == undefined) {
        } else {
            Upload = path.put(file);

            db.collection(collection).doc(id).update({
                imgpath: file.name,
            });
        }
    }
    alert("회원정보가 수정되었습니다.");
    //open("./index.html","_self");
}

document.getElementsByName("member")[1].addEventListener("click", inputteacher);
document
    .getElementsByName("member")[0]
    .addEventListener("click", disableteacher);
document
    .getElementsByName("member")[2]
    .addEventListener("click", disableteacher);

function inputteacher() {
    document.getElementById("img").disabled = false;
    document.getElementById("subject").disabled = false;
    document.getElementById("school").disabled = false;
    document.getElementById("award").disabled = false;
    document.getElementById("career").disabled = false;
}

function disableteacher() {
    document.getElementById("img").disabled = true;
    document.getElementById("subject").disabled = true;
    document.getElementById("school").disabled = true;
    document.getElementById("award").disabled = true;
    document.getElementById("career").disabled = true;
}

var file;
// console.log(file);
var storageRef = storage.ref();
var path;
var Upload;
function imgset() {
    file = document.querySelector("#img").files[0];
    path = storageRef.child(`images/${file.name}`);
    console.log(file.name);
}

document.getElementById("cancel").addEventListener("click", cancel);
function cancel() {
    open("./index.html", "_self");
}
$(document).ready(function () {
    if (classfication == "manager") {
        document.getElementById("manage").style.display = "inline-bock";
    }
});
