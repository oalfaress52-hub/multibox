export function createEngine(canvas) {
	const engine = new BABYLON.Engine(canvas, true);

	window.addEventListener("resize", () => {
		engine.resize();
	});

	return engine;
}