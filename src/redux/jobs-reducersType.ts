export interface Ijob {
  id: number,
  by: string,
  score: number,
  text: string,
  time: number,
  title: string,
  url: string,
}
export default interface IjobsReduser {
  jobs: Ijob[]
  loadJobsNum: number,
  jobsIndexArr: number[],
}