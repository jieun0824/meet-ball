export default function Button({ title }: { title: string }) {
  return (
    <button className="pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-pointColor text-black">
      {title}
    </button>
  );
}
