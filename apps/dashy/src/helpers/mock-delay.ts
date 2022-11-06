export const mockDelay = async (
    func: () => void | Promise<void>,
    delay: number
) => {
    await new Promise((res) =>
        setTimeout(async () => res(await func()), delay)
    );
};
