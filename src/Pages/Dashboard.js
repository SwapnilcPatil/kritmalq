import React, { useEffect, useState } from 'react';
import '../App.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [creditCard, setCreditCardData] = useState([]);
  const [filteredCreditCard, setFilteredCreditCard] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const parsedUserData = JSON.parse(userData);
    const email = parsedUserData ? parsedUserData.email : ''; // Extract email if userData exists

setUserEmail(email);

    // Fetch data from the API
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileResponse = await fetch('https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "count": 150,
            "country_code": "en_IN",
            "aadhar": true,
            "dl": true,
            "credit": true,
            "debit": true,
            "pan": true,
            "passport": true,
            "ssn": false
          }),
        });
        const profileData = await profileResponse.json();

        // Fetch Card Details data
        const creditCardResponse = await fetch('https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/card/credit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "count": 250,
            "country_code": "en_IN"
          }),
        });
        const creditCardData = await creditCardResponse.json();

        setData([...profileData.data]);
        setFilteredData([...profileData.data]);
        setColumns([...profileData.columns]);
        setCreditCardData([...creditCardData.data]);
        setFilteredCreditCard([...creditCardData.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentCreditCardItems = filteredCreditCard.slice(indexOfFirstItem, indexOfLastItem);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search functionality for profile data
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredData(filtered);
  };

  // Search functionality for credit card data
  const handleCardSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = creditCard.filter((card) =>
      Object.values(card).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredCreditCard(filtered);
  };

  return (
    <div>
        <div className='header-container'>
        <h1>Welcome, {userEmail}!</h1>
        </div>
      <h2>Profile Details</h2>
      <label>Search</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <table id="customers">
        <thead>
          <tr>
            {/* Dynamic rendering of table headers based on the API response */}
            {columns.map((key, index) => (
              <th key={index}>{key.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key) => (
                <td key={`${index}-${key}`}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls for profile */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>

      <h2>Credit Card Details</h2>
      <label>Search</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleCardSearch}
      />

      <table id="customers">
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Card Provider</th>
            <th>Card Type</th>
            <th>Card Expiry</th>
            <th>CVV</th>
          </tr>
        </thead>
        <tbody>
          {currentCreditCardItems.map((card, index) => (
            <tr key={index}>
              <td>{card.card_number}</td>
              <td>{card.card_provider}</td>
              <td>{card.card_type}</td>
              <td>{card.card_expiry}</td>
              <td>{card.cvv}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls for credit card table */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCreditCard.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
