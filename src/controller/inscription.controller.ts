import { Request, Response } from "express";

import { Inscription } from "../model/inscription.model";

const listInscription = async (req: Request, res: Response) => {
  const {
    address,
    pubkey,
    inscriptionId,
    inscriptionNumber,
    content,
    price,
    tokenTicker,
  } = req.body;

  const newInscription = new Inscription({
    address,
    pubkey,
    inscriptionId,
    inscriptionNumber,
    content,
    price,
    tokenTicker,
  });

  try {
    await newInscription.save();

    return res.status(200).json({
      success: true,
      msg: "Successfully listed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const unlistInscription = async (req: Request, res: Response) => {
  const { inscriptionId } = req.body;
  console.log("xxxxx => ", req.body);
  try {
    await Inscription.findOneAndDelete({ inscriptionId: inscriptionId });
    return res.status(200).json({
      success: true,
      msg: "Successfully unlisted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const getAllInscriptions = async (req: Request, res: Response) => {
  try {
    
    const inscriptions = await Inscription.find({});
    res.status(200).json({
      success: true,
      inscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const getInscriptionsByAddress = async (req: Request, res: Response) => {
  const address = req.params.sellerAddress;
  try {
    const inscriptions = await Inscription.find({ address: address });
    res.status(200).json({
      success: true,
      inscriptions,
    });
  } catch (error) {
    console.log("Get inscriptions by address error =>", error);
    if (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    } else {
      res.status(200).json({
        success: true,
        inscriptions: []
      });
    }
  }
};

const getInscriptionById = async (req: Request, res: Response) => {
  const inscriptionId = req.params.id;
  try {
    const inscription = await Inscription.find({ inscriptionId: inscriptionId });
    if (inscription.length == 0) {
      res.status(500).json({
        success: false,
        error: "Not listed"
      });
    }    
    res.status(200).json({
      success: true,
      inscription: inscription[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export default {
  listInscription,
  unlistInscription,
  getAllInscriptions,
  getInscriptionsByAddress,
  getInscriptionById,
};
