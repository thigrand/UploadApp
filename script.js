function handleFileSelect(evt) {
    console.log(evt);
    evt.stopPropagation();
    evt.preventDefault();
  
      
    
    var filesHolder; 
    // Event recognition 
    if(evt.type == 'drop') {
      filesHolder = evt.dataTransfer.files; // FileList object 
    } else if(evt.type == 'change') { 
      filesHolder = evt.target.files; // FileList object 
    } else { return false; 
    }

    // Loop through the FileList and render image files as thumbnails.

    for (var i = 0, f; (f = filesHolder[i]); i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
          continue;
        }

       var reader = new FileReader();

        // Closure to capture the file information.
      reader.onload = (function(theFile) {
      
          return function(e) {
              // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<a href="',e.target.result ,'" onclick="this.target=\'_blank\'"><img class="thumb" src="', e.target.result,
                              '" title="', escape(theFile.name), '"/></a>'].join('');
              document.getElementById('thumbnails').insertBefore(span, null);
        };
        })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('dragg');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

