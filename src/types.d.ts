export interface HeroDataAbout {
    description : string,
    singature : string 
}

export interface HeroData {
    name: string,
    img: string,
    welcome: string,
    description: string,
    profile_link: string,
    roles : Array<string>
    titles: Array<string>,
    about : HeroDataAbout,
    experience_years: number
}