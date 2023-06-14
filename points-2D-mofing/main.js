/**
 * Fisher-Yates のシャッフルアルゴリズムを用いた配列のシャッフル
 */
const shuffleArray = (sourceArray) => {
	const array = sourceArray.concat();
	const arrayLength = array.length;
	for (let i = arrayLength - 1.0; i >= 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1.0));
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}

	return array;
};

const maxLength = 126;

const getSvgCircleAttribute = (viewBox, target) => {
	const targetSvgCircle = shuffleArray([...target]);
	const particleScenePosition = [];
	const particleSceneRadius = [];

	for (let i = 0; i < targetSvgCircle.length; i++) {
		let x =(((Number(targetSvgCircle[i].attributes.cx.value) / viewBox.width) * 2.0 - 1.0) * viewBox.width) / 2;
		let y =(-((Number(targetSvgCircle[i].attributes.cy.value) / viewBox.height) * 2.0 - 1.0) * viewBox.height) / 2;
		let z = 0;
		let r = Number(targetSvgCircle[i].attributes.r.value) * 4.0;
		
		//ligブログのデモ用にサイズを小さくする。
		x *= 0.5;
		y *= 0.5;
		r *= 0.5;

		particleScenePosition.push(x, y, z);
		particleSceneRadius.push(r);
	}

	for (let i = 0; i < maxLength - targetSvgCircle.length; i++) {
		const x = ((Math.random() * 2.0 - 1.0) * viewBox.width) / 5;
		const y = (-(Math.random() * 2.0 - 1.0) * viewBox.height) / 5;
		const z = 0;
		const r = 0;
		particleScenePosition.push(x, y, z);
		particleSceneRadius.push(r);
	}

	return {
		position: particleScenePosition,
		radius: particleSceneRadius
	};
};

class Stage {
	constructor() {
		this.renderParam = {
			clearColor: 0x000000,
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.cameraParam = {
			fov: 45,
			near: 0.1,
			far: 100,
			lookAt: new THREE.Vector3(0, 0, 0),
			x: 0,
			y: 0,
			z: 1.0
		};

		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.isInitialized = false;
	}

	init() {
		this._setScene();
		this._setRender();
		this._setCamera();
	}

	_setScene() {
		this.scene = new THREE.Scene();
	}

	_setRender() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(2.0);
		this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
		this.renderer.setSize(this.renderParam.width, this.renderParam.height);
		const wrapper = document.querySelector("#webgl");
		wrapper.appendChild(this.renderer.domElement);
	}

	_setCamera() {
		if (!this.isInitialized) {
			this.camera = new THREE.PerspectiveCamera(
				0,
				0,
				this.cameraParam.near,
				this.cameraParam.far
			);

			this.camera.position.set(
				this.cameraParam.x,
				this.cameraParam.y,
				this.cameraParam.z
			);
			this.camera.lookAt(this.cameraParam.lookAt);

			this.isInitialized = true;
		}

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		this.camera.aspect = windowWidth / windowHeight;

		this.camera.fov =
			THREE.MathUtils.radToDeg(
				Math.atan(windowWidth / this.camera.aspect / (2 * this.camera.position.z))
			) * 2.0;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(windowWidth, windowHeight);
	}

	_render() {
		this.renderer.render(this.scene, this.camera);
	}

	onResize() {
		this._setCamera();
	}

	onRaf() {
		this._render();
	}
}

class Particle {
	constructor(stage) {
		this.duration = 1.4;
		this.ease = "power2.inOut";
		this.color = "#ffffff";
		this.stage = stage;
	}

	init() {
		this._setSvgData();
		this._setMesh();
	}

	_setSvgData() {
		this.circle = document.querySelector(".circle");
		this.circleViewBox = this.circle.viewBox.baseVal;
		this.circleDom = this.circle.querySelectorAll("circle");
		this.circleObject = getSvgCircleAttribute(this.circleViewBox, this.circleDom);

		this.star = document.querySelector(".star");
		this.starViewBox = this.star.viewBox.baseVal;
		this.starDom = this.star.querySelectorAll("circle");
		this.starObject = getSvgCircleAttribute(this.starViewBox, this.starDom);

		this.square = document.querySelector(".square");
		this.squareViewBox = this.square.viewBox.baseVal;
		this.squareDom = this.square.querySelectorAll("circle");
		this.squareObject = getSvgCircleAttribute(this.squareViewBox, this.squareDom);

		this.hexagon = document.querySelector(".hexagon");
		this.hexagonViewBox = this.hexagon.viewBox.baseVal;
		this.hexagonDom = this.hexagon.querySelectorAll("circle");
		this.hexagonObject = getSvgCircleAttribute(
			this.hexagonViewBox,
			this.hexagonDom
		);
	}

