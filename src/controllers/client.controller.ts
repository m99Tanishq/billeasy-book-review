import { asyncHandler } from "../helpers/asyncHandler";
import { createClientService } from "../services/client.service";



export const clientSignUpController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const client = await createClientService({ name });
  res.status(200).json({ success: true, message: "Client created successfully" });
}); 