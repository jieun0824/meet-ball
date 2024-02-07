//add route handler for api/meets

import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), 'public/data', 'scheduleData.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const schedules = JSON.parse(fileContents);
  return Response.json({ schedules });
}
