import { BookGenre } from './../models/book.model';
import { Request, Response } from "express";
import {
  getAllBooksByAuthorAndTitleService,
  getBookByIdWithPaginatedReviewsService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/book.service";
import { asyncHandler } from "../helpers/asyncHandler";

export const getAllPaginatedBooksByAuthorAndTitleController = asyncHandler(
  async (req: Request, res: Response) => {
    const { author, genre, limit = 10, page = 1 } = req.query;
    const result = await getAllBooksByAuthorAndTitleService({
      author: author as string | "",
      genre: genre as BookGenre | undefined,
      limit: Number(limit),
      page: Number(page),
    });
    res.status(200).json(result);
  }
);

export const getBookByIdWithPaginatedReviewsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.query;
    const { bookId } = req.params;
    const result = await getBookByIdWithPaginatedReviewsService({
      bookId: Number(bookId),
      limit: Number(limit),
      page: Number(page),
    });
    res.status(200).json(result);
  }
);

export const createBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, author, description, genre, publisher } =
      req.body;
    const result = await createBookService({
      title,
      author,
      description,
      genre,
      publisher,
    });
    res.status(200).json(result);
  }
);

export const updateBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId, title, description, genre, publisher } =
      req.body;
    const result = await updateBookService({
      bookId: Number(bookId),
      title,
      description,
      genre,
      publisher,
    });
    res.status(200).json(result);
  }
);

export const deleteBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const result = await deleteBookService({ bookId: Number(bookId) });
    res.status(200).json(result);
  }
);
