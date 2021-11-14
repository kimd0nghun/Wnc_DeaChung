let cate = document.getElementById("cate");
let category_input = document.getElementById("category_input");
let recruitment_input = document.getElementById("recruitment_input");
let category_search = document.getElementById("category_search");

category_search.addEventListener("click", find);

$(document).ready(function () {
    if (localStorage.getItem("classfication") == "teacher") {
        let teacher_id = localStorage.getItem("id");

        db.collection("board")
            .doc(teacher_id)
            .collection("register_board")
            .where("classfication", "==", "teacher")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New city: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        if (
                            change.doc.data().count >=
                            change.doc.data().recruitment_number
                        ) {
                            console.log(`넘어감`);
                            localStorage.setItem("alert", true);
                            document.getElementById("alert_icon").src =
                                "./images/is_notification.png";
                        }
                        console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed city: ", change.doc.data());
                    }
                });
            });
    } else if (localStorage.getItem("classfication") == "student") {
        let id = localStorage.getItem("id");
        console.log("학생");
        db.collection("students")
            .doc(id)
            .collection("join")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let teacher_id = doc.id;
                    let timestamp = doc.data().timestamp;
                    console.log(teacher_id);
                    db.collection("board")
                        .doc(teacher_id)
                        .collection("register_board")
                        .where("classfication", "==", "teacher")
                        .onSnapshot((snapshot) => {
                            console.log(`실시간`);
                            snapshot.docChanges().forEach((change) => {
                                if (change.type === "added") {
                                    console.log(
                                        "New city: ",
                                        change.doc.data()
                                    );
                                }
                                if (change.type === "modified") {
                                    if (
                                        change.doc.data().count >=
                                        change.doc.data().recruitment_number
                                    ) {
                                        console.log(`넘어감`);
                                        localStorage.setItem("alert", true);

                                        document.getElementById(
                                            "alert_icon"
                                        ).src = "./images/is_notification.png";
                                    }
                                    console.log(
                                        "Modified city: ",
                                        change.doc.data()
                                    );
                                }
                                if (change.type === "removed") {
                                    console.log(
                                        "Removed city: ",
                                        change.doc.data()
                                    );
                                }
                            });
                        });
                    /////
                    // let my_doc = db
                    //     .collection("board")
                    //     .doc(teacher_id)
                    //     .collection("register_board")
                    //     .doc(timestamp);
                    // my_doc.get().then((doc) => {
                    //     // if (doc.exists) {
                    //     //     let cnt = doc.data().count;
                    //     //     let max = doc.data().recruitment_number;
                    //     //     if (cnt >= max) {
                    //     //         document.getElementById("alert_icon").src =
                    //     //             "./images/is_notification.png";
                    //     //     }
                    //     //     // console.log("Document data:", doc.data());
                    //     // } else {
                    //     //     // doc.data() will be undefined in this case
                    //     //     // console.log("No such document!");
                    //     // }
                    // });
                });
            });
    }

    console.log(`main`);
    let tables = [];
    let len = 0;
    db.collection("board")
        .doc("main")
        .collection("boards")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                len++;
                // console.log(doc.id, " => ", doc.data());
            });
        });
    let idx = 1;
    db.collection("board")
        .doc("main")
        .collection("boards")
        .get()
        .then((querySnapshot) => {
            console.log(len);
            querySnapshot.forEach((doc) => {
                $tr = $(`<tr class="tr"></tr>`);
                $("tbody").append($tr);

                $num = $(`<td>${idx++}</td>`);
                $author = $(`<td>${doc.data().author}</td>`);

                $title = $(
                    `<td id="${doc.id}" class="${
                        doc.data().id
                    }" style="color : blue">${doc.data().title}</td>`
                );
                $($title).on("click", click_join_title);
                $count = doc.data().count;
                $recruitment = $(
                    `<td>${$count}/${doc.data().recruitment_number}</td>`
                );

                $date = $(`<td>${doc.data().date}</td>`);
                $term = $(`<td>${doc.data().term}</td>`);

                $($tr).append($num);
                $($tr).append($title);
                $($tr).append($recruitment);
                $($tr).append($author);
                $($tr).append($date);
                $($tr).append($term);
                // console.log(doc);
                // console.log(doc.id, " => ", doc.data());
            });
        });
});
function click_join_title() {
    let child = open("./join.html");
    localStorage.setItem("teacher_id", this.className);
    localStorage.setItem("timestamp", this.id);
    console.log(this.id);
}

function find() {
    console.log("click");
    $("tbody").children().remove();
    db.collection("board")
        .doc("main")
        .collection("boards")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //제목으로 찾기
                if (cate.value == "title") {
                    if (
                        `${doc.data().title}`.indexOf(category_input.value) !=
                        -1
                    ) {
                        if (
                            `${doc.data().recruitment_number}` ==
                            String(recruitment_input.value)
                        ) {
                            var index = 1;
                            $tr = $(`<tr class="tr"></tr>`);
                            $("tbody").append($tr);

                            $num = $(`<td>${index++}</td>`);
                            $author = $(`<td>${doc.data().author}</td>`);

                            $title = $(
                                `<td id="${doc.id}" class="${
                                    doc.data().id
                                }" style="color : blue">${
                                    doc.data().title
                                }</td>`
                            );
                            $($title).on("click", click_join_title);
                            $count = doc.data().count;
                            $recruitment = $(
                                `<td>${$count}/${
                                    doc.data().recruitment_number
                                }</td>`
                            );

                            $date = $(`<td>${doc.data().date}</td>`);
                            $term = $(`<td>${doc.data().term}</td>`);

                            $($tr).append($num);
                            $($tr).append($title);
                            $($tr).append($recruitment);
                            $($tr).append($author);
                            $($tr).append($date);
                            $($tr).append($term);
                        }
                    }
                } else if (cate.value == "teacher") {
                    if (
                        `${doc.data().author}`.indexOf(category_input.value) !=
                        -1
                    ) {
                        if (
                            `${doc.data().recruitment_number}` ==
                            String(recruitment_input.value)
                        ) {
                            var index = 1;
                            $tr = $(`<tr class="tr"></tr>`);
                            $("tbody").append($tr);

                            $num = $(`<td>${index++}</td>`);
                            $author = $(`<td>${doc.data().author}</td>`);

                            $title = $(
                                `<td id="${doc.id}" class="${
                                    doc.data().id
                                }" style="color : blue">${
                                    doc.data().title
                                }</td>`
                            );
                            $($title).on("click", click_join_title);
                            $count = doc.data().count;
                            $recruitment = $(
                                `<td>${$count}/${
                                    doc.data().recruitment_number
                                }</td>`
                            );

                            $date = $(`<td>${doc.data().date}</td>`);
                            $term = $(`<td>${doc.data().term}</td>`);

                            $($tr).append($num);
                            $($tr).append($title);
                            $($tr).append($recruitment);
                            $($tr).append($author);
                            $($tr).append($date);
                            $($tr).append($term);
                        }
                    }
                }
            });
        });
}
