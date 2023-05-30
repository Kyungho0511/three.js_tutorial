import * as THREE from 'three'
import gsap from 'gsap'

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

// // Animations (Time version)
// let time = Date.now();
// const tick = () => {
//     const currentTime= Date.now();
//     const deltaTime = currentTime - time;
//     time = currentTime;
//     mesh.rotation.y += 0.001 * deltaTime;
//     mesh.rotation.x += 0.001 * deltaTime;
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick);
// }
// tick();

// // Animations (Clock version)
// const clock = new THREE.Clock();
// const tick = () => {
//     const elapsedTime = clock.getElapsedTime();
//     mesh.rotation.y = elapsedTime * Math.PI * 0.5;
//     mesh.rotation.x = elapsedTime * Math.PI * 0.5;
//     mesh.position.y = Math.sin(elapsedTime);
//     mesh.position.x = Math.cos(elapsedTime);
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick);
// }
// tick();

// Animations (gsap library version)
gsap.to(mesh.position, { duration: 2, delay: 1, x: 2 });
const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();
