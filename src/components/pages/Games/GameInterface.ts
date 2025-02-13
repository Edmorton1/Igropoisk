export interface gameInterface{
    name: string,
    about_the_game: string,
    categories: {id: number, description: string}[],
    detailed_description: string,
    developers: string[],
    genres: {id: number, description: string}[],
    metacritic: {
        score: number,
        url: string
    },
    publishers: string[],
    release_date: {
        coming_soon: boolean,
        date: string
    },
    screenshots: {id: number, path_full: string, path_thumbnail: string}[],
    short_description: string,
    background_raw: string,
    capsule_imagev5: string,
    header_image: string,
    website: string
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

export interface relationArrInterface{
    passed: relationInterface[],
    play: relationInterface[],
    dropped: relationInterface[],
    planned: relationInterface[],
}

export type relationStatus = "passed" | "play" | "dropped" | "planned"

export interface gameInAllInterface {
    steam_id: number,
    name: string,
    genres: {id: number, description: string}[],
    release_date: string,
    developers: string[],
    publishers: string[],
    total_reviews: number,
    total_negative: number,
    capsule_image: string,
    header_image: string,
}

export type allGameType = gameInAllInterface[]

export interface genresInterface{
    id: number,
    description: string
}