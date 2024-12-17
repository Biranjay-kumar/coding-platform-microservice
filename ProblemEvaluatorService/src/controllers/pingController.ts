import { Request,Response } from "express"

export const pingCheck=( req:Request,res:Response)=>{
 console.log(req.url)
 res.status(200).json({
  message:"Ping check ok"
 })
}