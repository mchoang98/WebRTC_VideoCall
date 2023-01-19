
var constraints = {
    'video': true,
    'audio': true,
    
}

var camera = document.getElementById('camera');

function getUserMedia(constraints) {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            resolve(stream);
        })
        .catch(error => {
            reject(error);
        });
    })
   
}
function start() {
    console.log('start');
    getUserMedia(constraints)
    .then(stream => {
        camera.srcObject = stream;
        // on start change button css
        document.getElementById('start').style.backgroundColor = 'green';
        
        
        
    })
    .catch(error => {
        console.log(error);
    });

}

function stop() {
    console.log('stop');
    camera.srcObject.getTracks().forEach(track => {
        track.stop();
        // on stop change button css
        document.getElementById('start').style.backgroundColor = 'white';
       
    });


}




function takePhoto() {
    console.log('take photo');
//    canvas from camera to save image
    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    var context = canvas.getContext('2d');


    context.drawImage(camera, 0, 0, 640, 480);
    // save image in assets folder
    var data = canvas.toDataURL('image/png');
    document.getElementById('photo').style.display = 'block';
    document.getElementById('photo').setAttribute('src', data);

    setTimeout(() => {
        document.getElementById('photo').style.display = 'none';
        Swal.fire({
            title: 'Do you want to save image?',
            // transparent background
            showDenyButton: true,
            confirmButtonText: `Save`,
    
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var link = document.createElement('a');
                link.download = 'image.png';
                link.href = data;
                link.click();
    
    
            } 
        })   
    }, 3000);

    // do you want to save image in assets folder
  
    
}

