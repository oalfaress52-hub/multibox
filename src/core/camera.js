export function createCamera(scene, canvas) {
	const camera = new BABYLON.ArcRotateCamera(
		"camera",
		Math.PI / 4,
		Math.PI / 3,
		10,
		BABYLON.Vector3.Zero(),
		scene
	);

	camera.attachControl(canvas, true);
	return camera;
}