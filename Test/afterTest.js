//module.exports = {};
//var modules = module.exports;
"use strict";
var thumbnails = (function() {

    function makeCanvas(img, width, height) {
            var canvas = document.createElement("canvas"),
                canvasUrl = document.createElement("a"),
                ctx = canvas.getContext("2d");

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
        makeCanvas: makeCanvas,
    };
})();

var handleFile = (function () {

    var conf = {};
    var setConfig = function(partialConfig) {
        partialConfig.galleryElement = partialConfig.galleryElement || "gallery";
        setGalleryElement(document.getElementById(partialConfig.galleryElement));
        return partialConfig;
    };
    function setGalleryElement(galleryElement) {
        conf.gallery = galleryElement;
    }


    function pictureAppend(reader) { 
            return function () { 
                var img = new Image();

                img.src = reader.result; 
                //thumbnails 
                conf.gallery.appendChild(thumbnails.makeCanvas(img, 150, 150)); 
            };
    }

    function select(evt) {
        console.log(evt);
        evt.stopPropagation();
        evt.preventDefault();
        var filesHolder = (evt.type === "drop") ? (evt.dataTransfer.files) : (evt.target.files);

        
        for (var i = 0, file; (file = filesHolder[i]); i++) {
            var reader = new FileReader();
            // Only process image files.
            if (file.type.match("image.*")) {
                reader.onload = pictureAppend(reader);
                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
            }
        }
    }
    return {
        select: select,
        setConfig:setConfig,
        pictureAppend:pictureAppend,
        setGalleryElement:setGalleryElement,
    };
})();

var fileUp = (function () {

    var conf = {};
    var setConfig = function(partialConfig) {
        partialConfig.fileElement = partialConfig.fileElement || "files";
        setFileElement(document.getElementById(partialConfig.fileElement));
  
        return partialConfig;
    };
    function setFileElement(fileElement) {
        conf.file = fileElement;
    }


    function input() {
        if(conf.file !== null) {
            conf.file.addEventListener("change", handleFile.select, false);
        }
    }
    return {
            input:input,
            setConfig:setConfig,
            setFileElement:setFileElement,
        };
})();

var dragAndDrop = (function() {

    var conf = {};
    var setConfig = function(partialConfig) {
        partialConfig.dragElement = partialConfig.dragElement || "drag";
        setDragElement(document.getElementById(partialConfig.dragElement));

        return partialConfig;
    };
    function setDragElement(dragElement) {
        conf.drag = dragElement;
    }

    function bindListeners() {
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
         }
    // Setup the dnd listeners.
        if(conf.drag !== null) {
            conf.drag.addEventListener("dragover", handleDragOver, false);
            conf.drag.addEventListener("drop", handleFile.select, false);
        }
    }
    return {
        bindListeners:bindListeners,
        setConfig:setConfig,
        setDragElement:setDragElement,
    };
})();




var main = (function() {
    //configure 
    fileUp.setConfig({
        fileElement : "files"
    });
    dragAndDrop.setConfig({
        dragElement: "drag"
    });
    handleFile.setConfig({
        galleryElement : "gallery",        
    });

    dragAndDrop.bindListeners();
    fileUp.input();

})();