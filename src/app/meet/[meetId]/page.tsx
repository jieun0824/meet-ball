export default function MeetPage({ params }: { params: { meetId: string } }) {
  return <div>meetId: {params.meetId}</div>;
}
