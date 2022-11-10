let p = document.getElementById("pp");
let cancel = document.getElementById("cancel");
let join = document.getElementById("join");

function click_cancel() {
  // open("./index.html");
  close();
}
function click_join() {
  let teacher_id = localStorage.getItem("teacher_id");
  let id = localStorage.getItem("id"); //로그인한 학생의
  let timestamp = localStorage.getItem("timestamp");
  let userName = localStorage.getItem("name");
  let classfication = localStorage.getItem("classfication");

  let flag = false;
  db.collection("teachers")
    .doc(teacher_id)
    .collection("teaching")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.id == id) {
          flag = true; //이미 신청 했었음.
        }
      });
    })
    .then(() => {
      if (flag) {
        alert(`이미 신청 했습니다.`);
      } else
        db.collection("board")
          .doc(teacher_id)
          .collection("register_board")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.id == timestamp) {
                let cnt = doc.data().count;
                let max = doc.data().recruitment_number;
                if (cnt >= max) {
                  alert(`모집인원${max}명이 충족되었습니다. 신청 불가합니다.`);
                } else {
                  cnt++;
                  db.collection("board")
                    .doc(teacher_id)
                    .collection("register_board")
                    .doc(doc.id)
                    .update({
                      count: cnt,
                    });
                }
              }
            });
          })
          .then(() => {
            let img_update = false;
            db.collection("board")
              .doc("main")
              .collection("boards")
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  if (doc.id == timestamp) {
                    let cnt = doc.data().count;
                    let max = doc.data().recruitment_number;
                    if (cnt >= max) {
                    } else {
                      cnt++;
                      if (cnt >= max) img_update = true;
                      db.collection("board")
                        .doc("main")
                        .collection("boards")
                        .doc(doc.id)
                        .update({
                          count: cnt,
                        })
                        .then(() => {
                          db.collection("teachers")
                            .doc(teacher_id)
                            .collection("teaching")
                            .doc(id)
                            .set({
                              name: userName,
                              star_check: false,
                              report_check: false,
                            });
                        })
                        .then(() => {
                          alert("신청되었습니다.");
                          db.collection("students")
                            .doc(id)
                            .collection("join")
                            .doc(teacher_id)
                            .set({
                              timestamp: timestamp,
                            })
                            .then(() => {
                              location.reload();
                              close();
                            });
                        });
                    }
                  }
                });
              })
              .then(() => {
                localStorage.setItem("alert", true);
                opener.document.getElementById("alert_icon").src =
                  "./images/is_notification.png";
              });
          });
    });
}
function init() {
  $(document).ready(function () {
    let classfication = localStorage.getItem("classfication");
    if (classfication == "teacher") {
      join.style.display = "none";
    } else {
    }
    let teacher_id = localStorage.getItem("teacher_id");
    let timestamp = localStorage.getItem("timestamp");
    let name = localStorage.getItem("name");
    console.log(timestamp);
    // p.innerHTML = timestamp;
    db.collection("board")
      .doc(teacher_id)
      .collection("register_board")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id == timestamp) {
            $tr = $(`<tr class="tr"></tr>`);
            $("tbody").append($tr);

            $title = $(
              `<td id="${doc.id}" class="join_title" style="color : blue">${
                doc.data().title
              }</td>`
            );
            $count = doc.data().count;
            $recruitment = $(
              `<td>${$count}/${doc.data().recruitment_number}</td>`
            );

            $author = $(`<td>${doc.data().author}</td>`);
            $date = $(`<td>${doc.data().date}</td>`);
            $term = $(`<td>${doc.data().term}</td>`);
            // $text = $(`<td>${doc.data().text}</td>`);
            $($tr).append($title);
            $($tr).append($recruitment);
            $($tr).append($author);
            $($tr).append($date);
            $($tr).append($term);
            let text = document.getElementById("text");
            text.innerHTML = `${doc.data().text}`;
            // $($tr).append($text);
          }
        });
      });
  });
}
init();
cancel.addEventListener("click", click_cancel);
join.addEventListener("click", click_join);
