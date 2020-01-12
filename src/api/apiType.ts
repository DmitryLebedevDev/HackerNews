export interface IjobsRequest {
    id: number;
    deleted?: boolean;
    type: 'job';
    by: string;
    time: number;
    dead?: boolean;
    kids?: number[];
    text: string;
    url: string;
    title: string;
}
export interface IstoryRequest {
    by: string;
    descendants: number;
    id: number;
    kids?: number[];
    score: number;
    time: number;
    title: string;
    type: 'story';
    url: string;
}
export interface IcommentRequest {
    by: string;
    id: number;
    kids?: number[];
    parent: number; /////////////////////////// ficha
    text: string;
    time: number;
    type: 'comment';
}
export interface IaskRequest {
    by: string;
    descendants: number;
    id: number;
    kids?:number[];
    score: number;
    text: string;
    time: number;
    title: string;
    type: 'story';
    url: string;
}
export interface IpullRequest {
    by: string;
    descendants: string;
    id: number;
    kids?: number[];
    parts: number[];
    score: number;
    text: string;
    time: number;
    title: string;
    type: 'poll';
}
export interface Ipollopt {
    by: string;
    id: number;
    poll: number;
    score: number;
    text: string;
    time: number;
    type: 'pollopt';
}