export const pendingSleep = (ms: number) => {
	const start = performance.now();

	while (performance.now() - start < ms) {

		// @ts-ignore
		console.log(`==========>navigator.scheduling.isInputPending() ${ms}`, navigator.scheduling.isInputPending());
		// @ts-ignore
		if (navigator.scheduling.isInputPending()) {
			return null;
		}
	};
};
