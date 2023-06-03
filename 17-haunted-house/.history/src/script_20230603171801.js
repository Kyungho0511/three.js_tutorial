import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog(0x262837, 1, 15);
scene.fog = fog;

// AxesHelper
const axesHelper = new THREE.AxesHelper(5);
axesHelper.visible = false;
scene.add(axesHelper);


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

const REPEAT = 10;
grassColorTexture.repeat.set(REPEAT, REPEAT);
grassAmbientOcclusionTexture.repeat.set(REPEAT, REPEAT);
grassNormalTexture.repeat.set(REPEAT, REPEAT);
grassRoughnessTexture.repeat.set(REPEAT, REPEAT);
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Wall
const WALL_HEIGHT = 2.5;
const WALL_WIDTH = 4;
const WALL_DEPTH = 3;
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(WALL_WIDTH, WALL_HEIGHT, WALL_DEPTH),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        aoMapIntensity: 2,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
);
walls.geometry.setAttribute(
    'uv2', 
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = WALL_HEIGHT / 2;
gui.add(walls.material, 'aoMapIntensity', 0, 3, 0.01).name('wallsAoMapIntensity');
house.add(walls);

// Roof
const ROOF_HEIGHT = 1;
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(WALL_DEPTH, ROOF_HEIGHT, 4),
    new THREE.MeshStandardMaterial({ color: 0xb35f45 })
);
roof.position.y = WALL_HEIGHT + ROOF_HEIGHT / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const DOOR_HEIGHT = 2;
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, DOOR_HEIGHT, 50, 50),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        aoMapIntensity: 2,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.geometry.setAttribute(
    'uv2', 
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.z = WALL_DEPTH / 2 + 0.01;
door.position.y = DOOR_HEIGHT / 2 - 0.1;
gui.add(door.material, 'aoMapIntensity', 0, 3, 0.01).name('doorAoMapIntensity');
gui.add(door.material, 'wireframe');
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x89c854 });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.5, 0.2, 2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.3, 0.3, 0.3);
bush2.position.set(3, 0.2, 1.5);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.2, 0.2, 0.2);
bush3.position.set(2.1, 0.2, 2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.6, 0.6, 0.6);
bush4.position.set(-1.8, 0.2, 2.3);
house.add(bush1, bush2, bush3, bush4);

// Floor
const FLOOR_WIDTH = 20;
const FLOOR_DEPTH = 20;
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(FLOOR_WIDTH, FLOOR_DEPTH),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        aoMapIntensity: 2,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
);
floor.geometry.setAttribute(
    'uv2', 
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Graves
const GRAVE_COUNT = 80;
const GRAVE_HEIGHT = 0.8;
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, GRAVE_HEIGHT, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: 0xb2b61 });

while (graves.children.length < GRAVE_COUNT) {
    const angle = Math.random() * Math.PI * 2;
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.x = Math.random() * FLOOR_WIDTH - FLOOR_WIDTH / 2;
    grave.position.z = Math.random() * FLOOR_DEPTH - FLOOR_DEPTH / 2;
    if (grave.position.z < WALL_DEPTH / 2 && 
        grave.position.z > -WALL_DEPTH / 2 &&
        grave.position.x < WALL_WIDTH / 2 &&
        grave.position.x > -WALL_WIDTH / 2) continue;
    grave.position.y = GRAVE_HEIGHT / 2 - 0.1;
    grave.rotation.y = (Math.random() - 0.5) * 0.8;
    grave.rotation.z = (Math.random() - 0.5) * 0.2;
    graves.add(grave);
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight(0xb9d5ff, 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight(0xff7d46, 1.3, 8, 1);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

// Ghosts
const ghost1 = new THREE.PointLight(0xff00ff, 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight(0x00ffff, 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight(0xffff00, 2, 3);
scene.add(ghost3);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x262837);


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 5;
    ghost1.position.z = Math.sin(ghost1Angle) * 5;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.3;
    ghost2.position.x = Math.cos(ghost2Angle) * 7;
    ghost2.position.z = Math.sin(ghost2Angle) * 7;
    ghost2.position.y = Math.sin(elapsedTime * 2);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()