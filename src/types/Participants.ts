type Participants = {
  userId: string;
  timeTable: {
    [key: string]: number[];
  };
}[];

export default Participants;
