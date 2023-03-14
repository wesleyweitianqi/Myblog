import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "@/db/index";
import { User } from "@/db/entites/index";
import { admin } from "@/service/firebaseAmin";
import { Session } from "next-iron-session";
import { ObjectID } from "typeorm";
import { getConnectionManager } from "typeorm";
import { Cookie } from "next-cookie";

const connectionManager = getConnectionManager();
// Check if a connection to the database already exists
const hasDefaultConnection = connectionManager.has("default");

interface MySession extends Session {
  user: {
    id: ObjectID;
    phone: number;
  };
}
type NextIronRequest = NextApiRequest & { session: MySession };

export default async function login(
  req: NextIronRequest,
  res: NextApiResponse
) {
  const cookies = Cookie.fromApiRoute(req, res);
  const { phone, verifyCode } = req.body;
  if (!hasDefaultConnection) {
    await AppDataSource.initialize();
  }
  const userRepo = await AppDataSource.getRepository(User);
  let existingUser = await userRepo.findOne({
    where: { phone: phone },
  });
  // const userAuthRepo = await AppDataSource.getRepository(UserAuth);

  if (!existingUser) {
    existingUser = userRepo.create({
      phone: phone,
    });
  }
  await userRepo.save(existingUser);
  res
    .status(200)
    .json({
      message: "Login successful",
      data: { id: existingUser.id, phone: existingUser.phone },
    });
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
