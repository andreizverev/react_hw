import { useEffect, useState } from 'react';

export const useDebounce = <V>(outerValue: V, ms: number) => {
	const [optimizedValue, setOptimizedValue] = useState<V>(outerValue);
	const timerIdRef = useRef<number>(null);

	useEffect(() => {
		if (timerIdRef.current) {
			clearTimeout(timerIdRef.current);
		}
		timerIdRef.current = setTimeout(() => {
			setOptimizedValue(outerValue);
		}, ms);
	}, [ms, outerValue]);

	return optimizedValue;
};
