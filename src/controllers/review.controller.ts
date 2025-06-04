import { Request, Response } from "express";
import { createReviewForBookService, updateReviewForBookService, deleteReviewForBookService } from "../services/review.service";

export const createReviewForBookController = async (req: Request, res: Response) => {
    const { bookId, userId, rating, title, content, readingStatus } = req.body;
    const result = await createReviewForBookService({ bookId, userId, rating, title, content, readingStatus });
    res.status(200).json(result);
}

export const updateReviewForBookController = async (req: Request, res: Response) => {   
    const { reviewId, rating, title, userId, content, readingStatus } = req.body;
    const result = await updateReviewForBookService({ reviewId, rating, title, userId, content, readingStatus });
    res.status(200).json(result);
}

export const deleteReviewForBookController = async (req: Request, res: Response) => {
    const { bookId, reviewId } = req.params;
    const result = await deleteReviewForBookService({ bookId: Number(bookId), reviewId: Number(reviewId) });
    res.status(200).json(result);
}