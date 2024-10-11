"use client";
import { useState, useEffect } from "react";

function Search() {
  const [breeds, setBreeds] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [isBreedAvailable, setIsBreedAvailable] = useState(true);
  const [results, setResults] = useState([]); // Store search results (images or info)
  const [searchedBreed, setSearchedBreed] = useState(""); // Store the breed that was searched
  const [error, setError] = useState(""); // Store error messages

  useEffect(() => {
    fetchBreeds(); // Fetch available breeds on component mount
  }, []);

  useEffect(() => {
    if (query.length < 3) {
      // Reset when less than 3 characters
      setFilteredBreeds([]);
      setIsBreedAvailable(true);
      setError("");
      return;
    }

    const filtered = breeds.filter((breed) =>
      breed.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBreeds(filtered);

    // Set isBreedAvailable based on whether there are any filtered results
    setIsBreedAvailable(filtered.length > 0);
    setError(filtered.length === 0 ? "Breed not available" : ""); // Set error if no results
  }, [query, breeds]);

  const fetchBreeds = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    setBreeds(Object.keys(data.message)); // Set available breeds in state
  };

  const handleSearch = async (searchQuery) => {
    const breedQuery = searchQuery || query; // Use passed search query or current query
    if (!isBreedAvailable || breedQuery.length < 3) return;

    setSearchedBreed(breedQuery); // Set the searched breed

    const response = await fetch(
      `https://dog.ceo/api/breed/${breedQuery}/images`
    );
    const data = await response.json();
    setResults(data.message); // Store images in results
  };

  const handleSelectBreed = (breed) => {
    setQuery(""); // Clear the input after selecting a breed
    setFilteredBreeds([]); // Clear the filtered list to close the dropdown
    handleSearch(breed); // Trigger search immediately when a breed is selected
  };

  return (
    <div className='max-w-md mx-auto text-black mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
        {isBreedAvailable ? "Search for a Breed" : "Breed Not Available"}
      </h2>

      {/* Search Input */}
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Type a breed...'
        className='w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600'
      />

      {/* Display filtered breed results only if user has typed at least 3 characters */}
      {query.length >= 3 && filteredBreeds.length > 0 && (
        <ul className='mt-3 max-h-48 overflow-y-auto bg-white dark:bg-gray-700 shadow-md rounded-md'>
          {filteredBreeds.map((breed, index) => (
            <li
              key={index}
              className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600'
              onClick={() => handleSelectBreed(breed)} // Trigger search on breed select
            >
              {breed}
            </li>
          ))}
        </ul>
      )}

      {/* Display error if no breeds match the query */}
      {query.length >= 3 && !isBreedAvailable && (
        <p className='text-red-500 mt-3'>Breed not available</p>
      )}

      {/* Search Button */}
      <button
        onClick={() => handleSearch()}
        className={`mt-4 w-full p-3 text-white rounded-md transition duration-300 ${
          isBreedAvailable && query.length >= 3
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isBreedAvailable || query.length < 3}
      >
        Search
      </button>

      {/* Display search results */}
      {results.length > 0 && (
        <div className='mt-6'>
          <h3 className='text-lg font-semibold mb-4'>
            Search Results for "{searchedBreed}":
          </h3>
          <ul className='grid grid-cols-2 gap-4'>
            {results.map((image, index) => (
              <li key={index}>
                <img
                  src={image}
                  alt='Dog'
                  className='w-full h-32 object-cover rounded-md'
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
