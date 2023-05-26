import { Request, Response } from "express";
import ClansService from "../services/clans-service";
import AppError from "../shared/appError";

const clansService = new ClansService();

const getClans = async (req: Request, res: Response) => {
  const clans = await clansService.getAll();
  return res.status(200).send({
    body: { clans },
  });
};

const getClanById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const clan = await clansService.getById({ id });
    return res.status(200).send({ body: clan });
  } catch (err) {
    if (err instanceof AppError) {
      const { statusCode } = err;
      return res.status(statusCode).send({ body: err });
    }
    return res.status(400).send({ body: err });
  }
};

const postClans = async (req: Request, res: Response) => {
  const { name, link, icon } = req.body;
  try {
    const clans = await clansService.post({ name, link, icon });
    return res.status(201).send({
      body: { clans },
    });
  } catch (err) {
    if (err instanceof AppError) {
      const { statusCode } = err;
      return res.status(statusCode).send({ body: err });
    }
    return res.status(400).send({ body: err });
  }
};

const putClans = async (req: Request, res: Response) => {
  const { name, icon, link } = req.body;
  const id = parseInt(req.params.id);
  try {
    const user = await clansService.put({ id, name, icon, link });
    return res.status(200).send({ body: user });
  } catch (err) {
    if (err instanceof AppError) {
      const { statusCode } = err;
      return res.status(statusCode).send({ body: err });
    }
    return res.status(400).send({ body: err });
  }
};

export default { getClans, postClans, getClanById, putClans };
