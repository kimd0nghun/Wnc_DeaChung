document.getElementById("login_btn").addEventListener("click", click);
document
    .getElementById("teacherList")
    .addEventListener("click", click_teacherList);
let update = document.getElementById("update");
let logout_btn = document.getElementById("logout_btn");
let register = document.getElementById("register_board");
let my_board = document.getElementById("my_board");
let search = document.getElementById("category_search");
function click_register() {
    open("./register_board.html");
}
function click_my_board() {
    open("./my_board.html");
}
function click_logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("classfication");
    localStorage.removeItem("timestamp");
    localStorage.removeItem("teacher_id");
    localStorage.removeItem("alert");
    document.getElementById("users").innerHTML = "";
    document.getElementById("users").style.color = "blue";
    document.getElementById("users").style.display = "none";

    document.getElementById("register_board").style.display = "none";
    document.getElementById("my_board").style.display = "none";

    document.getElementById("login_btn").style.display = "inline-block";
    document.getElementById("update").style.display = "none";
    document.getElementById("logout_btn").style.display = "none";
}
function click_update() {
    open("./update.html");
}
$(document).ready(function () {
    let id = localStorage.getItem("id");

    db.collection("students")
        .doc(id)
        .collection("join")
        .get()
        .then((a) => {
            a.forEach((doc) => {
                console.log(doc.id);
                docID = doc.id;
                time = doc.data().timestamp;
                console.log(time + "time");
                let cnt = 0;
                let max = 0;
                db.collection("board")
                    .doc(docID)
                    .collection("register_board")
                    .doc(time)
                    .get()
                    .then((q) => {
                        q.forEach((d) => {
                            cnt = d.data().count;
                            max = d.data().recruitment_number;
                            console.log(cnt + "asd");
                            if (cnt >= max) {
                                localStorage.setItem("alert", true);
                            }
                        });
                    });
            });
        });
});
function init() {
    let img = document.getElementById("alert_icon");
    if (img.src == "./images/is_notification.png");
    let classfication = localStorage.getItem("classfication");
    let id = localStorage.getItem("id");
    let name = localStorage.getItem("name");
    let alert = localStorage.getItem("alert");
    let docID = "";
    let time = "";
    // console.log(cnt + "asd");

    console.log(id);
    if (alert) {
        storageRef
            .child("init_images/" + `is_notification.png`)
            .getDownloadURL()
            .then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open("GET", url);

                // Or inserted into an <img> element:
                document.getElementById("alert_icon").src = url;
            })
            .catch(function (error) {
                console.log(error);
            });

        //빨간불
    } else {
        storageRef
            .child("init_images/" + `notification.png`)
            .getDownloadURL()
            .then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open("GET", url);

                // Or inserted into an <img> element:
                document.getElementById("alert_icon").src = url;
            })
            .catch(function (error) {
                console.log(error);
            });

        storageRef
            .child("init_images/" + `left-arrow.png`)
            .getDownloadURL()
            .then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open("GET", url);

                // Or inserted into an <img> element:
                document.getElementById("page_icon1").src = url;
            })
            .catch(function (error) {
                console.log(error);
            });
        storageRef
            .child("init_images/" + `right-arrow.png`)
            .getDownloadURL()
            .then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open("GET", url);

                // Or inserted into an <img> element:
                document.getElementById("page_icon2").src = url;
            })
            .catch(function (error) {
                console.log(error);
            });
        //기본
    }
    if (id != null) {
        console.log(id);
        document.getElementById("users").innerHTML = name;
        document.getElementById("users").style.color = "blue";

        document.getElementById("login_btn").style.display = "none";
        document.getElementById("update").style.display = "inline-block";
        document.getElementById("logout_btn").style.display = "inline-block";

        if (classfication == "student") {
            document.getElementById("users").innerHTML += " 학생";
        } else if (classfication == "teacher") {
            document.getElementById("users").innerHTML += " 선생님";

            document.getElementById("my_board").style.display = "inline-block";
            document.getElementById("register_board").style.display =
                "inline-block";
        } else {
        }
    }
}
function click_teacherList() {
    open("./teacherList.html");
}

function click() {
    open("./login.html");
}
init();
logout_btn.addEventListener("click", click_logout);
update.addEventListener("click", click_update);
my_board.addEventListener("click", click_my_board);
register.addEventListener("click", click_register);
