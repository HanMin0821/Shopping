import React, { useState } from 'react';
import * as client from "./clients";
import { Link } from 'react-router-dom';

function extractRealSlug(url) {
    const slugIndex = url.indexOf('slug=');
    if (slugIndex === -1) {
        return '';
    }

    const realSlug = url.substring(slugIndex + 5);
    return realSlug;
}

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const results = await client.searchProducts(searchQuery);
            setResults(results.results);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>


            <h3>Search Results</h3>
            <ul className="list-group col-9">
                {results &&
                    results.map((r) => (
                        <li key={r.slug} className="list-group-item">
                            <img
                                src={`${r.image}`}
                            />
                            <h3>
                                <Link
                                    to={`/shopping/details/Toko/${encodeURIComponent(extractRealSlug(r.slug))}`}>Name: {r.title}
                                </Link>
                            </h3>
                            <h4>Price: {r.price}</h4>
                        </li>
                    ))}
            </ul>




        </div>
    );
}
export default SearchComponent;
