// export default function CreatePage() {
//   async function createMeet(formData: FormData) {
//     'use server';

//     const meetingStartHour = formData.get('meetingStartHour');
//     const meetingStartMin = formData.get('meetingStartMin');
//     const meetingEndHour = formData.get('meetingEndHour');
//     const meetingEndMin = formData.get('meetingEndMin');

//     console.log({
//       meetingEndHour,
//       meetingEndMin,
//       meetingStartHour,
//       meetingStartMin,
//     });
//   }

//   const hours = Array.from({ length: 24 }, (_, index) => index + 1);
//   const mins = [0, 30];

//   return (
//     <>
//       <form action={createMeet}>
//         <div>
//           <p>회의 시간대</p>
//           <select value="meetingStartHour">
//             {hours.map(hour => (
//               <option key={hour} value={hour}>
//                 {hour}
//               </option>
//             ))}
//           </select>
//           <p>:</p>
//           <select value="meetingStartMin">
//             {mins.map(mins => (
//               <option key={mins} value={mins}>
//                 {mins}
//               </option>
//             ))}
//           </select>
//           <p>-</p>
//           <select value="meetingEndHour">
//             {hours.map(hour => (
//               <option key={hour} value={hour}>
//                 {hour}
//               </option>
//             ))}
//           </select>
//           <p>:</p>
//           <select value="meetingEndMin">
//             {mins.map(mins => (
//               <option key={mins} value={mins}>
//                 {mins}
//               </option>
//             ))}
//           </select>
//         </div>
//       </form>
//     </>
//   );
// }
'use client';

import { createMeet } from '@/lib/actions';

export default function CreatePage() {
  return (
    <>
      <h1>CreatePage</h1>
      <button
        onClick={() => {
          createMeet('test', 'test', ['2022-01-01T00:00:00.000Z']);
        }}
      >
        create meet
      </button>
    </>
  );
}
