export function createScene(engine) {
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0.8, 0.9, 1, 1);
	return scene;
}