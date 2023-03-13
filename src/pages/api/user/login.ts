import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "@/db/index";
import { User } from "@/db/entites/index";
import { admin } from "@/service/firebaseAmin";
import { Session } from "next-iron-session";
type NextIronRequest = NextApiRequest & { session: Session };
export default async function login(
  req: NextIronRequest,
  res: NextApiResponse
) {
  const { phone, user } = req.body;
  console.log("🚀 ~ file: login.ts:12 ~ user:", user);

  await AppDataSource.initialize();
  const userRepo = await AppDataSource.getRepository(User);
  let existingUser = await userRepo.findOne({
    where: { phone: user.phoneNumber },
  });
  // const userAuthRepo = await AppDataSource.getRepository(UserAuth);

  if (!existingUser) {
    existingUser = userRepo.create({
      phone: phone,
    });
  }
  await userRepo.save(existingUser);
  req.session.set("user", {
    id: existingUser.id,
    phone: existingUser.phone,
  });
  await req.session.save();
  res.status(200).json({ message: "Login successful" });
  // const userAuth = await userAuthRepo.findOne({
  //   where: {
  //     identity_type: verify_type,
  //     identifier: phone,
  //   },
  //   relations: {
  //     user: true,
  //   },
  // });

  // if (userAuth) {
  //   console.log("+++");
  // } else {
  //   const user = new User();
  //   user.name = phone;
  //   user.phone = phone;
  //   user.avatar = currentUser?.photoURL;
  //   const userAuth = new UserAuth();
  //   userAuth.identifier = phone;
  //   userAuth.identity_type = identity_type;
  //   userAuth.credential = currentUser?.accessToken;
  //   userAuth.user = user;
  //   await userAuth.save();
  //   const res = await AppDataSource.manager.find(UserAuth);
  //   console.log("🚀 ~ file: login.ts:41 ~ login ~ res:", res);
  // }
}
