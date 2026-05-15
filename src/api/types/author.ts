export interface Author {
  id: number;
  name: string;
  surname: string;
}

export interface AuthorFormData {
  name: string;
  surname: string;
  countryId: number;
}