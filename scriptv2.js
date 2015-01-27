var handleFile = (function () {

    var conf = {};
    var getConfig = function(partialConfig) {
        partialConfig.galleryElement = partialConfig.galleryElement || "#gallery";
  
        conf.gallery = document.querySelector(partialConfig.galleryElement);
        return partialConfig;
    };

    function select(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var filesHolder = (evt.type == 'drop') ? (filesHolder = evt.dataTransfer.files) : (filesHolder = evt.target.files);

        for (var i = 0, file;
            (file = filesHolder[i]); i++) {
            var reader = new FileReader();

            // Only process image files.
            if (file.type.match("image.*")) {
                

                
                function pictureAppend(reader) { 
                    return function () { 

                        var img = new Image();

                            img.src = reader.result; 
                            //thumbnails 
                            conf.gallery.appendChild(thumbnails.makeCanvas(img, 150, 150)); 
                        };
                        
                }

                reader.onload = pictureAppend(reader);

                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
            }
        }
    }
        return {
            select: select,
            getConfig:getConfig
        };

})();


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

var fileUp = (function () {

    var conf = {};
    var getConfig = function(partialConfig) {
        partialConfig.filesElement = partialConfig.fileElement || "#files";
  
        conf.file = document.querySelector(partialConfig.fileElement);
        return partialConfig;
    };

    function input() {
        conf.file.addEventListener('change', handleFile.select, false);
    }
    return {
            input:input,
            getConfig:getConfig
        };
})();




var dragAndDrop = (function() {

    var conf = {};
    var getConfig = function(partialConfig) {
        partialConfig.dragElement = partialConfig.dragElement || "#drag";
  
        conf.drag = document.querySelector(partialConfig.dragElement);
        return partialConfig;
    };




    
    function drag() {
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }
    // Setup the dnd listeners.

        conf.drag.addEventListener('dragover', handleDragOver, false);
        conf.drag.addEventListener('drop', handleFile.select, false);
    };

    
    return {
        drag:drag,
        getConfig:getConfig
    };
})();


var main = (function() {
    //configure 
    fileUp.getConfig({
        fileElement : '#files'
    });
    dragAndDrop.getConfig({
        dragElement: "#drag"
    });
    handleFile.getConfig({
        galleryElement : '#gallery',        
    });

    dragAndDrop.drag()
    fileUp.input();

})();
