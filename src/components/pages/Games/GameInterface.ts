export interface gameInterface{
    name: string,
    about_the_game: string,
    categories: Array<any>,
    detailed_description: string,
    developers: Array<any>,
    genres: Array<any>,
    metacritic: {
        score: number,
        url: string
    },
    publishers: Array<any>,
    release_date: {
        coming_soon: boolean,
        date: string
    },
    screenshots: Array<any>,
    short_description: string,
    background_raw: string,
    capsule_imagev5: string,
    header_image: string
}

export interface userInterface {
    id?: number,
    nickname: string,
    mail: string,
    password: string
}

export interface commentsInterface{
    id?: number,
    game: number,
    text: string,
    nickname: string,
    created_at?: string
}

export interface relationInterface{
    id?: number,
    game: number,
    status: string,
    user_id: number
}