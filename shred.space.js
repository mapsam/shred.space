window.S = window.S || {};

var Shredder = function ( options ) {
  this.options = options || {};
  _S = this;
  
  /** FILE ARRAY
    * ---
    * This updates Array.prototype.push() on the file
    * list so we can essentially "listen" for changes
    * to the files array. When changes happen, update
    * the Shredder garbage.
    *
    */
  this.files = [];
  this.files.push = function () {
    for ( var i = 0, l = arguments.length; i < l; i++ ) {
      this[this.length] = arguments[i];
      _S.garbage(arguments[i]);
    }
    return this.length;
  }

  this.create();
  console.info('Shredder initialized.');
}

Shredder.prototype.create = function () {
  var _this = this;

  // create the shredder
  var ss = document.createElement('div');
  ss.id = 'shredder';
  ss.addEventListener('dragover', ondragover, false);
  ss.addEventListener('dragleave', ondragleave, false);
  ss.addEventListener('drop', ondrop, false);

  // add shredder image
  var img = document.createElement('img');
  img.className = 'inject-me';
  img.src = 'images/shredder_2.svg';
  ss.appendChild(img);

  // create the garabge list
  var garbage = document.createElement('ul');
  garbage.id = 'garbage';
  ss.appendChild(garbage);

  this.elements = {
    shredder: ss,
    garbage: garbage
  };

  document.body.appendChild(ss);

  var svgs = document.querySelectorAll('img.inject-me');
  SVGInjector(svgs);

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
      _this.files.push(file);
    })(files[i]);
  }
}

Shredder.prototype.garbage = function ( file ) {
  // console.log(file);
  // var item = document.createElement('li');
  // item.className = 'shreddie shredding';
  // item.innerHTML = '<strong>' + file.name + '</strong>';
  // this.elements.garbage.appendChild(item);
  // var _this = this;
  // setTimeout(function(){
  //   item.className = 'shreddie shredded';
  //   item.innerHTML += ' ' + _this.phrase();
  // }, 3000);
}

Shredder.prototype.phrase = function () {
  return this.options.phrases[Math.floor(Math.random() * this.options.phrases.length)];
}