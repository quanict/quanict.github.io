export interface HeroDataAbout {
    description : string,
    singature : string 
}

export interface HeroData {
    name: string,
    welcome: string,
    description: string,
    profile_link: string,
    roles : Array<string>
    titles: Array<string>,
    about : HeroDataAbout,
}