	_setMesh() {
		const geometry = new THREE.BufferGeometry();
		const circlePosition = new THREE.BufferAttribute(
			new Float32Array(this.circleObject.position),
			3
		);
		const circleRadius = new THREE.BufferAttribute(
			new Float32Array(this.circleObject.radius),
			1
		);
		const starPosition = new THREE.BufferAttribute(
			new Float32Array(this.starObject.position),
			3
		);
		const starRadius = new THREE.BufferAttribute(
			new Float32Array(this.starObject.radius),
			1
		);
		const squarePosition = new THREE.BufferAttribute(
			new Float32Array(this.squareObject.position),
			3
		);
		const squareRadius = new THREE.BufferAttribute(
			new Float32Array(this.squareObject.radius),
			1
		);
		const hexagonPosition = new THREE.BufferAttribute(
			new Float32Array(this.hexagonObject.position),
			3
		);
		const hexagonRadius = new THREE.BufferAttribute(
			new Float32Array(this.hexagonObject.radius),
			1
		);
		geometry.setAttribute("position", circlePosition);
		geometry.setAttribute("radius", circleRadius);
		geometry.setAttribute("starPosition", starPosition);
		geometry.setAttribute("starRadius", starRadius);
		geometry.setAttribute("squarePosition", squarePosition);
		geometry.setAttribute("squareRadius", squareRadius);
		geometry.setAttribute("hexagonPosition", hexagonPosition);
		geometry.setAttribute("hexagonRadius", hexagonRadius);

		const material = new THREE.RawShaderMaterial({
			vertexShader: document.querySelector("#js-vertex-shader").textContent,
			fragmentShader: document.querySelector("#js-fragment-shader").textContent,
			uniforms: {
				u_switch_01: { type: "f", value: 0.0 },
				u_switch_02: { type: "f", value: 0.0 },
				u_switch_03: { type: "f", value: 0.0 },
				u_switch_04: { type: "f", value: 0.0 },
				u_color: { type: "v3", value: new THREE.Color(this.color) }
			}
		});
		this.mesh = new THREE.Points(geometry, material);
		this.stage.scene.add(this.mesh);
	}

	_setLoop(number) {
		switch (number) {
			case 0:
				gsap.to(this.mesh.material.uniforms.u_switch_01, {
					duration: this.duration,
					ease: this.ease,
					value: 1.0
				});
				break;
			case 1:
				gsap.to(this.mesh.material.uniforms.u_switch_02, {
					duration: this.duration,
					ease: this.ease,
					value: 1.0
				});
				break;
			case 2:
				gsap.to(this.mesh.material.uniforms.u_switch_03, {
					duration: this.duration,
					ease: this.ease,
					value: 1.0
				});
				break;
			case 3:
				gsap.to(this.mesh.material.uniforms.u_switch_04, {
					duration: this.duration,
					ease: this.ease,
					value: 1.0,
					onComplete: () => {
						gsap.set(this.mesh.material.uniforms.u_switch_01, {
							value: 0.0
						});
						gsap.set(this.mesh.material.uniforms.u_switch_02, {
							value: 0.0
						});
						gsap.set(this.mesh.material.uniforms.u_switch_03, {
							value: 0.0
						});
						gsap.set(this.mesh.material.uniforms.u_switch_04, {
							value: 0.0
						});
					}
				});
				break;
		}
	}

	_render() {
		//
	}

	onResize() {
		//
	}

	onRaf() {
		this._render();
	}
}

class Webgl {
	constructor() {
		const stage = new Stage();
		stage.init();

		const particle = new Particle(stage);
		particle.init();

		window.addEventListener("resize", () => {
			stage.onResize();
			particle.onResize();
		});

		const _raf = () => {
			window.requestAnimationFrame(() => {
				_raf();

				stage.onRaf();
				particle.onRaf();
			});
		};
		_raf();

		const allDuration = 3.0;
		let currentNum = 0;

		const _moveChangeSlide = () => {
			if (currentNum > 2) {
				currentNum = 0;
			} else {
				currentNum++;
			}
		};

		const _autoChangeSlide = () => {
			gsap
				.to(
					{},
					{
						ease: "none",
						duration: allDuration,
						repeat: -1.0
					}
				)
				.eventCallback("onRepeat", () => {
					particle._setLoop(currentNum);
					_moveChangeSlide();
				});
		};
		_autoChangeSlide();
	}
}

new Webgl();
