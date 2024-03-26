import MainCard from '@/components/card/main-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getCurrentUser } from '@/lib/authentication';
import { Meet } from '@prisma/client';
import { AuthenticatedUser } from 'next-auth';

export default async function EventCarousel({ meets }: { meets: any }) {
  let currentUser: null | AuthenticatedUser = null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.log(error);
  }
  return (
    <Carousel>
      <CarouselContent>
        {meets.map((a: Meet, i: number) => {
          return (
            <CarouselItem key={i}>
              <MainCard
                meet={a}
                isMyMeet={a.managerId === currentUser?.id}
                pathName="/"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
