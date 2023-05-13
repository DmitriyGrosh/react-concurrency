const addFrame = (value: string, isLine: boolean) => {
	const logs = document.getElementById('logs');
	const span = document.createElement('span');
	const line = document.createElement('div');
	line.className = 'line';
	span.className = 'sleep-color';

	span.textContent = value;
	// span.className = `logs__${type}`;

	logs?.appendChild(span);
	if (isLine) {
		logs?.appendChild(line);
	}
};

export const sleep = (ms: number, value?: string) => {
	console.log('==========>sleep', value);
	addFrame(`[start sleep] ${value}`, false)
	const start = performance.now();

	while (performance.now() - start < ms) {};
	addFrame(`[stop sleep] ${value}`, true);
};
