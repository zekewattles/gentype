// const accordions = document.getElementsByClassName("accordion");

// function open(a, p) {
//   a.classList.add("active");
//   p.style.maxHeight = `${p.scrollHeight}px`;
// }

// function close(a, p) {
//   a.classList.remove("active");
//   p.style.maxHeight = null;
// }

// function closeAll() {
//   accordions.forEach((a) => {
//     const p = a.nextElementSibling;
//     close(a, p);
//   });
// }

// accordions.forEach((a) => {
//   const p = a.nextElementSibling;
//   a.addEventListener("click", function () {
//     // if the clicked accordion is open, close it. 
//     // if the clicked accordion is closed, close all
//     // and open the clicked one.
//     if ([...a.classList].includes("active")) {
//       close(a, p);
//     } else {
//       closeAll();
//       open(a, p);
//     }
//   });
// });

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}