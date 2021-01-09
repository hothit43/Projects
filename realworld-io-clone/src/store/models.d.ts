//file name is shorthand for models-datatypes: Here I define my datatypes
//Interfaces are rules for classes - these are the patterns for classes implementing these interfaces


export interface Errors {
  config: object;
  isAxios: boolean;
  request?:string;
  response: {
    [key: string]: array<string>
  } 
}

export interface Profile {
    username: string;
    bio?: string;
    image?: string;
    following: boolean;
}

export interface User {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
}

export interface UserForUpdate {
  email?: string
  username?: string
  bio?: string
  password?: string
  image?: string
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}


export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
  }
  export interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  }


export interface UserSubmit {
    email: string;
    password: string;
}

//User response needs an object of user with type User defined above
export interface UserResponse {
    user: User
}

//Profile Response
export interface ProfileResponse {
  profile: Profile;
}

//Articles Response
export interface ArticlesResponse {
    articles?: (Article)[] | null;
    articlesCount: number;
  }

  