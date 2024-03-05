import { MeetType } from '@prisma/client';

function validateString(str?: string): str is string {
  if (!str || str.length === 0) {
    return false;
  }
  return true;
}

function validateMeetMode(str?: string): str is MeetType {
  if (!str || !Object.values(MeetType).includes(str as MeetType)) {
    return false;
  }
  return true;
}

export { validateString, validateMeetMode };
