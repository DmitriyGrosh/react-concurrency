import React, {
	FC,
	useDeferredValue,
	useLayoutEffect,
	useRef,
} from 'react';

interface ILogs {
	filter?: string;
	delayedFilter?: string;
}

enum Probe {
	Start = 'Start',
	Low = 'Low',
	High = 'High',
}

type TLog = 'high' | 'low' | 'interrupted';

export const AutocompleteLogs: FC<ILogs> = ({ filter, delayedFilter }) => {
	const isFirstRenderRef = useRef(true);
	const isFirstRender = isFirstRenderRef.current;

	const probeRef = useRef(Probe.Start);
	const deferredProbe = useDeferredValue(probeRef.current);

	const renderStateRef = useRef('High Start');

	if (isFirstRenderRef.current) {
		isFirstRenderRef.current = false;
	}

	const isLowPriority = probeRef.current === deferredProbe && !isFirstRender;

	const addFrame = (value: string, type: TLog) => {
		const logs = document.getElementById('logs');
		const span = document.createElement('span');
		const line = document.createElement('div');
		line.className = 'line';

		span.innerHTML = value;
		span.className = `logs__${type}`;

		logs?.appendChild(span);
		logs?.appendChild(line)
	};

	const onLowPriorityStart =  () => {
		const value = `Low Priority Start: </br> <span class="white">player: <b class="blue">"${filter}"</b> delayed player: <b class="red">"${delayedFilter}"</b></span>`;

		addFrame(value, 'low');

		console.log(
			`%c Low Priority Start - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: teal;',
			'color: white'
		);
	}
	const onLowPriorityEnd = () => {
		const value = `Low Priority End: </br> <span class="white">player: <b class="blue">"${filter}"</b> delayed player: <b class="red">"${delayedFilter}"</b></span>`;

		addFrame(value, 'low');

		console.log(
			`%c Low Priority End - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: teal;',
			'color: white'
		);
	};

	const	onHighPriorityStart = () => {
		const value = `High Priority Start: </br> <span class="white">player: <b class="blue">"${filter}"</b> delayed player: <b class="red">"${delayedFilter}"</b></span>`;

		addFrame(value, 'high');

		console.log(
			`%c High Priority Start - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: green;',
			'color: white'
		);
	};

	const	onHighPriorityEnd = () => {
		const value = `High Priority End: </br> <span class="white">player: <b class="blue">"${filter}"</b> delayed player: <b class="red">"${delayedFilter}"</b></span>`;

		addFrame(value, 'high');

		console.log(
			`%c High Priority End - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
			'color: green;',
			'color: white'
		);
	};
	const onLowPriorityInterrupted = () => {
		const value = 'Low Priority Interrupted!';

		addFrame(value, 'interrupted');

		console.log('%c Low Priority Interrupted!', 'color: red');
	}

	if (isLowPriority) {
		renderStateRef.current = 'Low Start';
		probeRef.current = Probe.Low;
		onLowPriorityStart?.();
	} else {
		if (renderStateRef.current === 'Low Start') {
			onLowPriorityInterrupted?.();
		}

		renderStateRef.current = 'High Start';
		probeRef.current = Probe.High;
		// onHighPriorityStart?.();
	}

	useLayoutEffect(() => {
		if (isLowPriority) {
			renderStateRef.current = 'Low End';
			// onLowPriorityEnd?.();
		} else {
			renderStateRef.current = 'High End';
			// onHighPriorityEnd?.();
		}
	});

	const onClear = () => {
		const logs = document.getElementById('logs');

		if (logs) {
			logs.innerHTML = '';
		}
	};

	return (
		<div className="flex flex__column second-width p-8">
			<div onClick={onClear}>Clear</div>
			<div id="logs" className="flex flex__column flex__gap-md">
			</div>
		</div>
	);
};

