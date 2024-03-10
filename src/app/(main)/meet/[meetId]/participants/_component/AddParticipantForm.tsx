// "use client";
// import addParticipantFormAction from './addParticipantFormAction';

// function clientAction(formData: FormData) {
//     try {
//         addParticipantFormAction(formData);
//     } catch (error) {
//         alert(error);
//     }
// }

// export default function AddParticipantForm({ meetId }: { meetId: string }) {
//   return (
//     <form action={clientAction}>
//       <input type="hidden" name="meetId" value={meetId} readOnly/>
//       <input type="text" name="email" placeholder="email" className="text-black" />
//       <button type="submit">Add</button>
//     </form>
//   );
// }
