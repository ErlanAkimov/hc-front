import { ICommentItem, ITransactionItem } from "./Pool";

export const mockComments: ICommentItem[] = [
    {
        time: Date.now() - 1000 * (60 + 25), // 1 минута + 25 секунд
        username: "Commentator",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eligendi corporis doloremque harum inventore fugit labore. Obcaecati fuga deleniti ex quam id ad nisi voluptatem debitis? Hic porro expedita doloribus!",
        photo_url:
            "https://i.cbc.ca/1.5543969.1587757165!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_1180/nick-heath.JPG?im=Resize%3D780",
    },
    {
        time: Date.now() - 1000 * (60 + 25), // 1 минута + 25 секунд
        username: "Commentator",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eligendi corporis doloremque harum inventore fugit labore. Obcaecati fuga deleniti ex quam id ad nisi voluptatem debitis? Hic porro expedita doloribus!",
        photo_url:
            "https://i.cbc.ca/1.5543969.1587757165!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_1180/nick-heath.JPG?im=Resize%3D780",
    },
    {
        time: Date.now() - 1000 * (60 + 25), // 1 минута + 25 секунд
        username: "Commentator",
        text: "Good pool",
        photo_url:
            "https://i.cbc.ca/1.5543969.1587757165!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_1180/nick-heath.JPG?im=Resize%3D780",
    },
];

export const mockTransactions: ITransactionItem[] = [
    {
        username: "Tx Sender",
        photo_url:
            "https://i.cbc.ca/1.5543969.1587757165!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_1180/nick-heath.JPG?im=Resize%3D780",
        amount: 12,
    },
    {
        username: "Tx Sender 2 ",
        photo_url:
            "https://i.cbc.ca/1.5543969.1587757165!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_1180/nick-heath.JPG?im=Resize%3D780",
        amount: 3.42,
    },
    {
        username: "Tx Sender 3",
        photo_url:
            "https://i.cbc.ca/1.5543969.1587757165!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_1180/nick-heath.JPG?im=Resize%3D780",
        amount: 0.3,
    },
];
