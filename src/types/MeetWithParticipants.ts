import { Prisma } from '@prisma/client';

const meetWithParticipants = Prisma.validator<Prisma.MeetDefaultArgs>()({
  include: { participants: true },
});

type MeetWithParticipants = Prisma.MeetGetPayload<typeof meetWithParticipants>;

export default MeetWithParticipants;
