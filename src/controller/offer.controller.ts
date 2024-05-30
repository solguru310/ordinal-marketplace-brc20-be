import { Request, Response } from "express";
import * as Bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";

import { Offer } from "../model/offer.model";
import { generateOfferPSBT, combinePsbt } from "../service/psbt.service";
import { Inscription } from "../model/inscription.model";

const getAllOffers = async (req: Request, res: Response) => {
  const inscriptionId = req.params.inscriptionId;
  try {
    const offers = await Offer.find({inscriptionId: inscriptionId});
    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }

}

const requestOffer = async (req: Request, res: Response) => {
  const {
    inscriptionId,
    sellerAddress,
    buyerAddress,
    price,
    tokenTicker,
    psbt,
    status,
    buyerSignedPsbt,
  } = req.body;

  console.log("Offer inputs => ", req.body)
  const newOffer = new Offer({
    sellerAddress,
    buyerAddress,
    inscriptionId,
    price,
    tokenTicker,
    psbt,
    status,
    buyerSignedPsbt,
  });

  try {
    await newOffer.save();
    res.status(200).json({
      success: true,
      msg: "Successfully requested",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};


const requestPsbt = async (req: Request, res: Response) => {
  const {
    inscriptionId,
    brcInscriptionId,
    fee_brcInscriptionId,
    buyerPubkey,
    buyerAddress,
    sellerPubkey,
    sellerAddress,
  } = req.body;
  try {
    console.log("inscriptionid => ",inscriptionId);
    const psbt = await generateOfferPSBT(
      inscriptionId,
      brcInscriptionId,
      fee_brcInscriptionId,
      buyerPubkey,
      buyerAddress,
      sellerPubkey,
      sellerAddress
    );
    console.log("base 64 => ", psbt.toHex());
    res.status(200).json({
      success: true,
      psbt: psbt.toHex(),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      psbt: ""
    })
  }
};

const rejectOffer = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Offer.findByIdAndUpdate(id, {status: 2})
    res.status(200).json({
      success: true,
      msg: "Successfully updated"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

const acceptOffer = async (req: Request, res: Response) => {
  const {inscriptionId, psbt, buyerSignedPsbt, signedPsbt} = req.body;

  // console.log("PSBT Value => ", Bitcoin.Psbt.fromHex(signedPsbt));
  // console.log("xxxxx =>", inscriptionId, signedPsbt);
  try {
    await combinePsbt(psbt, buyerSignedPsbt, signedPsbt);
    await Inscription.findOneAndDelete({inscriptionId: inscriptionId});
    await Offer.deleteMany({inscriptionId: inscriptionId});
    res.status(200).json({
      success: true,
      msg: "Successfully broadcasted."
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

const test = async (req: Request, res: Response) => {
  const { psbt } = req.body;
  const temp = await Bitcoin.Psbt.fromHex(psbt);
  res.status(200).json({
    psbt: temp.toBase64()
  })
}

export default {
  requestOffer,
  requestPsbt,
  getAllOffers,
  rejectOffer,
  acceptOffer,
  test,
};
