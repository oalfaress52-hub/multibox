import { createEngine } from "./core/engine.js";
import { createScene } from "./core/scene.js";
import { createCamera } from "./core/camera.js";
import { createLighting } from "./core/lighting.js";

const canvas = document.getElementById("renderCanvas");

const engine = createEngine(canvas);
const scene = createScene(engine);
createCamera(scene, canvas);
createLighting(scene);

// TEMP TEST OBJECT (remove later)
BABYLON.MeshBuilder.CreateBox("test", { size: 1 }, scene);

engine.runRenderLoop(() => {
	scene.render();
});