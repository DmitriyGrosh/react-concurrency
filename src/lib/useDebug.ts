import { useDeferredValue, useLayoutEffect, useRef } from "react";

type Void = () => void;

type UseDebugConcurrent = {
	onLowPriorityStart: Void;
	onLowPriorityEnd: Void;
	onHighPriorityStart: Void;
	onHighPriorityEnd: Void;
	onLowPriorityInterrupted: Void;
}

export const useDebug = ({ filter, delayedFilter }: { filter: string; delayedFilter: string }) =>
	useDebugConcurrent({
		onLowPriorityStart: () => {
			console.log(
				`%c Low Priority Start - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
				'color: teal;',
				'color: white'
			);
		},
		onLowPriorityEnd: () => {
			console.log(
				`%c Low Priority End - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
				'color: teal;',
				'color: white'
			);
		},
		onHighPriorityStart: () => {
			console.log(
				`%c High Priority Start - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
				'color: green;',
				'color: white'
			);
		},
		onHighPriorityEnd: () => {
			console.log(
				`%c High Priority End - %cfilter: "${filter}" delayedFilter: "${delayedFilter}"`,
				'color: green;',
				'color: white'
			);
		},
		onLowPriorityInterrupted: () =>
			console.log('%c Low Priority Interrupted!', 'color: red'),
	});

const useDebugConcurrent = ({
		onLowPriorityStart,
		onLowPriorityEnd,
		onHighPriorityStart,
		onHighPriorityEnd,
		onLowPriorityInterrupted,
	}: UseDebugConcurrent) => {
	const probeRef = useRef({});
	const deferredProbe = useDeferredValue(probeRef.current);
	const renderStateRef = useRef('High Start');

	const isFirstRenderRef = useRef(true);
	const isFirstRender = isFirstRenderRef.current;
	if (isFirstRenderRef.current) {
		isFirstRenderRef.current = false;
	}

	const isLowPriority = probeRef.current === deferredProbe && !isFirstRender;

	if (isLowPriority) {
		renderStateRef.current = 'Low Start';
		probeRef.current = {};
		onLowPriorityStart?.();
	} else {
		if (renderStateRef.current === 'Low Start') {
			onLowPriorityInterrupted?.();
		}

		renderStateRef.current = 'High Start';
		probeRef.current = {};
		onHighPriorityStart?.();
	}

	useLayoutEffect(() => {
		if (isLowPriority) {
			renderStateRef.current = 'Low End';
			onLowPriorityEnd?.();
		} else {
			renderStateRef.current = 'High End';
			onHighPriorityEnd?.();
		}
	});
};
