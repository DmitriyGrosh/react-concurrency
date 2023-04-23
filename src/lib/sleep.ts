export const sleep = (ms: number, value?: string) => {
	console.log('==========>sleep', value);
	const start = performance.now();

	while (performance.now() - start < ms) {};
};
