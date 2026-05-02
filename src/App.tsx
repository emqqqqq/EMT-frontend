import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './ui/components/layout/Layout/Layout.tsx';
import Home from "./ui/pages/HomePage/HomePage.tsx";
import Books from "./ui/pages/BooksPage/BooksPage.tsx";
import Authors from "./ui/pages/AuthorsPage/AuthorsPage.tsx";
import Countries from "./ui/pages/CountriesPage/CountriesPage.tsx";
import BookDetailsPage from "./ui/pages/BookDetailsPage/BookDetailsPage.tsx";
import AuthorDetailsPage from "./ui/pages/AuthorDetailsPage/AuthorDetailsPage.tsx";
import CountryDetailsPage from "./ui/pages/CountryDetailsPage/CountryDetailsPage.tsx";
import BookStatsPage from "./ui/pages/BookStatsPage/BookStatsPage.tsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="authors" element={<Authors />} />
            <Route path="countries" element={<Countries />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/authors/:id" element={<AuthorDetailsPage />} />
            <Route path="/countries/:id" element={<CountryDetailsPage />} />
            <Route path="/books/stats" element={<BookStatsPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
