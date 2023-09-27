const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();

image1.addEventListener('load', function () {
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height)
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data
    for (let i = 0; i < scannedData.length; i += 4){
        const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2]
        const averageColorValue = Math.floor(Math.random() *255)
        scannedData[i] = getRandom(scannedData[i])
        scannedData[i+1] = getRandom(scannedData[i + 1])
        scannedData[i+2] = getRandom(scannedData[i + 2])
    }
    scannedImage.data = scannedData
    ctx.putImageData(scannedImage,0,0)

})

function getRandom(val) {
    return Math.floor(Math.random() * val)
}

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            // var img = document.querySelector('img');
            image1.onload = () => {
                URL.revokeObjectURL(image1.src);  // no longer needed, free memory
            }
  
            image1.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
});


function generateNoise(opacity) {
    var x, y, number, opacity = opacity || .2;
    for (x = 0; x < canvas.height; x++) {
        for (y = 0; y < canvas.height; y++){
            number = Math.floor(Math.random() * 60); //This seems to be the 
            ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
            ctx.fillRect(x,y,1,1)
        }
    }
}