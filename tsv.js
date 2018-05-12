Array.prototype.slice.call(document.querySelectorAll(".markerItem")).map(v=>
v.dataset.ms+","+v.getElementsByClassName("text")[0].innerText
).join("\n").replace(/,/gim,"\t")
