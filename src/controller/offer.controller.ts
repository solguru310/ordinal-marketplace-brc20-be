import { Request, Response } from "express";
import * as Bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";

import { Offer } from "../model/offer.model";
import { generateOfferPSBT } from "../service/psbt.service";

const makeOffer = async (req: Request, res: Response) => {
  const {
    sellerAddress,
    buyerAddress,
    inscriptionId,
    price,
    tokenTicker,
    psbt,
  } = req.body;

  const newOffer = new Offer({
    sellerAddress,
    buyerAddress,
    inscriptionId,
    price,
    tokenTicker,
    psbt,
    status: 1
  });

  try {
    await newOffer.save();
    res.status(200).json({
        success: true,
        msg: "Successfully requested"
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        error: error
    })
  }

};

const makePsbt = async (req: Request, res: Response) => {
    const {
        inscriptionId,
        sellerAddress, 
        sellerPubkey,
        brcInscriptionId,
        fee_brcInscriptionId,
        buyerAddress,
        buyerPubkey,
    } = req.body;

    try {
        const psbt = await generateOfferPSBT(inscriptionId, brcInscriptionId, fee_brcInscriptionId, buyerPubkey, buyerAddress, sellerPubkey, sellerAddress);
    } catch {

    }
}

