import { Color } from "$lib/enums/color";
import { PieceType } from "$lib/enums/piece-type";

export const images = {
    [Color.Black + PieceType.King]:
        'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    [Color.Black + PieceType.Queen]:
        'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    [Color.Black + PieceType.Rook]:
        'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    [Color.Black + PieceType.Bishop]:
        'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    [Color.Black + PieceType.Knight]:
        'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    [Color.Black + PieceType.Pawn]:
        'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
    [Color.White + PieceType.King]:
        'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    [Color.White + PieceType.Queen]:
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    [Color.White + PieceType.Rook]:
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    [Color.White + PieceType.Bishop]:
        'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    [Color.White + PieceType.Knight]:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    [Color.White + PieceType.Pawn]:
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
};