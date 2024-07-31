const player = videojs('vr-video', {
    controls: true,
    autoplay: false,
    preload: 'auto',
    plugins: {
        vr: {
            projection: '360',
            debug: true,
            forceCardboard: true,
            sphereDetail: 100
        }
    }
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        player.src({ type: file.type, src: url });
        player.play();
    }
});

document.getElementById('loadUrlButton').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;
    if (url) {
        player.src({ type: 'video/mp4', src: url });
        player.play();
    }
});

player.vr({ projection: '360' });

// Agregar event listener para zoom con la rueda del mouse
player.el().addEventListener('wheel', function(event) {
    const camera = player.vr().camera;
    if (event.deltaY < 0) {
        // Zoom In
        camera.fov = Math.max(20, camera.fov - 5);
    } else {
        // Zoom Out
        camera.fov = Math.min(100, camera.fov + 5);
    }
    camera.updateProjectionMatrix();
    event.preventDefault();
});

// Agregar event listener para mover la cámara con las flechas del teclado
document.addEventListener('keydown', function(event) {
    const camera = player.vr().camera;
    switch (event.key) {
        case 'ArrowUp':
            camera.rotation.x -= 0.1;
            break;
        case 'ArrowDown':
            camera.rotation.x += 0.1;
            break;
        case 'ArrowLeft':
            camera.rotation.y -= 0.1;
            break;
        case 'ArrowRight':
            camera.rotation.y += 0.1;
            break;
    }
    camera.updateProjectionMatrix();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        player.src({ type: file.type, src: url });
        player.play();
        document.getElementById('videoTitle').textContent = file.name;
    }
});