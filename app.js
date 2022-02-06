import "./style.css";

import * as THREE from "three";
import * as ThreeControls from "three-controls";

let scene, camera, renderer, controls;

const init = () => {
    /*
     * 01 - Create the scene.
     * Docs: ttps://threejs.org/docs/#api/en/scenes/Scene
     */
    scene = new THREE.Scene();

    /*
     * 02 - Create Camera.
     * Docs: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
     * Camera: https://threejs.org/docs/#api/en/cameras/Camera
     */
    camera = new THREE.PerspectiveCamera(
        43,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(20, 20, 20);

    /*
     * 03 - Create renderer.
     * Docs: https://threejs.org/docs/#api/en/renderers/WebGLRenderer
     */
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    /*
     * 04 - Append to document.
     */
    document.body.appendChild(renderer.domElement);

    /*
     * 05 - Update renderer on window resize.
     */
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    /*
     * 06 - Create OrbitControls.
     * Docs: https://threejs.org/docs/#examples/en/controls/OrbitControls
     */
    controls = new ThreeControls.OrbitControls(camera, renderer.domElement);

    /*
     * 07 - Create a geometry.
     * Docs: https://threejs.org/docs/#api/en/geometries/BoxGeometry
     * BufferGeometry: https://threejs.org/docs/#api/en/core/BufferGeometry
     */
    const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);

    /*
     * 08 - Create a material.
     * Docs: https://threejs.org/docs/#api/en/materials/MeshLambertMaterial
     * Materials: https://threejs.org/docs/#api/en/materials/Material
     */
    const whiteMaterial = new THREE.MeshLambertMaterial(0x7f7f7f);

    /*
     * 09 - Create a mesh.
     * Docs: https://threejs.org/docs/#api/en/objects/Mesh
     */
    const cubeMesh = new THREE.Mesh(cubeGeometry, whiteMaterial);
    cubeMesh.position.set(0, 0, 0);
    scene.add(cubeMesh);

    /*
     * 10 - Add ambient light to the scene
     * Docs: https://threejs.org/docs/#api/en/lights/AmbientLight
     * Light: https://threejs.org/docs/#api/en/lights/Light
     */
    const ambient_light = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient_light);

    /*
     * 11 - Add point-light to the scene
     * Docs: https://threejs.org/docs/#api/en/lights/PointLight
     * Light: https://threejs.org/docs/#api/en/lights/Light
     */
    const light = new THREE.PointLight(0x00baff, 1, 100);
    light.position.set(15, 15, 15);
    scene.add(light);
};

const animate = () => {
    requestAnimationFrame(animate);
    render();
};

const render = () => {
    renderer.render(scene, camera);
};

init();
animate();
