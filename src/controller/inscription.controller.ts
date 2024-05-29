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

  try {
    await Inscription.deleteOne({ inscriptionId: inscriptionId });
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
    const inscriptions = Inscription.find({});

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
    const {
        address
    } = req.body;

    try {
        const inscriptions = Inscription.find({address: address});
    
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
}

const getInscriptionsById = async (req: Request, res: Response) => {
    const {
        inscriptionId
    } = req.body;

    try {
        const inscription = Inscription.find({inscriptionId: inscriptionId});
    
        res.status(200).json({
          success: true,
          inscription,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error,
        });
      }
}

export default {
    listInscription,
    unlistInscription,
    getAllInscriptions,
    getInscriptionsByAddress,
    getInscriptionsById
}