

var handleFile = (function (galleryElement) {
    var conf = {
        gallery : document.querySelector(galleryElement),
    };

    function select(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var filesHolder;
        (evt.type == 'drop') ? (filesHolder = evt.dataTransfer.files) : (filesHolder = evt.target.files);

        for (var i = 0, file;
            (file = filesHolder[i]); i++) {
            var reader = new FileReader();

            // Only process image files.
            if (file.type.match("image.*")) {

                reader.onload = function() {
                    var img = new Image();
                    img.src = this.result;
                    //thumbnails
                    conf.gallery.appendChild(thumbnails.makeCanvas(img, 150, 150));
                }

                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
            }
        }
    }
        return {
            select: select
        };

})('#gallery');



    function confFunc(configuration) {


        var configuration = configuration || {};

        var conf = {
            fileInput : document.querySelector(filesElement),
            gallery : document.querySelector(galleryElement)
        };

        Object.keys(conf).forEach(function(key) {
            if (configuration[key]) { conf[key] = configuration[key] }
        });
        return conf;
    }

var thumbnails = (function() {
    function makeCanvas(img, width, height) {
            var canvas = document.createElement('canvas'),
                canvasUrl = document.createElement('a'),
                ctx = canvas.getContext('2d');

            canvas.width = width;
            canvas.height = height;  
            canvasUrl.setAttribute("href", img.src);
            canvasUrl.setAttribute("target", "_blank");
            canvasUrl.appendChild(canvas);            

            img.onload = function() {
                ctx.drawImage(img, 0, 0, width, height);
            };
            return canvasUrl;
    }
    return {
        makeCanvas: makeCanvas
    }
})();

var fileUp = (function (filesElement) {
    var conf = {
        fileInput : document.querySelector(filesElement),

    };
    function input() {
        conf.fileInput.addEventListener('change', handleFile.select, false);
    }
    return {
            input:input()    
        };
})('#files');


var dragAndDrop = (function(dragElement, galleryElement) {
    var conf = {
        dropZone : document.querySelector(dragElement),
    };
    
    function drag() {
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }
    // Setup the dnd listeners.

        conf.dropZone.addEventListener('dragover', handleDragOver, false);
        conf.dropZone.addEventListener('drop', handleFile.select, false);
    };

    
    return {
        drag:drag()
    };
})('#drag');
