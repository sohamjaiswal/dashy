export const checkIntersection: (sets: Set<unknown>[]) => boolean = (
    sets: Set<unknown>[]
) => {
    sets.forEach((set, i, original) => {
        const setEls = [...set];
        const checkSets = original.splice(i, 1);
        checkSets.forEach((checkSet) => {
            setEls.forEach((el) => {
                if (checkSet.has(el)) return true;
            });
        });
    });
    return false;
};
