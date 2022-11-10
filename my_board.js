let teacher_name = document.getElementById("teacher_name");
let modifyBtn = document.getElementById("modify");
let cancelBtn = document.getElementById("cancel");
function modifyFormat() {
  let updateData = {};
  let utitle = document.getElementById("title").value;
  let urecruitment_number = document.getElementById("recruitment_number").value;
  let uauthor = document.getElementById("author").value;
  let uterm = document.getElementById("term").value;
  let utext = document.getElementById("text").value;
  if (utitle != "") updateData.title = utitle;
  if (urecruitment_number != "")
    updateData.recruitment_number = urecruitment_number;
  if (uauthor != "") updateData.author = uauthor;
  if (uterm != "") updateData.term = uterm;
  if (utext != "") updateData.text = utext;
  return updateData;
}
function click_modifyBTN(aa) {
  let teacher_id = localStorage.getItem("id");
  let timestamp = aa.split("+")[1];

  let updateData = modifyFormat();

  db.collection("board")
    .doc(teacher_id)
    .collection("register_board")
    .doc(timestamp)
    .update(updateData)
    .then(() => {
      db.collection("board")
        .doc("main")
        .collection("boards")
        .doc(timestamp)
        .update(updateData)
        .then(() => {
          alert(`수정이 완료 되었습니다.`);

          location.reload();
          close();
        });
    });
}
function click_cancel() {
  // close();
  document.getElementById("my_board_table").style.display = "inline-block";
  document.getElementById("div_modify").style.display = "none";
}
function click_modify() {
  let aa = this.id;
  console.log(this.id);
  // console.log(this);
  document.getElementById("my_board_table").style.display = "none";
  document.getElementById("div_modify").style.display = "inline-block";
  modifyBtn.addEventListener("click", function (a) {
    click_modifyBTN(aa);
  });
}
function click_remove() {
  let teacher_id = localStorage.getItem("id");
  let timestamp = this.id.split("+")[1];

  db.collection("board")
    .doc(teacher_id)
    .collection("register_board")
    .doc(timestamp)
    .delete()
    .then(() => {
      db.collection("board")
        .doc("main")
        .collection("boards")
        .doc(timestamp)
        .delete()
        .then(() => {
          alert("삭제되었습니다.");
          location.reload();
          //   opener.document.location.reload();
        });
    });
}

function init() {
  let name = localStorage.getItem("name");
  let my_id = localStorage.getItem("id");
  let idx = 1;
  $(document).ready(function () {
    db.collection("board")
      .doc(my_id)
      .collection("register_board")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          $tr = $(`<tr class="tr"></tr>`);
          $("tbody").append($tr);

          $num = $(`<td>${idx++}</td>`);
          $title = $(
            `<td class="join_title" style="color : blue">${
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
          $modify = $(
            `<td id="modify+${doc.id}"><button>수정하기</button></td>`
          );
          $($modify).on("click", click_modify);
          $remove = $(
            `<td id="remove+${doc.id}"><button >삭제하기</button></td>`
          );
          $($remove).on("click", click_remove);

          $($tr).append($num);
          $($tr).append($title);
          $($tr).append($recruitment);
          $($tr).append($author);
          $($tr).append($date);
          $($tr).append($term);
          $($tr).append($modify);
          $($tr).append($remove);

          // console.log(doc.id, " => ", doc.data());
        });
      });
  });
  teacher_name.innerHTML = localStorage.getItem("name");
}
init();
cancel.addEventListener("click", click_cancel);
