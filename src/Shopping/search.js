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
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-3">
                {results &&
                    results.map((r) => (
                        <div className="col" style={{width: 300}}>
                            <div key={r.slug}  className="card" style={{height:500}}>
                                <img src={`${r.image}`} className="card-img-top" style={{height:300}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link
                                                to={`/shopping/details/Toko/${encodeURIComponent(extractRealSlug(r.slug))}`}>Name: {r.title}
                                            </Link>
                                        </h5>
                                        <p className="card-text">Price: {r.price}</p>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}
export default SearchComponent;




