/**
 * by: "tlemberg"
id: 21766411
score: 1
time: 1576095836
title: "Curebase (YC S18) hiring for engineering and sales to reinvent clinical research"
type: "job"
url: "https://angel.co/company/curebase/jobs"
 */
export interface Ijob {
  by: string,
  id: number,
  score: number,
  time: number,
  title: string,
  url: string,
}
export default interface IjobsReduser {
  jobs: Ijob[]
  loadJobsNum: number,
  jobsIndexArr: number[],
  isLoad: boolean,
  isMax: boolean,
}