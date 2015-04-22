window.S = window.S || {};

var Shredder = function ( options ) {
  this.options = options || {};
  this.files = [];
  this.name = 
  this.create();

  console.info('Shredder initialized.');
}

Shredder.prototype.create = function () {
  var _this = this;

  var ss = document.createElement('div');
  ss.id = 'shredder';
  ss.addEventListener('dragover', ondragover, false);
  ss.addEventListener('dragleave', ondragleave, false);
  ss.addEventListener('drop', ondrop, false);
  document.body.appendChild(ss);

  function ondragover(e) {
    e = e || event;
    e.preventDefault();
    this.className = 'dragging';
  }

  function ondragleave(e) {
    e = e || event;
    e.preventDefault();
    this.className = '';
  }

  function ondrop(e) {
    e = e || event;
    e.preventDefault();
    this.className = '';
    files = e.dataTransfer.files;
    _this.shred(files);
  }

}

Shredder.prototype.shred = function ( files ) {
  var _this = this;
  for (i = 0; i < files.length; i++) {
    (function(file){
      console.log(file);
      _this.files.push(file);
      _this.postShred(file, A_NUMBER_FOR_THE_STUFFZ)
    })(files[i]);
  }
}

Shredder.prototype.postShred = function ( file,  )