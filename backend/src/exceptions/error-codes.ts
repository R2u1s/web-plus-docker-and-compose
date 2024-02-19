import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  BadRequestAlreadyExistsUser,
  BadRequestAlreadyExistsEmail,
  BadRequestAlreadyExistsWish,
  Unauthorized,
  NotFoundUser,
  NotFoundWishes,
  NotFoundWishlist,
  ConflictAlreadyExistsUser,
  ConflictAlreadyExistsWish,
  ForbiddenNotOwner,
  ForbiddenOwnWish,
  ForbiddenOffer,
  ForbiddenRaised,
  ForbiddenAlreadyCopied,
  ForbiddenNotOwnWish,
  ForbiddenAlreadyOffered,
  ForbiddenNotOwnWishlist,
}

export const code2message = new Map<ErrorCode, string>([
  [
    ErrorCode.BadRequestAlreadyExistsUser,
    'Пользователь с таким именем уже существует',
  ],
  [
    ErrorCode.BadRequestAlreadyExistsEmail,
    'Пользователь с таким E-mail уже существует',
  ],
  [
    ErrorCode.BadRequestAlreadyExistsWish,
    'Подарок с таким именем уже существует',
  ],
  [ErrorCode.Unauthorized, 'Неверное имя пользоваетеля или пароль'],
  [ErrorCode.NotFoundUser, 'Пользователь не найден'],
  [ErrorCode.NotFoundWishes, 'Подарки не найдены'],
  [ErrorCode.NotFoundWishlist, 'Коллекции не найдены'],
  [ErrorCode.ConflictAlreadyExistsUser, 'Пользователь уже существует'],
  [ErrorCode.ConflictAlreadyExistsWish, 'Подарок уже существует'],
  [ErrorCode.ForbiddenNotOwner, 'Только владелец может удалять'],
  [ErrorCode.ForbiddenOwnWish, 'Нельзя копировать свой подарок'],
  [ErrorCode.ForbiddenOffer, 'Нельзя скидываться на свои подарки'],
  [ErrorCode.ForbiddenRaised, 'Сумма больше стоимости подарка'],
  [ErrorCode.ForbiddenAlreadyCopied, 'Подарок уже есть в вашем списке'],
  [ErrorCode.ForbiddenNotOwnWish, 'Нельзя редактировать чужие подарки'],
  [
    ErrorCode.ForbiddenAlreadyOffered,
    'Нельзя редактировать стоимость, если уже скинулись на него',
  ],
  [ErrorCode.ForbiddenNotOwnWishlist, 'Нельзя редактировать чужие коллекции'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.BadRequestAlreadyExistsUser, HttpStatus.BAD_REQUEST],
  [ErrorCode.BadRequestAlreadyExistsEmail, HttpStatus.BAD_REQUEST],
  [ErrorCode.BadRequestAlreadyExistsWish, HttpStatus.BAD_REQUEST],
  [ErrorCode.Unauthorized, HttpStatus.UNAUTHORIZED],
  [ErrorCode.NotFoundUser, HttpStatus.NOT_FOUND],
  [ErrorCode.NotFoundWishes, HttpStatus.NOT_FOUND],
  [ErrorCode.NotFoundWishlist, HttpStatus.NOT_FOUND],
  [ErrorCode.ConflictAlreadyExistsUser, HttpStatus.CONFLICT],
  [ErrorCode.ConflictAlreadyExistsWish, HttpStatus.CONFLICT],
  [ErrorCode.ForbiddenNotOwner, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenOwnWish, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenOffer, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenRaised, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenAlreadyCopied, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenNotOwnWish, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenAlreadyOffered, HttpStatus.FORBIDDEN],
  [ErrorCode.ForbiddenNotOwnWishlist, HttpStatus.FORBIDDEN],
]);
