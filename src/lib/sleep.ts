const addFrame = (value: string) => {
	const logs = document.getElementById('logs');
	const span = document.createElement('span');

	span.textContent = value;
	// span.className = `logs__${type}`;

	logs?.appendChild(span);
};

export const sleep = (ms: number, value?: string) => {
	console.log('==========>sleep', value);
	addFrame(`start sleep ${value}`)
	const start = performance.now();

	while (performance.now() - start < ms) {};
	addFrame(`stop sleep ${value}`);
};
