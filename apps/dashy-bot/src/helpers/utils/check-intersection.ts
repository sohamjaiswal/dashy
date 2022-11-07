export const checkIntersection: (sets: Set<any>[]) => boolean = (
    sets: Set<any>[]
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
