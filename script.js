window.onload = function() {
  const items = document.querySelectorAll('.item');
  const folders = document.querySelectorAll('.folder');
  var draggableElement;

  for (let i = 0; i < items.length; i++) {
    initEvent(items[i]);
  }

  for (let i = 0; i < folders.length; i++) {
    folders[i].addEventListener('click', openFolder);
  }
}

function initEvent(element) {
  element.addEventListener('dragstart', dragStart);

  element.addEventListener('dragenter', dragEnter);

  element.addEventListener('dragleave', dragLeave);

  element.addEventListener('dragover', dragOver);

  element.addEventListener('drop', drop);

  element.addEventListener('dragend', dragEnd);
}

function dragStart(e) {
  draggableElement = this;
  event.dataTransfer.setData('Text', this.id);
}

function dragLeave() {
  this.style.borderStyle = 'none';

}

function dragEnter(e) {
  e.preventDefault();
  this.style.borderStyle = 'dashed';
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function drop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  var div = document.createElement("div");
  div.setAttribute("draggable", true);
  div.setAttribute("class", draggableElement.className);
  div.innerHTML = draggableElement.innerHTML;

  if (this.className.indexOf( 'folder' ) != -1 ) {
    document.querySelector( '.list[data-key="' + this.getAttribute('data-key') + '"]' ).append(div);
    initEvent(div);
  } else {
    this.after(div);
    initEvent(div);
  }

  draggableElement.remove();

  return false;
}

function dragEnd(e) {
  e.preventDefault();
}

function openFolder() {
  this.closest( '.list' ).style.display = "none";

  document.querySelector( '.list[data-key="' + this.getAttribute('data-key') + '"]' ).style.display = "block";
}
