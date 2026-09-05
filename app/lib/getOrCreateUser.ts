// import { prisma } from "./prisma";
// import { createSupabaseServerClient } from "./supabase/server";

// /**
//  * Supabase Auth بيدير المستخدمين بجدول خاص فيه (auth.users) ما بقدر
//  * الـ Prisma توصله مباشرة. عشان نقدر نعمل Relations (زي SavedMeal -> User)
//  * لازم يكون عنا "نسخة" من المستخدم بجدولنا (public.users).
//  *
//  * هاي الدالة بترجع المستخدم الحالي، وإذا أول مرة عم يستخدم الـ API
//  * بتعمله upsert تلقائياً بجدول users.
//  *
//  * (بديل أفضل بالمستقبل: تعمل Database Trigger على auth.users INSERT
//  * تزامن الصف تلقائياً وقت الـ Signup، بدل ما تعتمد على أول API call)
//  */
// export async function getOrCreateCurrentUser() {
//   const supabase = await createSupabaseServerClient();
//   const {
//     data: { user: authUser },
//   } = await supabase.auth.getUser();

//   if (!authUser) return null;

//   const user = await prisma.user.upsert({
//     where: { id: authUser.id },
//     update: {}, // موجود مسبقاً، ما في شي نعدله
//     create: {
//       id: authUser.id,
//       email: authUser.email ?? "",
//     },
//   });

//   return user;
// }
