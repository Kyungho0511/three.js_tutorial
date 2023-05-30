import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.1;
mesh.position.y = -0.6;
mesh.position.z = -0.3;
scene.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3
scene.add(camera)


console.log(mesh.position.normalize());
console.log(mesh.position.length());
console.log(mesh.position.distanceTo(camera.position));
mesh.position.set(0.1, 1, -0.3);


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

