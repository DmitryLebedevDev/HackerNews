export interface IjobsRequest {
    id: number;
    deleted?: boolean;
    type: string;
    by: string;
    time: number;
    dead?: boolean;
    kids?: number[];
    text: string;
    url: string;
    title: string;
}