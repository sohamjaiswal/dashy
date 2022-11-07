export interface IControllerResponse {
    success: boolean;
    title: string;
    description: string;
    extra: Record<string, unknown> | null;
}

export type controllerFunc = (
    ...args: any[]
) => IControllerResponse | Promise<IControllerResponse>;
