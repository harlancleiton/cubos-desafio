type Interval = {
  start: string;
  end: string;
};

export interface ISchedule {
  day: string;
  intervals: Interval[];
}
