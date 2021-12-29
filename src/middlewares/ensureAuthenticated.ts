import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authtoken = request.headers.authorization;

  if (!authtoken) {
    // end() pega mensagem pafrão do 401
    return response.status(401).end();
  }

  const [, token] = authtoken.split(" ");

  try {
    const { sub } = verify(
      token,
      "656d70db6cd4249eb2f2d574a20e5e38"
    ) as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

  // Recuperar informações do usuário
}
