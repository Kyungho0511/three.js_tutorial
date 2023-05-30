import * as THREE from 'three'
import gsap from 'gsap'


console.log(gsap);
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock();

//Time
//let time = Date.now();

// Animations
const tick = () => {

    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Time
    // const currentTime= Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;

    // Update objects
    mesh.rotation.y = elapsedTime * Math.PI * 0.5;
    mesh.rotation.x = elapsedTime * Math.PI * 0.5;
    mesh.position.y = Math.sin(elapsedTime);
    mesh.position.x = Math.cos(elapsedTime);

    // Update objects
    // mesh.rotation.y += 0.001 * deltaTime;
    // mesh.rotation.x += 0.001 * deltaTime;


    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}
tick();