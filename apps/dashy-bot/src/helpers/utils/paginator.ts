/* eslint-disable @typescript-eslint/no-explicit-any */
export const paginator = (
    notes: any[],
    pageLength: number,
    pageNumber: number
) => {
    const shit = notes.slice(
        (pageNumber - 1) * pageLength,
        pageLength * pageNumber
    );
    console.log(notes, shit);
    return shit;
};
