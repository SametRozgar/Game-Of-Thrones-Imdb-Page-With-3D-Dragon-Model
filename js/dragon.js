let scene, camera, renderer, controls, model;
const container = document.getElementById('dragonContainer');


let hasIntroPlayed = false;
let introProgress = 0;
const introDuration = 4;
const rotationSpeed = 0.002; 

function init() {
    scene = new THREE.Scene();
    scene.background = null;
    
    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 3, 5);

    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const loader = new THREE.GLTFLoader();
    loader.load('models/dragon.glb', (gltf) => {
        model = gltf.scene;
        
        const bbox = new THREE.Box3().setFromObject(model);
        const size = bbox.getSize(new THREE.Vector3());
        const scaleFactor = 2.5 / size.y;
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        model.position.set(0, -1, 0);
        model.rotation.x = -Math.PI/2;
        
        scene.add(model);
        controls.target.copy(model.position);
        controls.update();
    }, undefined, (error) => {
        console.error('Model yükleme hatası:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    if(model) {
        if(!hasIntroPlayed) {
            introProgress += 1/60;
            const progress = Math.min(introProgress / introDuration, 1);
            const easedProgress = Math.pow(progress, 3);
            
            model.rotation.x = -Math.PI/2 + (Math.PI/2 * easedProgress);
            
            if(progress >= 1) {
                hasIntroPlayed = true;
                model.rotation.x = 0;
            }
        }
        else {
            model.rotation.y += rotationSpeed; 
        }
    }
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

init();
animate();