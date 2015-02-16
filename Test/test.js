//node
//var script = require("../lib/afterTest.js");
//var expect = require("chai").expect;

//browser
var expect = chai.expect;

describe("thumbnails", function() {
	expect(thumbnails).to.be.an('object');
	describe("#makeCanvas", function() {
		var	img = new Image(),
			width = 150,
			height = 150;
			img.src = "http://thigrand.pl/";
		var	insideCanvas = thumbnails.makeCanvas(img, width, height),// muszę wymyślić przykładowe wartości, i je tu przekazać, żeby test się udał?
			aHref = insideCanvas.getAttribute("href"),
			aTarget = insideCanvas.getAttribute('target'),
			canvas = insideCanvas.childNodes[0],
			canvasWidth = insideCanvas.childNodes[0].getAttribute('width'),
			canvasHeight = insideCanvas.childNodes[0].getAttribute('height');

		it("should give canvas with attributes: width, height, href, target", function() {
			expect(aHref).to.equal('http://thigrand.pl/');
			expect(aTarget).to.equal('_blank');
			expect(canvasWidth).to.equal('150');
			expect(canvasHeight).to.equal('150');
		});
		it("should return canvas", function() {
			expect(canvas.nodeName).to.equal("CANVAS");
		});
		it("should return an anchor", function() {
			expect(insideCanvas.nodeName).to.equal("A");
		});
	});
});

/*TO DO:

*/

describe("handleFile", function() {
	describe("#select", function() {
		it("Should recall pictureAppend func(adding canvas with picture)", function() {

		var evt = new CustomEvent('drop');
		var fileSth = new File([], {});
		var spy = sinon.spy();
		var tempAppend = handleFile.pictureAppend;
		evt.dataTransfer = { 
			files : [fileSth] };
		function toSpy(reader) {
			console.log(reader.result);
		};

		handleFile.pictureAppend = spy(toSpy);
		handleFile.select(evt);
		expect(spy.called).to.be.true;
		handleFile.pictureAppend = tempAppend;

		});
	});

	describe("#setConfig", function() {
		var exampleId = "",
			configure = handleFile.setConfig({galleryElement : exampleId});

		it("should return default value", function() {
			expect(configure.galleryElement).to.equal('gallery');
		});
		it("should return passed value", function() {
			var exampleId = "tararara";
			expect(handleFile.setConfig({
        		galleryElement : exampleId,        
    		}).galleryElement).to.equal('tararara');
		});
	});
});

/*TO DO:

*/

describe("fileUp", function() {
	describe("#input", function() {
		it("should handle eventListener", function() {

			var div = document.createElement("div"),
				ext = new Event("change"),
				temp = handleFile.select;

			fileUp.setFileElement(div);

			function temporaryFunc() {
			 	console.log("halo");
			};

			var spy = sinon.spy(temporaryFunc);
			
			handleFile.select = spy;

			fileUp.input();

			handleFile.select = temp;
			div.dispatchEvent(ext);

			expect(spy.called).to.be.true;


		});
	});
	describe("#setConfig", function() {
		var exampleId = "",
			configure = fileUp.setConfig({fileElement : exampleId});

		it("should return default value", function() {
			expect(configure.fileElement).to.equal('files');
		});
		it("should return passed value", function() {
			var exampleId = "tararara";
			expect(fileUp.setConfig({
        		fileElement : exampleId,        
    		}).fileElement).to.equal('tararara');
		});
	});
});


/*TO DO:

*/

describe("dragAndDrop", function() {
	describe("#drag", function() {

		it("should bind eventListeners", function() {
			var div = document.createElement("div"),
				ext = new Event("drop");
			console.log(dragAndDrop, dragAndDrop.setDragElement);
			dragAndDrop.setDragElement(div);
			var temp = handleFile.select;
			function temporaryFunc() {
			 	console.log("halo");
			};

			var spy = sinon.spy(temporaryFunc);
			
			handleFile.select = spy;

			dragAndDrop.bindListeners();
			handleFile.select = temp;
			div.dispatchEvent(ext);

			expect(spy.called).to.be.true;

		});
	});
	describe("#setConfig", function() {
		var exampleId = "",
			configure = dragAndDrop.setConfig({dragElement : exampleId});


		it("should return default value", function() {
			expect(configure.dragElement).to.equal('drag');
		});
		it("should return passed value", function() {
			var exampleId = "tararara";
			expect(dragAndDrop.setConfig({
        		dragElement : exampleId,        
    		}).dragElement).to.equal('tararara');
		});
	});
});
